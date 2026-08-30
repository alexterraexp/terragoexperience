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
