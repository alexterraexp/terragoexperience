'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Bus,
  Calendar,
  Check,
  ChevronRight,
  CloudSun,
  MapPin,
  Phone,
  Train,
  Users,
} from 'lucide-react';
import { HOME_COLORS, HOME_RADIUS } from '../../components/home/homeStyles';

const FONT = "'Poppins', sans-serif";
const INK = HOME_COLORS.primary;
const ORANGE = HOME_COLORS.orange;
const SESSION_KEY = 'terrago-dashboard-event-session';
const SESSION_TTL_MS = 10 * 60 * 1000;
const HERO_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/111112.webp';
const HERO_IMAGE_ALT = 'Grande salle en pierre d’un domaine d’exception';

type StoredSession = { code: string; expiresAt: number };

function readSession(): string | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed?.code || typeof parsed.expiresAt !== 'number') return null;
    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed.code;
  } catch {
    return null;
  }
}

function writeSession(code: string) {
  const payload: StoredSession = { code, expiresAt: Date.now() + SESSION_TTL_MS };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

type Weather = {
  temperature: number | null;
  temp_min: number | null;
  temp_max: number | null;
  code: number | null;
  label: string;
};

type EventPayload = {
  id: string;
  code: string;
  name: string;
  company_name?: string;
  start_date?: string;
  end_date?: string;
  location_name?: string;
  location_address?: string;
  location_maps_url?: string;
  contact_name?: string;
  contact_phone?: string;
  weather?: Weather | null;
};

type ChecklistItem = {
  id: string;
  label: string;
  icon: string | null;
  sort_order: number | null;
};

type Activity = {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  weather_dependent: boolean;
  sort_order: number | null;
};

type ScheduleItem = {
  id: string;
  activity_id: string | null;
  title: string;
  start_time: string | null;
  end_time: string | null;
  is_public: boolean;
  sort_order: number | null;
};

type TransportItem = {
  id: string;
  sort_order?: number | null;
  type?: string;
  label?: string;
  departure_location?: string;
  departure_time?: string;
  arrival_location?: string;
  arrival_time?: string;
  train_number?: string;
  notes?: string;
};

type TeamMember = {
  id: string;
  day_context: string;
  team_name: string;
  member_name: string;
};

type TeamGroup = {
  name: string;
  members: { id: string; name: string }[];
};

type TeamDay = {
  key: 'samedi' | 'dimanche';
  title: string;
  teams: TeamGroup[];
};

type DashboardData = {
  event: EventPayload;
  checklist: ChecklistItem[];
  activities: Activity[];
  schedule: ScheduleItem[];
  transport: TransportItem[];
  teams?: TeamMember[];
};

function normalizeCode(value: string) {
  return value.trim();
}

function seminarSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function syncSeminarUrl(name: string) {
  const slug = seminarSlug(name);
  if (!slug) return;
  const next = `/dashboard-event/${slug}`;
  if (window.location.pathname !== next) {
    window.history.replaceState(window.history.state, '', next);
    window.dispatchEvent(new Event('terrago:pathchange'));
  }
}

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value.includes('T') ? value : `${value}T12:00:00`);
  if (!Number.isFinite(d.getTime())) return null;
  const label = d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatDateRange(start?: string, end?: string) {
  const startLabel = formatDate(start);
  const endLabel = formatDate(end);
  if (startLabel && endLabel && start !== end) return `${startLabel} → ${endLabel}`;
  return startLabel ?? endLabel;
}

function formatTime(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^\d{2}:\d{2}/.test(trimmed) && trimmed.length <= 8) {
    return trimmed.slice(0, 5).replace(':', 'h');
  }
  const d = new Date(trimmed);
  if (!Number.isFinite(d.getTime())) return trimmed;
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
}

function parseDateTime(value?: string | null): Date | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^\d{2}:\d{2}/.test(trimmed) && !trimmed.includes('T') && trimmed.length <= 8) return null;
  const d = new Date(trimmed.includes('T') || trimmed.includes(' ') ? trimmed : `${trimmed}T12:00:00`);
  return Number.isFinite(d.getTime()) ? d : null;
}

function formatWeekdayDate(value?: string | null) {
  const d = parseDateTime(value);
  if (!d) return null;
  const weekday = d.toLocaleDateString('fr-FR', { weekday: 'long' });
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${day}/${month}`;
}

function formatScheduleHm(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^\d{2}:\d{2}/.test(trimmed) && trimmed.length <= 8) return trimmed.slice(0, 5);
  const d = parseDateTime(trimmed);
  if (!d) return null;
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatDayHeading(value: string) {
  const d = parseDateTime(value);
  if (!d) return 'Autre moment';
  const weekday = d.toLocaleDateString('fr-FR', { weekday: 'long' });
  const month = d.toLocaleDateString('fr-FR', { month: 'long' });
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${d.getDate()} ${month}`;
}

function dayKeyFromStart(value?: string | null) {
  const d = parseDateTime(value);
  if (!d) return 'sans-date';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function groupScheduleByDay(items: ScheduleItem[]) {
  const sorted = [...items].sort((a, b) => {
    const ta = parseDateTime(a.start_time)?.getTime() ?? Number.POSITIVE_INFINITY;
    const tb = parseDateTime(b.start_time)?.getTime() ?? Number.POSITIVE_INFINITY;
    if (ta !== tb) return ta - tb;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
  const order: string[] = [];
  const map = new Map<string, ScheduleItem[]>();
  for (const item of sorted) {
    const key = dayKeyFromStart(item.start_time);
    if (!map.has(key)) {
      order.push(key);
      map.set(key, []);
    }
    map.get(key)!.push(item);
  }
  return order.map((key) => {
    const dayItems = map.get(key)!;
    return {
      key,
      title: key === 'sans-date' ? 'Autre moment' : formatDayHeading(dayItems[0].start_time ?? ''),
      items: dayItems,
    };
  });
}

function transportGroupTitle(type?: string) {
  const t = (type ?? '').toLowerCase();
  if (t === 'train') return 'Trajets en train';
  if (t === 'bus') return 'Transferts en bus';
  if (t === 'navette' || t === 'shuttle' || t === 'navettes') return 'Navettes';
  return transportTypeLabel(type) || 'Transport';
}

function transportGroupIcon(type?: string) {
  const props = { size: 18, strokeWidth: 1.7, color: INK } as const;
  const t = (type ?? '').toLowerCase();
  if (t === 'bus' || t === 'car' || t === 'coach' || t === 'navette') return <Bus {...props} />;
  return <Train {...props} />;
}

function transportGroupKey(type?: string) {
  const t = (type ?? '').trim().toLowerCase();
  if (t === 'shuttle' || t === 'navettes') return 'navette';
  return t || 'autre';
}

function formatTransportLine(slot: TransportItem) {
  const depTime = formatTime(slot.departure_time);
  const arrTime = formatTime(slot.arrival_time);
  const date = formatWeekdayDate(slot.departure_time) ?? formatWeekdayDate(slot.arrival_time);
  const hasPlaces = Boolean(slot.departure_location || slot.arrival_location);

  if (hasPlaces) {
    const left = [depTime, slot.departure_location].filter(Boolean).join(' ');
    const right = [arrTime, slot.arrival_location].filter(Boolean).join(' ');
    const route = left && right ? `${left} → ${right}` : left || right;
    const withDate = date && route ? `${date} — ${route}` : route || date || '';
    return slot.train_number ? `${withDate} (${slot.train_number})` : withDate;
  }

  const times = [depTime, arrTime].filter(Boolean);
  const timePart = times.join(' ou ');

  if (slot.label) {
    return timePart ? `${slot.label} : ${timePart}` : slot.label;
  }
  if (date && timePart) return `Départ ${date} : ${timePart}`;
  return [date, timePart].filter(Boolean).join(' : ');
}

function transportDisplayLines(slot: TransportItem): string[] {
  if (slot.notes) {
    return slot.notes.split('\n');
  }
  const line = formatTransportLine(slot);
  return line ? [line] : [];
}

function teamDayKey(value?: string | null): TeamDay['key'] | null {
  const t = (value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (t.includes('samedi') || t.includes('saturday') || t === 'sam' || t === 'sat') return 'samedi';
  if (t.includes('dimanche') || t.includes('sunday') || t === 'dim' || t === 'sun') return 'dimanche';
  return null;
}

function groupTeamsByDay(items: TeamMember[]): TeamDay[] {
  const days: Record<TeamDay['key'], Map<string, TeamGroup>> = {
    samedi: new Map(),
    dimanche: new Map(),
  };

  for (const row of items) {
    const key = teamDayKey(row.day_context);
    if (!key) continue;
    const existing = days[key].get(row.team_name);
    if (existing) {
      existing.members.push({ id: row.id, name: row.member_name });
    } else {
      days[key].set(row.team_name, {
        name: row.team_name,
        members: [{ id: row.id, name: row.member_name }],
      });
    }
  }

  const daysOut: TeamDay[] = (['samedi', 'dimanche'] as const).map((key) => ({
    key,
    title: key === 'samedi' ? 'Samedi' : 'Dimanche',
    teams: [...days[key].values()],
  }));

  return daysOut.some((day) => day.teams.length > 0) ? daysOut : [];
}

function groupTransports(items: TransportItem[]) {
  const order: string[] = [];
  const map = new Map<string, TransportItem[]>();
  for (const item of items) {
    const key = transportGroupKey(item.type);
    if (!map.has(key)) {
      order.push(key);
      map.set(key, []);
    }
    map.get(key)!.push(item);
  }
  return order.map((key) => ({
    key,
    title: transportGroupTitle(key === 'autre' ? items.find((i) => transportGroupKey(i.type) === key)?.type : key),
    items: map.get(key)!,
  }));
}

function transportTypeLabel(type?: string) {
  if (!type) return null;
  const t = type.toLowerCase();
  if (t === 'train') return 'Trajets en train';
  if (t === 'bus') return 'Transferts en bus';
  if (t === 'car' || t === 'coach') return 'Car';
  if (t === 'plane' || t === 'avion' || t === 'flight') return 'Avion';
  if (t === 'taxi') return 'Taxi';
  if (t === 'shuttle' || t === 'navette') return 'Navette';
  if (t === 'voiture' || t === 'carpool') return 'Voiture';
  if (t === 'walk' || t === 'marche') return 'À pied';
  return type;
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

const AccordionCtx = React.createContext<{
  openId: string | null;
  toggle: (id: string) => void;
} | null>(null);

function AccordionList({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));
  return (
    <AccordionCtx.Provider value={{ openId, toggle }}>
      <div className="dash-infos-list">{children}</div>
    </AccordionCtx.Provider>
  );
}

function InfosRow({
  id,
  icon,
  title,
  subtitle,
  children,
  href,
  alwaysOpen = false,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  href?: string;
  alwaysOpen?: boolean;
}) {
  const accordion = React.useContext(AccordionCtx);
  const rowId = id ?? title;
  const [localOpen, setLocalOpen] = useState(alwaysOpen);
  const open = alwaysOpen || (accordion ? accordion.openId === rowId : localOpen);
  const expandable = Boolean(children);
  const rowRef = useRef<HTMLDivElement>(null);
  const lockTopRef = useRef<number | null>(null);

  const toggle = () => {
    if (!expandable) return;
    const willOpen = accordion ? accordion.openId !== rowId : !localOpen;
    if (willOpen && rowRef.current) {
      lockTopRef.current = rowRef.current.getBoundingClientRect().top;
    }
    if (accordion) accordion.toggle(rowId);
    else setLocalOpen((v) => !v);
  };

  useLayoutEffect(() => {
    const lockTop = lockTopRef.current;
    if (lockTop == null || !rowRef.current) return;
    lockTopRef.current = null;
    const delta = rowRef.current.getBoundingClientRect().top - lockTop;
    if (Math.abs(delta) >= 1) {
      window.scrollBy({ top: delta, behavior: 'auto' });
    }
  }, [open]);

  const inner = (
    <>
      <span className="dash-infos-row-icon" aria-hidden>
        {icon}
      </span>
      <span className="dash-infos-row-text">
        <span className="dash-infos-row-title">{title}</span>
        {subtitle && <span className="dash-infos-row-sub">{subtitle}</span>}
      </span>
      {!alwaysOpen && (
        <ChevronRight size={18} strokeWidth={1.8} className="dash-infos-row-chevron" aria-hidden />
      )}
    </>
  );

  return (
    <div ref={rowRef} className={`dash-infos-row${open ? ' is-open' : ''}`}>
      {href && !expandable ? (
        <a
          className="dash-infos-row-trigger"
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : alwaysOpen ? (
        <div className="dash-infos-row-trigger" style={{ cursor: 'default' }}>
          {inner}
        </div>
      ) : (
        <button
          type="button"
          className="dash-infos-row-trigger"
          aria-expanded={expandable ? open : undefined}
          onClick={toggle}
        >
          {inner}
        </button>
      )}
      {expandable && open && <div className="dash-infos-row-body">{children}</div>}
    </div>
  );
}

async function fetchDashboard(code: string): Promise<DashboardData> {
  const res = await fetch(`/api/dashboard-event/${encodeURIComponent(code)}`, { cache: 'no-store' });
  const body = (await res.json().catch(() => ({}))) as DashboardData & { error?: string };
  if (res.status === 404) {
    throw new Error(body.error || 'Événement introuvable.');
  }
  if (!res.ok) {
    throw new Error(body.error || 'Impossible de charger le dashboard.');
  }
  return body;
}

export default function DashboardEventClient() {
  const [gate, setGate] = useState<'restoring' | 'locked' | 'open'>('restoring');
  const [inputCode, setInputCode] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const code = readSession();
    if (!code) {
      setGate('locked');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const payload = await fetchDashboard(code);
        if (cancelled) return;
        writeSession(code);
        setData(payload);
        setGate('open');
        syncSeminarUrl(payload.event.name);
      } catch {
        if (cancelled) return;
        clearSession();
        setGate('locked');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = normalizeCode(inputCode);
    if (!code) {
      setUnlockError('Saisissez le code reçu pour cet événement.');
      return;
    }

    setUnlocking(true);
    setUnlockError('');
    try {
      const payload = await fetchDashboard(code);
      writeSession(code);
      setData(payload);
      setGate('open');
      syncSeminarUrl(payload.event.name);
    } catch (err: unknown) {
      setUnlockError(err instanceof Error ? err.message : 'Ce code ne correspond à aucun événement.');
    } finally {
      setUnlocking(false);
    }
  };

  const dateLabel = useMemo(
    () => formatDateRange(data?.event.start_date, data?.event.end_date),
    [data],
  );

  const pageCss = (
    <style>{`
      .dash-page { background: #ffffff; min-height: 100vh; font-family: ${FONT}; color: ${INK}; }
      .dash-inner {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: calc(84px + 2rem) 1.5rem 80px;
        padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
        padding-right: max(1rem, env(safe-area-inset-right, 0px));
        box-sizing: border-box;
      }
      .dash-hero-wrap {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: calc(84px + 2rem) 1.5rem 0;
        padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
        padding-right: max(1rem, env(safe-area-inset-right, 0px));
        box-sizing: border-box;
      }
      .dash-hero {
        position: relative;
        overflow: hidden;
        background: ${INK};
        border-radius: ${HOME_RADIUS};
        padding: 4rem 1.25rem;
        text-align: center;
      }
      .dash-hero-media {
        position: absolute;
        inset: 0;
        z-index: 0;
      }
      .dash-hero-shade {
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(to top, rgba(12, 29, 34, 0.62) 0%, rgba(12, 29, 34, 0.28) 55%, rgba(12, 29, 34, 0.18) 100%);
      }
      .dash-hero-copy {
        position: relative;
        z-index: 2;
      }
      .dash-page--open .dash-inner { padding-top: 28px; }
      @media (min-width: 640px) {
        .dash-inner { padding-left: 2rem; padding-right: 1.25rem; }
        .dash-hero-wrap { padding-left: 2rem; padding-right: 1.25rem; }
        .dash-hero { padding: 5rem 2rem; }
      }
      @media (min-width: 1024px) {
        .dash-inner { padding-left: 2.5rem; padding-right: 1.5rem; }
        .dash-hero-wrap { padding-left: 2.5rem; padding-right: 1.5rem; }
        .dash-hero { padding: 6rem 2rem; }
      }
      .dash-kicker {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: ${ORANGE};
        margin: 0 0 10px;
      }
      .dash-kicker--dash {
        margin-bottom: 16px;
      }
      .dash-kicker--dash::after {
        content: '';
        display: block;
        width: 28px;
        height: 2.5px;
        margin-top: 10px;
        background: ${ORANGE};
        border-radius: 999px;
      }
      .dash-title {
        font-family: ${FONT};
        font-size: clamp(28px, 3.4vw, 40px);
        font-weight: 700;
        letter-spacing: -0.075em;
        line-height: 1.08;
        color: ${INK};
        margin: 0 0 12px;
      }
      .dash-title-light { font-weight: 400; }
      .dash-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin: 4px 0 0;
      }
      .dash-pill {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        border-radius: 9999px;
        border: 1px solid rgba(12, 29, 34, 0.10);
        background: rgba(12, 29, 34, 0.045);
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.35;
        color: ${INK};
      }
      .dash-lead {
        margin: 10px 0 0;
        max-width: 40rem;
        font-size: clamp(15px, 1.6vw, 17px);
        font-weight: 400;
        letter-spacing: -0.04em;
        line-height: 1.5;
        color: rgba(12, 29, 34, 0.6);
      }
      .dash-section { margin: 28px 0 8px; }
      .dash-section-title {
        font-family: ${FONT};
        font-size: clamp(18px, 2.2vw, 22px);
        font-weight: 700;
        letter-spacing: -0.05em;
        color: ${INK};
        margin: 0 0 12px;
      }
      .dash-infos-list { display: flex; flex-direction: column; gap: 8px; overflow-anchor: none; }
      .dash-infos-row {
        scroll-margin-top: calc(76px + env(safe-area-inset-top, 0px) + 12px);
        overflow-anchor: none;
        background: #fff;
        border: 1px solid rgba(12, 29, 34, 0.10);
        border-radius: 12px;
        overflow: hidden;
      }
      .dash-infos-row-trigger {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border: none;
        background: transparent;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        color: ${INK};
        text-decoration: none;
      }
      .dash-infos-row-trigger:hover { background: rgba(12, 29, 34, 0.02); }
      .dash-infos-row-icon {
        flex-shrink: 0;
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${INK};
      }
      .dash-infos-row-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .dash-infos-row-title {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: ${INK};
        line-height: 1.25;
      }
      .dash-infos-row-sub {
        font-size: 13px;
        font-weight: 500;
        color: rgba(12, 29, 34, 0.5);
        line-height: 1.35;
        overflow-wrap: break-word;
      }
      .dash-infos-row-chevron {
        flex-shrink: 0;
        color: rgba(12, 29, 34, 0.35);
        transition: transform 0.22s ease;
      }
      .dash-infos-row.is-open .dash-infos-row-chevron {
        transform: rotate(90deg);
        color: ${ORANGE};
      }
      .dash-infos-row-body {
        padding: 0 16px 14px 50px;
        min-width: 0;
      }
      .dash-copy {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.55;
        letter-spacing: -0.03em;
        color: rgba(12, 29, 34, 0.65);
        overflow-wrap: break-word;
      }
      .dash-copy a { color: ${ORANGE}; font-weight: 600; text-decoration: none; }
      .dash-copy a:hover { text-decoration: underline; }
      .dash-transport-lines {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .dash-transport-lines li {
        position: relative;
        padding-left: 1.1em;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.55;
        letter-spacing: -0.03em;
        color: rgba(12, 29, 34, 0.7);
        overflow-wrap: break-word;
        word-break: break-word;
      }
      .dash-transport-lines li::before {
        content: '•';
        position: absolute;
        left: 0;
        font-weight: 700;
        color: ${ORANGE};
      }
      .dash-inclus { display: flex; flex-direction: column; }
      .dash-inclus-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 8px 0;
      }
      .dash-inclus-icon {
        flex-shrink: 0;
        width: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 1px;
        color: ${ORANGE};
      }
      .dash-inclus-label {
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1.4;
        color: rgba(12, 29, 34, 0.75);
      }
      .dash-programme { display: flex; flex-direction: column; }
      .dash-programme-step {
        display: flex;
        gap: 14px;
        align-items: flex-start;
        padding: 12px 0;
        border-bottom: 1px solid rgba(12, 29, 34, 0.06);
      }
      .dash-programme-step:last-child { border-bottom: none; }
      .dash-programme-time {
        flex-shrink: 0;
        width: 52px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.02em;
        color: ${ORANGE};
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .dash-programme-action {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.55;
        color: rgba(12, 29, 34, 0.7);
      }
      .dash-badge {
        display: inline-flex;
        align-items: center;
        border-radius: 9999px;
        padding: 3px 9px;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        background: rgba(236, 100, 53, 0.12);
        color: ${ORANGE};
        margin-left: 8px;
        vertical-align: middle;
      }
      .dash-badge-ink {
        background: rgba(12, 29, 34, 0.08);
        color: ${INK};
      }
      .dash-activity {
        border: 1px solid rgba(12, 29, 34, 0.10);
        border-radius: 12px;
        padding: 16px 18px;
      }
      .dash-activity + .dash-activity { margin-top: 8px; }
      .dash-activity h3 {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.03em;
        margin: 0 0 6px;
        line-height: 1.3;
      }
      .dash-teams-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px 24px;
        align-items: start;
      }
      .dash-team-block {
        min-width: 0;
        padding: 12px 14px;
        border: 1px solid rgba(12, 29, 34, 0.08);
        border-radius: 10px;
        background: rgba(12, 29, 34, 0.02);
      }
      .dash-team-name {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: ${ORANGE};
        margin: 0 0 6px;
      }
      .dash-team-members {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .dash-team-members li {
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1.4;
        color: rgba(12, 29, 34, 0.75);
      }
      .dash-input {
        width: 100%;
        border: 1px solid rgba(12, 29, 34, 0.10);
        background: #fff;
        border-radius: 12px;
        padding: 12px 14px;
        font-size: 16px;
        font-family: ${FONT};
        color: ${INK};
        outline: none;
      }
      .dash-input:focus { border-color: rgba(236, 100, 53, 0.45); }
      .dash-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
      .dash-field label {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(12, 29, 34, 0.4);
      }
      .dash-cta {
        width: 100%;
        background: ${INK};
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.1em;
        padding: 16px 22px;
        border-radius: 9999px;
        border: none;
        text-transform: uppercase;
        cursor: pointer;
        font-family: inherit;
      }
      .dash-cta:disabled { opacity: 0.6; cursor: default; }
      .dash-cta:hover:not(:disabled) { background: #000; }
      .dash-unlock {
        display: flex;
        overflow: hidden;
        width: 100%;
        max-width: 1100px;
        min-height: min(560px, 80vh);
        margin: 4rem auto 0;
        background: #fff;
        border-radius: ${HOME_RADIUS};
        border: 1px solid rgba(12, 29, 34, 0.10);
        box-shadow: 0 4px 28px rgba(12, 29, 34, 0.09);
      }
      .dash-unlock-body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 36px 40px 36px 42px;
      }
      .dash-unlock-body form { max-width: 420px; }
      .dash-unlock-visual {
        position: relative;
        flex: 0 0 38%;
        width: 38%;
        overflow: hidden;
      }
      .dash-unlock-code {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .dash-cols {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
        gap: clamp(32px, 4vw, 56px);
        align-items: start;
        margin-top: 28px;
      }
      .dash-aside {
        position: sticky;
        top: calc(72px + 2.5rem);
        align-self: start;
        background: ${HOME_COLORS.gray};
        border-radius: ${HOME_RADIUS};
        border: 1px solid rgba(12, 29, 34, 0.08);
        padding: 28px 24px;
        color: ${INK};
      }
      .dash-aside-mobile { display: none; }
      @media (max-width: 768px) {
        .dash-inner {
          padding-top: calc(72px + 1.25rem);
          padding-bottom: 56px;
          padding-left: max(1rem, env(safe-area-inset-left, 0px));
          padding-right: max(1rem, env(safe-area-inset-right, 0px));
        }
        .dash-cols { grid-template-columns: 1fr; gap: 0; }
        .dash-aside { display: none; }
        .dash-aside-mobile {
          display: block;
          background: ${HOME_COLORS.gray};
          border-radius: ${HOME_RADIUS};
          border: 1px solid rgba(12, 29, 34, 0.08);
          padding: 20px 16px;
          margin: 20px 0 24px;
        }
        .dash-infos-row-trigger {
          padding: 14px;
          min-height: 48px;
        }
        .dash-infos-row-body { padding: 0 14px 12px 14px; }
        .dash-input { font-size: 16px; }
        .dash-unlock-code { font-size: 16px; letter-spacing: 0.12em; }
        .dash-cta { font-size: 10px; padding: 14px 18px; }
        .dash-unlock {
          flex-direction: column-reverse;
          min-height: 0;
          margin-top: 2.5rem;
        }
        .dash-unlock-body { padding: 28px 20px; }
        .dash-unlock-visual {
          flex: none;
          width: 100%;
          height: 168px;
        }
        .dash-hero-wrap {
          max-width: none;
          padding: 0;
        }
        .dash-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 52svh;
          border-radius: 0;
          padding: calc(92px + env(safe-area-inset-top, 0px)) 1.5rem 3.5rem;
          box-sizing: border-box;
        }
        .dash-page--open .dash-inner {
          position: relative;
          z-index: 2;
          margin-top: -${HOME_RADIUS};
          padding-top: 1.75rem;
          background: #fff;
          border-radius: ${HOME_RADIUS} ${HOME_RADIUS} 0 0;
        }
        .dash-meta { gap: 6px; }
        .dash-pill {
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 500;
          line-height: 1.3;
        }
      }
    `}</style>
  );

  if (gate === 'restoring') {
    return (
      <div className="dash-page">
        {pageCss}
        <div className="dash-inner">
          <div className="dash-unlock">
            <div className="dash-unlock-body">
              <p className="dash-kicker">Espace participant</p>
              <h1 className="dash-title">
                <span className="dash-title-light">Chargement</span> en cours
              </h1>
              <p className="dash-lead">Nous retrouvons votre session…</p>
            </div>
            <div className="dash-unlock-visual">
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gate === 'locked' || !data) {
    return (
      <div className="dash-page">
        {pageCss}
        <div className="dash-inner">
          <div className="dash-unlock">
            <div className="dash-unlock-body">
              <p className="dash-kicker">Espace participant</p>
              <h1 className="dash-title">
                <span className="dash-title-light">Entrez</span> votre code
              </h1>
              <p className="dash-lead">
                Saisissez le code reçu pour accéder au planning et aux informations de votre séminaire.
              </p>
              <form onSubmit={handleUnlock} style={{ marginTop: 28 }}>
                <div className="dash-field">
                  <label htmlFor="event-code">Code événement</label>
                  <input
                    id="event-code"
                    name="code"
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      setUnlockError('');
                    }}
                    autoComplete="off"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck={false}
                    className="dash-input dash-unlock-code"
                    style={{ fontSize: 16 }}
                    placeholder="XXXXXX"
                  />
                </div>
                {unlockError && (
                  <p className="dash-copy" style={{ color: ORANGE, marginBottom: 14 }} role="alert">
                    {unlockError}
                  </p>
                )}
                <button type="submit" disabled={unlocking} className="dash-cta">
                  {unlocking ? 'Vérification…' : 'Déverrouiller'}
                </button>
              </form>
            </div>
            <div className="dash-unlock-visual">
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { event, checklist, activities, schedule, transport } = data;
  const teamDays = groupTeamsByDay(data.teams ?? []);
  const hasLocation = Boolean(event.location_name || event.location_address || event.location_maps_url);
  const hasContact = Boolean(event.contact_name || event.contact_phone);
  const weather = event.weather;
  const hasInfos = hasLocation || hasContact || Boolean(weather);

  return (
    <div className="dash-page dash-page--open">
      {pageCss}
      <div className="dash-hero-wrap">
        <div className="dash-hero">
          <div className="dash-hero-media">
            <Image
              src={HERO_IMAGE}
              alt={HERO_IMAGE_ALT}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="dash-hero-shade" aria-hidden />
          <div className="dash-hero-copy">
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85"
              style={{ fontFamily: FONT }}
            >
              Espace participant
            </p>
            <h1 className="font-sans text-[clamp(1.85rem,4.5vw,2.85rem)] font-bold leading-[1.08] tracking-[-0.075em] text-white">
              {event.company_name || event.name}
            </h1>
            {dateLabel && (
              <p className="mt-3 font-sans text-[11px] font-normal tracking-[-0.03em] text-white/90 sm:text-[16px]">
                {dateLabel}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="dash-inner">
        <div className="dash-cols">
          <div>
            <header style={{ marginBottom: 8 }}>
              <p className="dash-kicker">Votre séminaire</p>
              <h2 className="dash-title" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)' }}>
                {event.name}
              </h2>
              <div className="dash-meta">
                {dateLabel && <span className="dash-pill">{dateLabel}</span>}
                {event.location_name && <span className="dash-pill">{event.location_name}</span>}
              </div>
            </header>

            <aside className="dash-aside-mobile">
              <p className="dash-kicker dash-kicker--dash">À ne pas oublier</p>
              <div className="dash-inclus">
                {checklist.map((item) => (
                  <div key={item.id} className="dash-inclus-item">
                    <span className="dash-inclus-icon">
                      <Check size={15} strokeWidth={2.2} />
                    </span>
                    <span className="dash-inclus-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>

            {hasInfos && (
              <section className="dash-section" aria-labelledby="dash-infos-title">
                <h2 id="dash-infos-title" className="dash-section-title">
                  Infos pratiques
                </h2>
                <AccordionList>
                  {hasLocation && (
                    <InfosRow
                      id="infos-logement"
                      icon={<MapPin size={18} strokeWidth={1.7} color={INK} />}
                      title="Logement"
                      subtitle={event.location_name || event.location_address}
                      href={!event.location_address && event.location_maps_url ? event.location_maps_url : undefined}
                    >
                      {(event.location_address || event.location_maps_url) && (
                        <>
                          {event.location_name && event.location_address && (
                            <p className="dash-copy" style={{ marginBottom: 6 }}>
                              {event.location_address}
                            </p>
                          )}
                          {event.location_maps_url && (
                            <p className="dash-copy">
                              <a href={event.location_maps_url} target="_blank" rel="noopener noreferrer">
                                Itinéraire →
                              </a>
                            </p>
                          )}
                        </>
                      )}
                    </InfosRow>
                  )}
                  {hasContact && (
                    <InfosRow
                      id="infos-contact"
                      icon={<Phone size={18} strokeWidth={1.7} color={INK} />}
                      title="Contact"
                      subtitle={event.contact_name || event.contact_phone}
                      href={event.contact_phone && !event.contact_name ? telHref(event.contact_phone) : undefined}
                    >
                      {event.contact_phone ? (
                        <p className="dash-copy">
                          <a href={telHref(event.contact_phone)}>{event.contact_phone}</a>
                        </p>
                      ) : null}
                    </InfosRow>
                  )}
                  {weather && (
                    <InfosRow
                      id="infos-meteo"
                      icon={<CloudSun size={18} strokeWidth={1.7} color={INK} />}
                      title="Météo"
                      subtitle={
                        weather.label +
                        (weather.temperature != null ? ` · ${Math.round(weather.temperature)}°` : '')
                      }
                    >
                      {(weather.temp_min != null || weather.temp_max != null) && (
                        <p className="dash-copy">
                          {weather.temp_min != null ? `${Math.round(weather.temp_min)}°` : ''}
                          {weather.temp_min != null && weather.temp_max != null ? ' / ' : ''}
                          {weather.temp_max != null ? `${Math.round(weather.temp_max)}°` : ''}
                        </p>
                      )}
                    </InfosRow>
                  )}
                </AccordionList>
              </section>
            )}

            {transport.length > 0 && (
              <section className="dash-section">
                <h2 className="dash-section-title">Transport</h2>
                <AccordionList>
                  {groupTransports(transport).map((group) => (
                    <InfosRow
                      key={group.key}
                      id={`transport-${group.key}`}
                      icon={transportGroupIcon(group.key)}
                      title={group.title}
                    >
                      <ul className="dash-transport-lines">
                        {group.items.flatMap((slot) =>
                          transportDisplayLines(slot).map((line, i) => (
                            <li key={`${slot.id}-${i}`}>{line}</li>
                          )),
                        )}
                      </ul>
                    </InfosRow>
                  ))}
                </AccordionList>
              </section>
            )}

            {schedule.length > 0 && (
              <section className="dash-section">
                <h2 className="dash-section-title">Planning</h2>
                <AccordionList>
                  {groupScheduleByDay(schedule).map((day) => (
                    <InfosRow
                      key={day.key}
                      id={`planning-${day.key}`}
                      icon={<Calendar size={18} strokeWidth={1.7} color={INK} />}
                      title={day.title}
                    >
                      <div className="dash-programme">
                        {day.items.map((item) => (
                          <div key={item.id} className="dash-programme-step">
                            <span className="dash-programme-time">
                              {formatScheduleHm(item.start_time) ?? '—'}
                            </span>
                            <span className="dash-programme-action">{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </InfosRow>
                  ))}
                </AccordionList>
              </section>
            )}

            {teamDays.some((day) => day.teams.length > 0) && (
              <section className="dash-section" aria-labelledby="dash-teams-title">
                <h2 id="dash-teams-title" className="dash-section-title">
                  Équipes
                </h2>
                <AccordionList>
                  {teamDays
                    .filter((day) => day.teams.length > 0)
                    .map((day) => (
                      <InfosRow
                        key={day.key}
                        id={`teams-${day.key}`}
                        icon={<Users size={18} strokeWidth={1.7} color={INK} />}
                        title={day.title}
                        subtitle={`${day.teams.length} équipe${day.teams.length > 1 ? 's' : ''}`}
                      >
                        <div className="dash-teams-grid">
                          {day.teams.map((team) => (
                            <div key={team.name} className="dash-team-block">
                              <p className="dash-team-name">{team.name}</p>
                              <ul className="dash-team-members">
                                {team.members.map((member) => (
                                  <li key={member.id}>{member.name}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </InfosRow>
                    ))}
                </AccordionList>
              </section>
            )}

            {activities.length > 0 && (
              <section className="dash-section">
                <h2 className="dash-section-title">Activités</h2>
                {activities.map((activity) => (
                  <article key={activity.id} className="dash-activity">
                    <h3>
                      {activity.title}
                      {!activity.is_public && <span className="dash-badge">Surprise</span>}
                      {activity.weather_dependent && (
                        <span className="dash-badge dash-badge-ink">Selon météo</span>
                      )}
                    </h3>
                    {activity.description && <p className="dash-copy">{activity.description}</p>}
                  </article>
                ))}
              </section>
            )}
          </div>

          <aside className="dash-aside">
            <p className="dash-kicker dash-kicker--dash">À ne pas oublier</p>
            <div className="dash-inclus">
              {checklist.map((item) => (
                <div key={item.id} className="dash-inclus-item">
                  <span className="dash-inclus-icon">
                    <Check size={15} strokeWidth={2.2} />
                  </span>
                  <span className="dash-inclus-label">{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
