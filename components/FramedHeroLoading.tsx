import { HOME_COLORS, HOME_RADIUS, homeFramedHeroWideAspectClass } from './home/homeStyles';

/** Skeleton de héros pendant la transition de route (loading.tsx). */
export default function FramedHeroLoading() {
  return (
    <div
      className="overflow-x-hidden bg-white"
      style={{ fontFamily: "'Poppins', sans-serif", minHeight: '70vh' }}
      aria-busy="true"
      aria-live="polite"
    >
      <section className="relative w-full bg-white pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:pt-[calc(10.5rem+env(safe-area-inset-top))]">
        <div className="relative mx-auto max-w-[1280px] px-5 pb-2 sm:px-8">
          <div
            className={`relative ${homeFramedHeroWideAspectClass}`}
            style={{
              borderRadius: HOME_RADIUS,
              background: `linear-gradient(145deg, ${HOME_COLORS.primary} 0%, #163038 48%, ${HOME_COLORS.primary} 100%)`,
            }}
          >
            <div className="framed-hero-loading-shimmer absolute inset-0 overflow-hidden" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2.5px solid rgba(255,255,255,0.18)',
                  borderTopColor: HOME_COLORS.orange,
                  animation: 'framedHeroLoadingSpin 0.8s linear infinite',
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Chargement…
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-white/10">
              <div
                className="framed-hero-loading-bar h-full w-1/3"
                style={{ background: HOME_COLORS.orange }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes framedHeroLoadingSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes framedHeroLoadingShimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes framedHeroLoadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .framed-hero-loading-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          width: 55%;
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 45%,
            transparent 100%
          );
          animation: framedHeroLoadingShimmer 1.35s ease-in-out infinite;
        }
        .framed-hero-loading-bar {
          animation: framedHeroLoadingBar 1.1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
