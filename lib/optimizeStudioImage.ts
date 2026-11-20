import sharp from 'sharp';

/** Plus grand côté conservé. Suffisant pour les visuels pleine largeur du site. */
const MAX_EDGE = 2000;

/**
 * Redimensionne et réencode en WebP. Les données EXIF (dont l’orientation) sont appliquées puis retirées.
 */
export async function optimizeStudioImage(input: Buffer): Promise<Buffer> {
  return sharp(input, { failOn: 'none', limitInputPixels: 50_000_000 })
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 78, effort: 4 })
    .toBuffer();
}
