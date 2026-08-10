/**
 * Crédits photo par URL exacte.
 * Si une même image est réutilisée ailleurs, le crédit suit automatiquement.
 */
const HOME =
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME';

const IMAGE_COPYRIGHT_BY_URL: Record<string, string> = {
  // ── Marine Van-den-Broek (chez le producteur) ──
  [`${HOME}/seminaire/producteur/578192052.jpg`]: 'Marine Van-den-Broek',
  [`${HOME}/seminaire/producteur/Sol-Sologne-Loiret-table-Marine-Van-den-Broek-responsive.jpg`]:
    'Marine Van-den-Broek',
  [`${HOME}/seminaire/producteur/7852905.jpg`]: 'Marine Van-den-Broek',
  [`${HOME}/seminaire/producteur/41906523-Marine-Van-den-Broek`]: 'Marine Van-den-Broek',
  [`${HOME}/seminaire/producteur/859241-Marine-Van-den-Broek.webp`]: 'Marine Van-den-Broek',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/sol/producteurssol.png':
    'Marine Van-den-Broek',

  // ── Pierine di Giacomo (à la ferme) ──
  [`${HOME}/seminaire/ferme/8953021.jpg`]: 'Pierine di Giacomo',
  [`${HOME}/maraicher-explication.png`]: 'Pierine di Giacomo',
  [`${HOME}/seminaire/ferme/730507323.jpg`]: 'Pierine di Giacomo',
  [`${HOME}/seminaire/ferme/794104642.jpg`]: 'Pierine di Giacomo',
  [`${HOME}/seminaire/ferme/723951348.jpg`]: 'Pierine di Giacomo',
  'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/clefs%20ferme/Benoit.jpg':
    'Pierine di Giacomo',

  // ── Youza Ecolodge (pleine nature) ──
  [`${HOME}/seminaire/nature/645728910.webp`]: 'Youza Ecolodge',
  [`${HOME}/seminaire/nature/74289013.png`]: 'Youza Ecolodge',
};

/** Retourne le crédit photo pour une URL, ou undefined. */
export function getImageCopyright(src: string | undefined | null): string | undefined {
  if (!src) return undefined;
  return IMAGE_COPYRIGHT_BY_URL[src];
}
