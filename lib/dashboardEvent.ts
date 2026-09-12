export const DASHBOARD_EVENT_PATH = '/dashboard-event';

export const DASHBOARD_HERO_IMAGE =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/exception/111112.webp';

export const DASHBOARD_HERO_IMAGE_ALT = 'Grande salle en pierre d’un domaine d’exception';

const AVB_HERO =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/hotel-indarra-arbonne-1.webp';

export const EVENT_HERO_BY_CODE: Record<string, string> = {
  avb2026: AVB_HERO,
};

export function seminarSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function eventHeroImage(event: { code: string; image?: string }) {
  if (event.image) return event.image;
  const compact = event.code.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return EVENT_HERO_BY_CODE[compact] || DASHBOARD_HERO_IMAGE;
}

export type TeamDayKey = 'samedi' | 'dimanche';

/** Heure locale Paris à laquelle chaque journée d’équipes se dévoile. */
export const TEAM_DAY_REVEAL_LOCAL: Record<TeamDayKey, { hour: number; minute: number }> = {
  samedi: { hour: 10, minute: 0 },
  dimanche: { hour: 9, minute: 0 },
};

export function teamDayKey(value?: string | null): TeamDayKey | null {
  const t = (value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (t.includes('samedi') || t.includes('saturday') || t === 'sam' || t === 'sat') return 'samedi';
  if (t.includes('dimanche') || t.includes('sunday') || t === 'dim' || t === 'sun') return 'dimanche';
  return null;
}

export function addDaysYmd(ymd: string, days: number) {
  const [year, month, day] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(year, month - 1, day + days));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

export function ymdInParis(value?: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isFinite(parsed.getTime())) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(parsed);
  }
  const match = value.trim().match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? null;
}

export function saturdayYmdFromStart(startDate?: string | null): string | null {
  const ymd = ymdInParis(startDate);
  if (!ymd) return null;
  const [year, month, day] = ymd.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  if (weekday === 6) return ymd;
  if (weekday === 0) return addDaysYmd(ymd, -1);
  return addDaysYmd(ymd, 6 - weekday);
}

/** Instant UTC correspondant à une date/heure murale à Paris. */
export function parisLocalToIso(ymd: string, hour: number, minute: number): string {
  const [year, month, day] = ymd.split('-').map(Number);
  const desiredAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  const parisWallAsUtc = (ms: number) => {
    const parts = Object.fromEntries(
      fmt
        .formatToParts(new Date(ms))
        .filter((part) => part.type !== 'literal')
        .map((part) => [part.type, part.value]),
    );
    return Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
  };
  let utc = desiredAsUtc;
  utc -= parisWallAsUtc(utc) - desiredAsUtc;
  utc -= parisWallAsUtc(utc) - desiredAsUtc;
  return new Date(utc).toISOString();
}

export function defaultTeamRevealAt(day: TeamDayKey, startDate?: string | null): string | null {
  const saturday = saturdayYmdFromStart(startDate);
  if (!saturday) return null;
  const ymd = day === 'samedi' ? saturday : addDaysYmd(saturday, 1);
  const { hour, minute } = TEAM_DAY_REVEAL_LOCAL[day];
  return parisLocalToIso(ymd, hour, minute);
}
