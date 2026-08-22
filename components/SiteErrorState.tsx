import type { CSSProperties } from 'react';
import Link from 'next/link';

const poppins: CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontStyle: 'normal',
};

const compactCtaClass =
  'mt-5 inline-flex max-w-[min(100%,18rem)] items-center justify-center rounded-full border border-[#0c1d22] bg-white px-4 py-1 text-[10px] font-semibold leading-snug tracking-[-0.02em] text-[#0c1d22] transition-colors hover:bg-[#0c1d22] hover:text-white sm:max-w-none sm:px-5 sm:py-1.5 sm:text-[11px]';

type SiteErrorStateProps = {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
};

export default function SiteErrorState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: SiteErrorStateProps) {
  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 pb-28 pt-48 text-center sm:pt-56 lg:pt-64"
      style={poppins}
    >
      <h1
        className="max-w-xl text-[#0c1d22]"
        style={{
          ...poppins,
          fontSize: 'clamp(18px, 3vw, 24px)',
          fontWeight: 700,
          letterSpacing: '-0.06em',
          lineHeight: 1.25,
        }}
      >
        {title}
      </h1>
      <p
        className="mt-3 max-w-md text-[#0c1d22]/65"
        style={{
          ...poppins,
          fontSize: 'clamp(13px, 1.8vw, 15px)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          lineHeight: 1.55,
        }}
      >
        {description}
      </p>
      <Link href={ctaHref} className={compactCtaClass}>
        {ctaLabel}
      </Link>
    </div>
  );
}
