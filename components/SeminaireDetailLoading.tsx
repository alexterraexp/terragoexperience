type SeminaireDetailLoadingProps = {
  /** Plein écran fixe au-dessus de tout (clic depuis la liste des offres) */
  variant?: 'page' | 'overlay';
};

export default function SeminaireDetailLoading({
  variant = 'page',
}: SeminaireDetailLoadingProps) {
  const outer =
    variant === 'overlay'
      ? {
          position: 'fixed' as const,
          inset: 0,
          zIndex: 10000,
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(8px)',
        }
      : {
          minHeight: '100vh',
          background: '#ffffff',
        };

  return (
    <div
      style={{
        ...outer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 44,
            height: 44,
            border: '3px solid rgba(12, 29, 34,0.12)',
            borderTop: '3px solid #0c1d22',
            borderRadius: '50%',
            animation: 'semDetailSpin 0.75s linear infinite',
            margin: '0 auto 20px',
          }}
        />
        <p
          style={{
            color: 'rgba(12, 29, 34, 0.60)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Chargement…
        </p>
        <style>{`@keyframes semDetailSpin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  );
}
