const MAX_EDGE = 2000;

/**
 * Allège la photo dans le navigateur avant l’envoi, pour rester sous la limite de la requête.
 * Le serveur réencode ensuite en WebP.
 */
export async function prepareStudioPhoto(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || typeof createImageBitmap !== 'function') return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      return file;
    }
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    return file;
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob =
    (await canvasToBlob(canvas, 'image/webp', 0.8)) ?? (await canvasToBlob(canvas, 'image/jpeg', 0.82));
  if (!blob || blob.size >= file.size) return file;

  const base = file.name.replace(/\.[^.]+$/, '') || 'photo';
  const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
  return new File([blob], `${base}.${ext}`, { type: blob.type });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}
