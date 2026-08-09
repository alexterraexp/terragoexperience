import { HOME_COLORS, HOME_RADIUS } from './home/homeStyles';

type SeminaireDetailLoadingProps = {
  /** Plein écran fixe au-dessus de tout (clic depuis la liste des offres) */
  variant?: 'page' | 'overlay';
};

export default function SeminaireDetailLoading({
  variant = 'page',
}: SeminaireDetailLoadingProps) {
  const isOverlay = variant === 'overlay';

  return (
    <div
      className="sem-detail-loading"
      style={{
        ...(isOverlay
          ? {
              position: 'fixed' as const,
              inset: 0,
              zIndex: 10000,
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }
          : {
              minHeight: '100vh',
              background: HOME_COLORS.white,
            }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Poppins', sans-serif",
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          textAlign: 'center',
          padding: '36px 28px 32px',
          borderRadius: HOME_RADIUS,
          background: HOME_COLORS.gray,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            margin: '0 auto 20px',
            borderRadius: '50%',
            border: '3px solid rgba(12, 29, 34, 0.10)',
            borderTopColor: HOME_COLORS.orange,
            animation: 'semDetailSpin 0.75s linear infinite',
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: HOME_COLORS.primary,
          }}
        >
          Chargement…
        </p>
        <p
          style={{
            margin: '10px 0 0',
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 1.5,
            color: 'rgba(12, 29, 34, 0.55)',
          }}
        >
          Préparation de l'offre séminaire
        </p>
      </div>

      <style>{`
        @keyframes semDetailSpin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
