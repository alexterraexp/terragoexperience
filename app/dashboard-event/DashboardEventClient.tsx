'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Briefcase,
  Building2,
  Bus,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Train,
  Trophy,
  Users,
  UtensilsCrossed,
  Wheat,
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
const EVENT_HERO_BY_CODE: Record<string, string> = {
  'avb.2026':
    'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/hotel-indarra-arbonne-1.webp',
};

function eventHeroImage(event: { code: string; image?: string }) {
  return event.image || EVENT_HERO_BY_CODE[event.code.trim().toLowerCase()] || HERO_IMAGE;
}

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
  image?: string;
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

function formatStayDate(value?: string | null) {
  const d = parseDateTime(value);
  if (!d) return null;
  const weekday = d.toLocaleDateString('fr-FR', { weekday: 'short', timeZone: 'Europe/Paris' });
  const day = d.toLocaleDateString('fr-FR', { day: 'numeric', timeZone: 'Europe/Paris' });
  const month = d.toLocaleDateString('fr-FR', { month: 'short', timeZone: 'Europe/Paris' });
  return `${weekday} ${day} ${month}`;
}

function formatStayTime(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^\d{2}:\d{2}/.test(trimmed) && trimmed.length <= 8) return formatTime(trimmed);
  const d = parseDateTime(trimmed);
  if (!d) return formatTime(trimmed);
  const parts = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Paris',
  }).formatToParts(d);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value);
  if (!Number.isFinite(hour) || (hour === 0 && minute === 0) || (hour === 23 && minute >= 50)) {
    return null;
  }
  return `${String(hour).padStart(2, '0')}h${String(minute).padStart(2, '0')}`;
}

function stayFromEvent(event: EventPayload, schedule: ScheduleItem[]) {
  const sorted = [...schedule].sort((a, b) => {
    const ta = parseDateTime(a.start_time)?.getTime() ?? Number.POSITIVE_INFINITY;
    const tb = parseDateTime(b.start_time)?.getTime() ?? Number.POSITIVE_INFINITY;
    return ta - tb;
  });
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const arrivalRaw = first?.start_time ?? event.start_date;
  const departureRaw = last?.end_time ?? last?.start_time ?? event.end_date;
  return {
    arrivalDate: formatStayDate(arrivalRaw),
    arrivalTime: formatStayTime(first?.start_time) ?? formatStayTime(event.start_date),
    departureDate: formatStayDate(departureRaw),
    departureTime: formatStayTime(last?.end_time ?? last?.start_time) ?? formatStayTime(event.end_date),
  };
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

function formatScheduleHm(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^\d{2}:\d{2}/.test(trimmed) && trimmed.length <= 8) return trimmed.slice(0, 5);
  const d = parseDateTime(trimmed);
  if (!d) return null;
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatTimelineWeekday(value?: string | null) {
  const d = parseDateTime(value);
  if (!d) return null;
  return d.toLocaleDateString('fr-FR', { weekday: 'short', timeZone: 'Europe/Paris' });
}

function formatTimelineDayNum(value?: string | null) {
  const d = parseDateTime(value);
  if (!d) return null;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', timeZone: 'Europe/Paris' });
}

function formatProgrammeTime(item: ScheduleItem) {
  const start = formatStayTime(item.start_time) ?? formatTime(item.start_time);
  const end = formatStayTime(item.end_time) ?? formatTime(item.end_time);
  if (start && end) return `${start} – ${end}`;
  return start;
}

function sortedSchedule(items: ScheduleItem[]) {
  return [...items].sort((a, b) => {
    const ta = parseDateTime(a.start_time)?.getTime() ?? Number.POSITIVE_INFINITY;
    const tb = parseDateTime(b.start_time)?.getTime() ?? Number.POSITIVE_INFINITY;
    if (ta !== tb) return ta - tb;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
}

function foldTitle(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function titleHas(folded: string, keywords: string[]) {
  return keywords.some((keyword) => folded.includes(keyword));
}

function programmeIcon(title: string) {
  const props = { size: 16, strokeWidth: 1.8, color: INK } as const;
  const t = foldTitle(title);

  if (titleHas(t, ['train', 'gare', 'trajet'])) return <Train {...props} />;
  if (
    titleHas(t, ['navette', 'bus', 'transfert', 'vers lieu']) ||
    (t.includes('depart') && t.includes('hotel')) ||
    (t.includes('retour') && t.includes('hotel'))
  ) {
    return <Bus {...props} />;
  }
  if (titleHas(t, ['hotel', 'accueil', 'check-in', 'check in', 'logement'])) {
    return <Building2 {...props} />;
  }
  if (titleHas(t, ['soiree', 'afterwork', 'cocktail', 'gala'])) return <Music2 {...props} />;
  if (titleHas(t, ['dejeuner', 'diner', 'repas', 'lunch', 'brunch', 'petit-dejeuner', 'petit dejeuner'])) {
    return <UtensilsCrossed {...props} />;
  }
  if (titleHas(t, ['trophee', 'tournoi', 'competition', 'coupe', 'challenge', 'olympiade', 'volley'])) {
    return <Trophy {...props} />;
  }
  if (titleHas(t, ['producteur', 'immersion', 'ferme', 'artisan', 'vignoble', 'cave', 'fromager'])) {
    return <Wheat {...props} />;
  }
  return <Clock {...props} />;
}

function ChecklistTick({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.4 L10 17.6 L19.2 6.6"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(d);
  const num = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const year = num('year');
  const month = num('month');
  const day = num('day');
  const hour = num('hour');
  if (![year, month, day, hour].every(Number.isFinite)) return 'sans-date';
  const utc = Date.UTC(year, month - 1, day);
  const shifted = hour < 6 ? utc - 86_400_000 : utc;
  const key = new Date(shifted);
  return `${key.getUTCFullYear()}-${String(key.getUTCMonth() + 1).padStart(2, '0')}-${String(key.getUTCDate()).padStart(2, '0')}`;
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

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function smsHref(phone: string) {
  return `sms:${phone.replace(/[^\d+]/g, '')}`;
}

type InfosVariant = 'card' | 'plain';

const AccordionCtx = React.createContext<{
  openId: string | null;
  toggle: (id: string) => void;
  variant: InfosVariant;
} | null>(null);

function AccordionList({
  children,
  variant = 'card',
}: {
  children: React.ReactNode;
  variant?: InfosVariant;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));
  return (
    <AccordionCtx.Provider value={{ openId, toggle, variant }}>
      <div className={`dash-infos-list${variant === 'plain' ? ' dash-infos-list--plain' : ''}`}>
        {children}
      </div>
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
  variant,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  href?: string;
  alwaysOpen?: boolean;
  variant?: InfosVariant;
}) {
  const accordion = React.useContext(AccordionCtx);
  const rowId = id ?? title;
  const [localOpen, setLocalOpen] = useState(alwaysOpen);
  const open = alwaysOpen || (accordion ? accordion.openId === rowId : localOpen);
  const expandable = Boolean(children);
  const rowVariant = variant ?? accordion?.variant ?? 'card';
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
      {expandable && !alwaysOpen && (
        <ChevronRight size={18} strokeWidth={1.8} className="dash-infos-row-chevron" aria-hidden />
      )}
    </>
  );

  return (
    <div
      ref={rowRef}
      className={`dash-infos-row${open ? ' is-open' : ''}${rowVariant === 'plain' ? ' dash-infos-row--plain' : ''}`}
    >
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
  const [checklistOpen, setChecklistOpen] = useState(false);

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
        padding: 4.5rem 1.25rem;
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
        .dash-hero { padding: 5.5rem 2rem; }
      }
      @media (min-width: 1024px) {
        .dash-inner { padding-left: 2.5rem; padding-right: 1.5rem; }
        .dash-hero-wrap { padding-left: 2.5rem; padding-right: 1.5rem; }
        .dash-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 28rem;
          padding: 8.5rem 2rem;
        }
        .dash-hero-copy { text-align: center; }
      }
      .dash-hero-title {
        font-family: ${FONT};
        font-size: clamp(2.35rem, 6.2vw, 3.75rem);
        font-weight: 700;
        letter-spacing: -0.075em;
        line-height: 1.06;
        color: #fff;
        margin: 0;
        text-wrap: balance;
      }
      .dash-kicker {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: ${ORANGE};
        margin: 0 0 10px;
      }
      .dash-checklist-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: ${FONT};
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.25;
        color: ${ORANGE};
        margin: 0 0 16px;
      }
      .dash-checklist-fold { display: none; }
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
      .dash-section { margin: 0; }
      .dash-section > .dash-divider {
        margin: 32px 0 20px;
      }
      .dash-section-title {
        font-family: ${FONT};
        font-size: clamp(18px, 2.2vw, 22px);
        font-weight: 700;
        letter-spacing: -0.05em;
        color: ${INK};
        margin: 0 0 14px;
      }
      .dash-stay {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 20px 0 12px;
        padding: 22px 24px;
        background: ${HOME_COLORS.gray};
        border-radius: 16px;
      }
      .dash-stay-col {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-width: 0;
      }
      .dash-stay-col--arrive { text-align: left; padding-right: 18px; }
      .dash-stay-col--depart {
        text-align: right;
        padding-left: 18px;
        border-left: 1px solid rgba(12, 29, 34, 0.12);
      }
      .dash-stay-label {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.25;
        color: ${INK};
      }
      .dash-stay-date {
        padding-top: 6px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.03em;
        line-height: 1.4;
        color: ${INK};
      }
      .dash-stay-time {
        padding-top: 2px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.03em;
        line-height: 1.4;
        color: rgba(12, 29, 34, 0.5);
      }
      .dash-actions {
        margin: 4px 0 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .dash-quick-card {
        background: #f7f7f7;
        border-radius: 16px;
        padding: 4px 18px;
      }
      .dash-quick-card .dash-contact-action {
        background: #fff;
      }
      .dash-divider {
        height: 1px;
        background: rgba(12, 29, 34, 0.10);
        margin: 32px 0 20px;
        border: 0;
      }
      .dash-detail-block { margin: 0 0 22px; }
      .dash-detail-block:last-child { margin-bottom: 0; }
      .dash-contact-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
      }
      .dash-contact-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 1px solid rgba(12, 29, 34, 0.12);
        background: ${HOME_COLORS.gray};
        color: ${INK};
        text-decoration: none;
      }
      .dash-contact-action:hover { background: rgba(12, 29, 34, 0.06); }
      .dash-quick-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 0;
      }
      .dash-quick-row-icon {
        flex-shrink: 0;
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${INK};
      }
      .dash-quick-row-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .dash-quick-row-title {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.25;
        color: ${INK};
      }
      .dash-quick-row-sub {
        font-size: 13px;
        font-weight: 500;
        color: rgba(12, 29, 34, 0.5);
        line-height: 1.35;
        overflow-wrap: break-word;
      }
      .dash-quick-row-actions {
        flex-shrink: 0;
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .dash-detail-label {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.3;
        color: ${INK};
        margin: 0 0 4px;
      }
      .dash-detail-value {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: -0.03em;
        line-height: 1.5;
        color: rgba(12, 29, 34, 0.7);
      }
      .dash-detail-value a { color: ${ORANGE}; font-weight: 600; text-decoration: none; }
      .dash-detail-value a:hover { text-decoration: underline; }
      .dash-infos-list { display: flex; flex-direction: column; gap: 8px; overflow-anchor: none; }
      .dash-infos-list--plain { gap: 0; }
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
      .dash-infos-row--plain {
        background: transparent;
        border: none;
        border-radius: 0;
      }
      .dash-infos-row--plain .dash-infos-row-trigger {
        padding: 18px 0;
      }
      .dash-infos-row--plain .dash-infos-row-trigger:hover { background: transparent; }
      .dash-infos-row--plain .dash-infos-row-body {
        padding: 0 0 16px 34px;
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
      .dash-inclus { display: flex; flex-direction: column; gap: 4px; }
      .dash-inclus-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px 0;
      }
      .dash-inclus-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 12px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${ORANGE};
      }
      .dash-inclus-label {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.03em;
        line-height: 1.4;
        color: rgba(12, 29, 34, 0.72);
      }
      @media (min-width: 1024px) {
        .dash-inclus { gap: 2px; }
        .dash-inclus-item { padding: 5px 0; gap: 10px; }
        .dash-inclus-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${ORANGE};
          color: #fff;
        }
        .dash-inclus-label { line-height: 1.25; }
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
      .dash-timeline { display: flex; flex-direction: column; }
      .dash-timeline-item {
        display: grid;
        grid-template-columns: 40px minmax(0, 1fr);
        column-gap: 14px;
        align-items: stretch;
      }
      .dash-timeline-rail {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2px;
      }
      .dash-timeline-rail::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 1px;
        background: rgba(12, 29, 34, 0.12);
        transform: translateX(-50%);
      }
      .dash-timeline-item--dated:not(:first-child) .dash-timeline-rail {
        padding-top: 36px;
      }
      .dash-timeline-item--dated:not(:first-child) .dash-timeline-card {
        margin-top: 34px;
      }
      .dash-timeline-item--dated .dash-timeline-rail::before {
        top: 67px;
      }
      .dash-timeline-item--dated:not(:first-child) .dash-timeline-rail::before {
        top: 101px;
      }
      .dash-timeline-item:last-child .dash-timeline-rail::before {
        display: none;
      }
      .dash-timeline-weekday {
        padding-top: 6px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1;
        color: ${INK};
        margin-bottom: 6px;
      }
      .dash-timeline-dot {
        position: relative;
        z-index: 1;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: ${HOME_COLORS.gray};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: ${INK};
      }
      .dash-timeline-card {
        display: flex;
        align-items: center;
        gap: 10px;
        align-self: start;
        min-width: 0;
        margin-bottom: 8px;
        padding: 15px 12px;
        min-height: 60px;
        background: ${HOME_COLORS.gray};
        border-radius: 14px;
      }
      .dash-timeline-item:last-child .dash-timeline-card { margin-bottom: 0; }
      .dash-timeline-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${INK};
      }
      .dash-timeline-icon svg {
        width: 16px;
        height: 16px;
      }
      .dash-timeline-card-text {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .dash-timeline-card-title {
        font-size: 13.5px;
        font-weight: 700;
        letter-spacing: -0.03em;
        line-height: 1.25;
        color: ${INK};
      }
      .dash-timeline-card-sub {
        padding-top: 1px;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.03em;
        line-height: 1.35;
        color: rgba(12, 29, 34, 0.5);
      }
      @media (min-width: 1024px) {
        .dash-timeline-card {
          gap: 12px;
          margin-bottom: 10px;
          padding: 16px 16px;
          min-height: 68px;
        }
        .dash-timeline-icon {
          width: 40px;
          height: 40px;
        }
        .dash-timeline-icon svg {
          width: 18px;
          height: 18px;
        }
        .dash-timeline-card-title { font-size: 14.5px; }
        .dash-timeline-card-sub { font-size: 12.5px; }
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
        border-radius: 16px;
        padding: 22px 22px 20px;
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
        .dash-aside-mobile { display: none; }
        .dash-checklist-fold {
          display: block;
          margin: 28px 0 12px;
          border: 1.5px solid ${ORANGE};
          border-radius: 16px;
          background: #fff;
          overflow: hidden;
        }
        .dash-checklist-fold-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border: none;
          background: transparent;
          color: ${ORANGE};
          font-family: inherit;
          cursor: pointer;
          text-align: left;
        }
        .dash-checklist-fold-trigger .dash-quick-row-title {
          color: ${ORANGE};
        }
        .dash-checklist-fold-chevron {
          margin-left: auto;
          flex-shrink: 0;
          color: ${ORANGE};
          transition: transform 0.22s ease;
        }
        .dash-checklist-fold.is-open .dash-checklist-fold-chevron {
          transform: rotate(90deg);
        }
        .dash-checklist-fold-body {
          padding: 0 20px 16px;
        }
        .dash-checklist-fold-body .dash-inclus {
          gap: 0;
        }
        .dash-checklist-fold-body .dash-inclus-item {
          align-items: flex-start;
          gap: 8px;
          padding: 3px 0;
        }
        .dash-checklist-fold-body .dash-inclus-icon {
          width: auto;
          height: auto;
          background: transparent;
          border-radius: 0;
          padding-top: 1px;
          color: ${ORANGE};
        }
        .dash-checklist-fold-body .dash-inclus-label {
          color: ${ORANGE};
          font-size: 13px;
          font-weight: 500;
          line-height: 1.15;
        }
        .dash-stay { padding: 18px 16px; margin-top: 16px; }
        .dash-stay-col--arrive { padding-right: 14px; }
        .dash-stay-col--depart { padding-left: 14px; }
        .dash-infos-row-trigger {
          padding: 14px;
          min-height: 48px;
        }
        .dash-infos-row--plain .dash-infos-row-trigger {
          padding: 16px 0;
          min-height: 0;
        }
        .dash-infos-row-body { padding: 0 14px 12px 14px; }
        .dash-infos-row--plain .dash-infos-row-body { padding: 0 0 14px 34px; }
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
          min-height: 64svh;
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

  const { event, checklist, activities, schedule } = data;
  const teamDays = groupTeamsByDay(data.teams ?? []);
  const stay = stayFromEvent(event, schedule);
  const hasStay = Boolean(stay.arrivalDate || stay.departureDate);
  const hasLocation = Boolean(event.location_name || event.location_address || event.location_maps_url);
  const hasContact = Boolean(event.contact_name || event.contact_phone);
  const weather = event.weather;
  const hasActions = hasLocation || hasContact;
  const hasTeams = teamDays.some((day) => day.teams.length > 0);
  const programme = sortedSchedule(schedule);

  return (
    <div className="dash-page dash-page--open">
      {pageCss}
      <div className="dash-hero-wrap">
        <div className="dash-hero">
          <div className="dash-hero-media">
            <Image
              src={eventHeroImage(event)}
              alt={event.location_name || event.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="dash-hero-shade" aria-hidden />
          <div className="dash-hero-copy">
            <p
              className="dash-hero-kicker mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85"
              style={{ fontFamily: FONT }}
            >
              Espace participant
            </p>
            <h1 className="dash-hero-title">
              {event.company_name || event.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="dash-inner">
        <div className="dash-cols">
          <div>
            <header style={{ marginBottom: 28 }}>
              <p className="dash-kicker">Votre séminaire</p>
              <h2 className="dash-title" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', marginBottom: 0 }}>
                {event.name}
              </h2>
            </header>

            {hasStay && (
              <div className="dash-stay">
                <div className="dash-stay-col dash-stay-col--arrive">
                  <span className="dash-stay-label">Arrivée</span>
                  {stay.arrivalDate && <span className="dash-stay-date">{stay.arrivalDate}</span>}
                  {stay.arrivalTime && <span className="dash-stay-time">{stay.arrivalTime}</span>}
                </div>
                <div className="dash-stay-col dash-stay-col--depart">
                  <span className="dash-stay-label">Départ</span>
                  {stay.departureDate && <span className="dash-stay-date">{stay.departureDate}</span>}
                  {stay.departureTime && <span className="dash-stay-time">{stay.departureTime}</span>}
                </div>
              </div>
            )}

            {checklist.length > 0 && (
              <div className={`dash-checklist-fold${checklistOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="dash-checklist-fold-trigger"
                  aria-expanded={checklistOpen}
                  onClick={() => setChecklistOpen((v) => !v)}
                >
                  <span className="dash-quick-row-icon" aria-hidden>
                    <Briefcase size={18} strokeWidth={1.7} color={ORANGE} />
                  </span>
                  <span className="dash-quick-row-text">
                    <span className="dash-quick-row-title">À ne pas oublier</span>
                  </span>
                  <ChevronRight size={18} strokeWidth={1.8} className="dash-checklist-fold-chevron" aria-hidden />
                </button>
                {checklistOpen && (
                  <div className="dash-checklist-fold-body">
                    <div className="dash-inclus">
                      {checklist.map((item) => (
                        <div key={item.id} className="dash-inclus-item">
                          <span className="dash-inclus-icon">
                            <ChecklistTick size={13} />
                          </span>
                          <span className="dash-inclus-label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {hasActions && (
              <div className="dash-actions">
                {hasLocation && (
                  <div className="dash-quick-card">
                  <div className="dash-quick-row">
                    <span className="dash-quick-row-icon" aria-hidden>
                      <Building2 size={18} strokeWidth={1.7} color={INK} />
                    </span>
                    <span className="dash-quick-row-text">
                      <span className="dash-quick-row-title">Votre logement</span>
                      {(event.location_name || event.location_address) && (
                        <span className="dash-quick-row-sub">
                          {event.location_name || event.location_address}
                        </span>
                      )}
                    </span>
                    {event.location_maps_url && (
                      <span className="dash-quick-row-actions">
                        <a
                          className="dash-contact-action"
                          href={event.location_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ouvrir dans Maps"
                        >
                          <MapPin size={16} strokeWidth={1.8} />
                        </a>
                      </span>
                    )}
                  </div>
                  </div>
                )}
                {hasContact && (
                  <div className="dash-quick-card">
                  <div className="dash-quick-row">
                    <span className="dash-quick-row-icon" aria-hidden>
                      <MessageCircle size={18} strokeWidth={1.7} color={INK} />
                    </span>
                    <span className="dash-quick-row-text">
                      <span className="dash-quick-row-title">Contacter l&apos;équipe TerraGo</span>
                      {(event.contact_name || event.contact_phone) && (
                        <span className="dash-quick-row-sub">
                          {event.contact_name || event.contact_phone}
                        </span>
                      )}
                    </span>
                    {event.contact_phone && (
                      <span className="dash-quick-row-actions">
                        <a
                          className="dash-contact-action"
                          href={telHref(event.contact_phone)}
                          aria-label="Appeler l'équipe TerraGo"
                        >
                          <Phone size={16} strokeWidth={1.8} />
                        </a>
                        <a
                          className="dash-contact-action"
                          href={smsHref(event.contact_phone)}
                          aria-label="Envoyer un message à l'équipe TerraGo"
                        >
                          <MessageCircle size={16} strokeWidth={1.8} />
                        </a>
                      </span>
                    )}
                  </div>
                  </div>
                )}
              </div>
            )}

            {weather && (
              <section className="dash-section">
                <hr className="dash-divider" />
                <h2 className="dash-section-title">Météo</h2>
                <p className="dash-detail-value">
                  {weather.label}
                  {weather.temperature != null ? ` · ${Math.round(weather.temperature)}°` : ''}
                  {(weather.temp_min != null || weather.temp_max != null) && (
                    <>
                      {' '}
                      (
                      {weather.temp_min != null ? `${Math.round(weather.temp_min)}°` : ''}
                      {weather.temp_min != null && weather.temp_max != null ? ' / ' : ''}
                      {weather.temp_max != null ? `${Math.round(weather.temp_max)}°` : ''}
                      )
                    </>
                  )}
                </p>
              </section>
            )}

            {programme.length > 0 && (
              <section className="dash-section">
                <hr className="dash-divider" />
                <h2 className="dash-section-title">Planning</h2>
                <div className="dash-timeline">
                  {programme.map((item, index) => {
                    const showDate =
                      index === 0 ||
                      dayKeyFromStart(item.start_time) !== dayKeyFromStart(programme[index - 1].start_time);
                    const timeLabel = formatProgrammeTime(item);
                    return (
                      <div
                        key={item.id}
                        className={`dash-timeline-item${showDate ? ' dash-timeline-item--dated' : ''}`}
                      >
                        <div className="dash-timeline-rail" aria-hidden={!showDate}>
                          {showDate && (
                            <>
                              <span className="dash-timeline-weekday">
                                {formatTimelineWeekday(item.start_time)}
                              </span>
                              <span className="dash-timeline-dot">
                                {formatTimelineDayNum(item.start_time)}
                              </span>
                            </>
                          )}
                        </div>
                        <article className="dash-timeline-card">
                          <span className="dash-timeline-icon" aria-hidden>
                            {programmeIcon(item.title)}
                          </span>
                          <span className="dash-timeline-card-text">
                            <span className="dash-timeline-card-title">{item.title}</span>
                            {timeLabel && <span className="dash-timeline-card-sub">{timeLabel}</span>}
                          </span>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {hasTeams && (
              <section className="dash-section" aria-labelledby="dash-teams-title">
                <hr className="dash-divider" />
                <h2 id="dash-teams-title" className="dash-section-title">
                  Équipes
                </h2>
                <AccordionList variant="plain">
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
                <hr className="dash-divider" />
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

          {checklist.length > 0 && (
            <aside className="dash-aside">
              <h2 className="dash-checklist-title">
                <Briefcase size={16} strokeWidth={1.8} aria-hidden />
                À ne pas oublier
              </h2>
              <div className="dash-inclus">
                {checklist.map((item) => (
                  <div key={item.id} className="dash-inclus-item">
                    <span className="dash-inclus-icon">
                      <ChecklistTick size={11} />
                    </span>
                    <span className="dash-inclus-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
