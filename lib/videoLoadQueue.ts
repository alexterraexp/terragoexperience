/** Limite le nombre de chargements vidéo simultanés (hors hero). */
let activeLoads = 0;
const MAX_CONCURRENT = 1;
const waitQueue: Array<() => void> = [];

export function acquireVideoSlot(): Promise<void> {
  return new Promise((resolve) => {
    const tryAcquire = () => {
      if (activeLoads < MAX_CONCURRENT) {
        activeLoads += 1;
        resolve();
      } else {
        waitQueue.push(tryAcquire);
      }
    };
    tryAcquire();
  });
}

export function releaseVideoSlot(): void {
  activeLoads = Math.max(0, activeLoads - 1);
  const next = waitQueue.shift();
  if (next) next();
}
