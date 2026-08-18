import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { homeCtaOutlineClass } from '../components/home/homeStyles';

export const metadata: Metadata = {
  title: 'Page introuvable — TerraGo',
  robots: { index: false, follow: false },
};

const poppins: CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontStyle: 'normal',
};

export default function NotFound() {
  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 pb-28 pt-48 text-center sm:pt-56 lg:pt-64"
      style={poppins}
    >
      <h1
        className="text-[#0c1d22]"
        style={{
          ...poppins,
          fontSize: 'clamp(26px, 4.5vw, 42px)',
          fontWeight: 700,
          letterSpacing: '-0.075em',
          lineHeight: 1.1,
        }}
      >
        Oups, mauvaise parcelle 🌾
      </h1>
      <p
        className="mt-4 text-[#0c1d22]"
        style={{
          ...poppins,
          fontSize: 'clamp(18px, 3vw, 28px)',
          fontWeight: 700,
          letterSpacing: '-0.06em',
          lineHeight: 1.2,
        }}
      >
        Cette page est introuvable.
      </p>
      <p
        className="mt-4 max-w-2xl text-[#0c1d22]/65"
        style={{
          ...poppins,
          fontSize: 'clamp(15px, 2.2vw, 18px)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          lineHeight: 1.5,
        }}
      >
        En revanche, on connaît quelques beaux endroits où vous emmener.
      </p>
      <Link href="/seminaires-entreprise" className={`mt-10 ${homeCtaOutlineClass}`}>
        Découvrir nos séminaires
      </Link>
    </div>
  );
}
