import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin, supabaseServer } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noStore = { 'Cache-Control': 'no-store' };

type RouteContext = { params: Promise<{ code: string }> };

function filledString(value: unknown): string | undefined {
  if (value == null) return undefined;
  const s = String(value).trim();
  return s === '' ? undefined : s;
}

function toCoord(value: unknown): number | null {
  if (value == null || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function isRevealed(item: { is_public?: boolean | null; reveal_at?: string | null }): boolean {
  if (item.is_public) return true;
  if (!item.reveal_at) return false;
  const at = new Date(item.reveal_at).getTime();
  return Number.isFinite(at) && at <= Date.now();
}

const TRANSPORT_OPTIONAL_KEYS = [
  'type',
  'label',
  'departure_location',
  'departure_time',
  'arrival_location',
  'arrival_time',
  'train_number',
  'notes',
] as const;

function compactTransport(row: Record<string, unknown>): Record<string, unknown> | null {
  const out: Record<string, unknown> = { id: row.id };
  if (row.sort_order != null) out.sort_order = row.sort_order;
  let hasFilled = false;
  for (const key of TRANSPORT_OPTIONAL_KEYS) {
    const value = filledString(row[key]);
    if (value) {
      out[key] = value;
      hasFilled = true;
    }
  }
  return hasFilled ? out : null;
}

const WMO_LABELS: Record<number, string> = {
  0: 'Ciel dégagé',
  1: 'Principalement dégagé',
  2: 'Partiellement nuageux',
  3: 'Couvert',
  45: 'Brouillard',
  48: 'Brouillard givrant',
  51: 'Bruine légère',
  53: 'Bruine',
  55: 'Bruine dense',
  61: 'Pluie légère',
  63: 'Pluie',
  65: 'Pluie forte',
  71: 'Neige légère',
  73: 'Neige',
  75: 'Neige forte',
  80: 'Averses',
  81: 'Averses marquées',
  82: 'Averses fortes',
  95: 'Orage',
  96: 'Orage et grêle',
  99: 'Orage violent',
};

function weatherLabel(code: number): string {
  if (WMO_LABELS[code]) return WMO_LABELS[code];
  if (code >= 50 && code < 60) return 'Bruine';
  if (code >= 60 && code < 70) return 'Pluie';
  if (code >= 70 && code < 80) return 'Neige';
  if (code >= 80 && code < 90) return 'Averses';
  if (code >= 95) return 'Orage';
  return 'Météo';
}

type WeatherPayload = {
  temperature: number | null;
  temp_min: number | null;
  temp_max: number | null;
  code: number | null;
  label: string;
};

async function fetchWeather(lat: number, lng: number): Promise<WeatherPayload | null> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lng));
  url.searchParams.set('current', 'temperature_2m,weather_code');
  url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min');
  url.searchParams.set('timezone', 'Europe/Paris');
  url.searchParams.set('forecast_days', '1');

  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number };
      daily?: {
        weather_code?: number[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
      };
    };
    const code = data.current?.weather_code ?? data.daily?.weather_code?.[0] ?? null;
    return {
      temperature: data.current?.temperature_2m ?? null,
      temp_min: data.daily?.temperature_2m_min?.[0] ?? null,
      temp_max: data.daily?.temperature_2m_max?.[0] ?? null,
      code,
      label: code == null ? 'Météo' : weatherLabel(code),
    };
  } catch {
    return null;
  }
}

export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { error: 'Service indisponible : configuration Supabase manquante sur le serveur.' },
        { status: 503, headers: noStore },
      );
    }

    const { code: rawCode } = await context.params;
    const code = decodeURIComponent(rawCode ?? '').trim().replace(/[%_]/g, '');
    if (!code) {
      return NextResponse.json({ error: 'Événement introuvable.' }, { status: 404, headers: noStore });
    }

    const db = supabaseAdmin ?? supabaseServer;

    const EVENT_COLUMNS =
      'id, code, name, company_name, start_date, end_date, location_name, location_address, location_maps_url, weather_lat, weather_lng, contact_name, contact_phone, image';
    const EVENT_COLUMNS_FALLBACK =
      'id, code, name, company_name, start_date, end_date, location_name, location_address, location_maps_url, weather_lat, weather_lng, contact_name, contact_phone';

    let { data: event, error: eventError } = await db
      .from('events')
      .select(EVENT_COLUMNS)
      .ilike('code', code)
      .maybeSingle();

    if (eventError && /image/i.test(eventError.message ?? '')) {
      ({ data: event, error: eventError } = await db
        .from('events')
        .select(EVENT_COLUMNS_FALLBACK)
        .ilike('code', code)
        .maybeSingle());
    }

    if (eventError) {
      console.error('[dashboard-event] event lookup error:', eventError);
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
    }

    if (!event) {
      return NextResponse.json({ error: 'Événement introuvable.' }, { status: 404, headers: noStore });
    }

    const eventId = event.id as string;

    const [checklistRes, activitiesRes, scheduleRes, transportRes, teamsRes] = await Promise.all([
      db
        .from('event_checklist_items')
        .select('id, event_id, label, icon, sort_order')
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true }),
      db
        .from('event_activities')
        .select('id, event_id, title, description, is_public, reveal_at, weather_dependent, sort_order')
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true }),
      db
        .from('event_schedule')
        .select('id, event_id, activity_id, title, start_time, end_time, is_public, reveal_at, sort_order')
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true }),
      db
        .from('event_transport')
        .select(
          'id, event_id, type, label, departure_location, departure_time, arrival_location, arrival_time, train_number, notes, sort_order',
        )
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true }),
      db
        .from('event_teams')
        .select('id, event_id, day_context, team_name, member_name')
        .eq('event_id', eventId)
        .order('team_name', { ascending: true })
        .order('member_name', { ascending: true }),
    ]);

    for (const res of [checklistRes, activitiesRes, scheduleRes, transportRes, teamsRes]) {
      if (res.error) {
        console.error('[dashboard-event] related lookup error:', res.error);
        return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
      }
    }

    const activities = (activitiesRes.data ?? []).filter(isRevealed).map((row) => ({
      id: row.id,
      title: row.title,
      description: filledString(row.description) ?? null,
      is_public: Boolean(row.is_public),
      weather_dependent: Boolean(row.weather_dependent),
      sort_order: row.sort_order,
    }));

    const schedule = (scheduleRes.data ?? []).filter(isRevealed).map((row) => ({
      id: row.id,
      activity_id: row.activity_id ?? null,
      title: row.title,
      start_time: filledString(row.start_time) ?? null,
      end_time: filledString(row.end_time) ?? null,
      is_public: Boolean(row.is_public),
      sort_order: row.sort_order,
    }));

    const transport = (transportRes.data ?? [])
      .map((row) => compactTransport(row as Record<string, unknown>))
      .filter((row): row is Record<string, unknown> => row != null);

    const teams = (teamsRes.data ?? [])
      .map((row) => {
        const day_context = filledString(row.day_context);
        const team_name = filledString(row.team_name);
        const member_name = filledString(row.member_name);
        if (!day_context || !team_name || !member_name) return null;
        return { id: row.id, day_context, team_name, member_name };
      })
      .filter((row): row is { id: string; day_context: string; team_name: string; member_name: string } => row != null);

    const eventRow = event as Record<string, unknown>;
    const lat = toCoord(eventRow.weather_lat);
    const lng = toCoord(eventRow.weather_lng);
    const weather = lat != null && lng != null ? await fetchWeather(lat, lng) : null;

    const publicEvent: Record<string, unknown> = {
      id: eventRow.id,
      code: eventRow.code,
      name: eventRow.name,
    };
    const companyName = filledString(eventRow.company_name ?? eventRow['Company name']);
    if (companyName) publicEvent.company_name = companyName;
    for (const key of ['start_date', 'end_date', 'location_name', 'location_address', 'location_maps_url', 'contact_name', 'contact_phone', 'image'] as const) {
      const value = filledString(eventRow[key]);
      if (value) publicEvent[key] = value;
    }
    if (weather) publicEvent.weather = weather;

    return NextResponse.json(
      {
        event: publicEvent,
        checklist: (checklistRes.data ?? []).map((row) => ({
          id: row.id,
          label: row.label,
          icon: filledString(row.icon) ?? null,
          sort_order: row.sort_order,
        })),
        activities,
        schedule,
        transport,
        teams,
      },
      { status: 200, headers: noStore },
    );
  } catch (err) {
    console.error('[dashboard-event] GET error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500, headers: noStore });
  }
}
