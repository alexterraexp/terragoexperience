'use client';

import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from '@/context/ModalContext';
import RealiseLogement from '@/components/RealiseLogement';
import RealisePhotos from '@/components/RealisePhotos';
import RealiseProgramme from '@/components/RealiseProgramme';
import { HOME_RADIUS } from '@/components/home/homeStyles';
import {
  REALISES_PATH,
  logementRempli,
  realiseFacts,
  type RealiseAvis,
  type SeminaireRealise,
} from '@/lib/seminairesRealises';

const titleClass =
  'font-sans text-[32px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px]';

export default function RealiseArticle({
  item,
  preview,
}: {
  item: SeminaireRealise;
  preview: boolean;
}) {
  const facts = realiseFacts(item);
  const { openModal } = useModal();
  const showLogement = logementRempli(item.logement);

  return (
    <article className={`bg-white font-sans ${preview ? 'pb-16' : ''}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="mx-auto w-full max-w-[1100px] px-4 pb-4 pt-[calc(8.5rem+env(safe-area-inset-top))] sm:px-6">
        <Link
          href={REALISES_PATH}
          className="mb-4 inline-flex items-center rounded-full border border-[#0c1d22]/15 bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-[-0.02em] text-[#0c1d22]"
        >
          ← Retour
        </Link>
        {item.images.length > 0 && <RealisePhotos images={item.images} label={item.titre} />}
        <div className={item.images.length > 0 ? 'pt-8 sm:pt-10' : ''}>
          <span className="inline-flex rounded-full bg-[#ec6435] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Séminaire réalisé
          </span>
          <h1 className="mt-4 max-w-4xl text-balance font-sans text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.075em] text-[#0c1d22]">
            {item.titre}
          </h1>
          {facts.length > 0 && (
            <p className="mt-4 flex flex-wrap items-center font-sans text-sm font-medium tracking-[-0.03em] text-[#0c1d22]/70 sm:text-base">
              {facts.map((fact, index) => (
                <span key={`${fact}-${index}`} className="inline-flex items-center">
                  {index > 0 && <span aria-hidden className="mx-3 h-[0.9em] w-px bg-current opacity-40" />}
                  {fact}
                </span>
              ))}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-20 px-4 py-10 sm:gap-24 sm:px-6 sm:py-14">
        {item.brief && (
          <section className="px-6 py-8 sm:px-10 sm:py-12" style={{ background: '#f4f4f4', borderRadius: HOME_RADIUS }}>
            <h2 className={titleClass}>
              Le <span className="font-bold">brief</span>
            </h2>
            <p className="mt-6 whitespace-pre-wrap font-sans text-[15px] font-normal leading-[1.7] tracking-[-0.04em] text-[#0c1d22]/70 sm:text-[16px]">
              {item.brief}
            </p>
          </section>
        )}

        {item.lieux.some((lieu) => lieu.photo || lieu.phrase) && (
          <section>
            <h2 className={titleClass}>
              Les <span className="font-bold">lieux</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {item.lieux.filter((lieu) => lieu.photo || lieu.phrase).map((lieu) => (
                <li key={`${lieu.nom}-${lieu.photo}`} className="overflow-hidden rounded-[22px] bg-[#f4f4f4]">
                  {lieu.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={lieu.photo} alt="" className="aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="px-5 py-5">
                    <h3 className="font-sans text-xl font-semibold tracking-[-0.04em] text-[#0c1d22]">{lieu.nom}</h3>
                    {lieu.phrase && (
                      <p className="mt-2 font-sans text-[15px] leading-relaxed tracking-[-0.03em] text-[#0c1d22]/65">
                        {lieu.phrase}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {item.programme.length > 0 && (
          <section>
            <h2 className={titleClass}>
              Le <span className="font-bold">programme</span>
            </h2>
            <div className="mt-10">
              <RealiseProgramme jours={item.programme} />
            </div>
          </section>
        )}

        {showLogement && (
          <section>
            <h2 className={titleClass}>
              Le <span className="font-bold">logement</span>
            </h2>
            <RealiseLogement logement={item.logement} />
          </section>
        )}

        {item.avis.length > 0 && (
          <section>
            <h2 className={titleClass}>
              Les <span className="font-bold">avis</span>
            </h2>
            <AvisSwipe avis={item.avis} />
          </section>
        )}

        <section className="px-6 py-10 sm:px-10 sm:py-12" style={{ background: '#0c1d22', borderRadius: HOME_RADIUS }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ec6435]">Votre prochain séminaire</p>
          <h2 className="mt-3 max-w-xl font-sans text-[32px] font-bold leading-[1.05] tracking-[-0.075em] text-white sm:text-[40px]">
            Et si on imaginait le vôtre ?
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-[15px] leading-[1.7] tracking-[-0.03em] text-white/70 sm:text-base">
            On part de votre brief : l’équipe, le rythme, ce que vous voulez qu’il reste après. Ensuite on compose le séjour avec un producteur, des journées sur le terrain et l’hébergement qui va avec.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {[
              'Un brief, une réponse sous 48 h',
              'Un lieu et un programme sur mesure',
              'L’organisation prise en charge',
            ].map((line) => (
              <li key={line} className="flex w-fit items-center gap-2.5 rounded-full bg-white/10 px-4 py-3 font-sans text-sm leading-snug text-white/85">
                <Check className="size-4 shrink-0 text-[#ec6435]" strokeWidth={2.5} aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openModal}
            className="mt-8 inline-flex rounded-full bg-[#ec6435] px-6 py-3 text-sm font-semibold text-white"
          >
            Partagez votre brief
          </button>
        </section>
      </div>

      {preview && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-[#0c1d22] px-4 py-3 text-center font-sans text-sm text-white">
          Aperçu studio. {item.publie ? 'Cette page est en ligne.' : 'Cette page n’est pas encore en ligne.'}
        </div>
      )}
    </article>
  );
}

function AvisCard({ avis }: { avis: RealiseAvis }) {
  return (
    <blockquote className="bg-[#f4f4f4] px-6 py-6 sm:px-8 sm:py-7" style={{ borderRadius: HOME_RADIUS }}>
      {avis.note > 0 && (
        <p className="mb-3.5 flex gap-0.5 text-[#ec6435]" aria-label={`${avis.note} sur 5`}>
          {[1, 2, 3, 4, 5].map((note) => (
            <Star key={note} className="size-4" fill={note <= avis.note ? 'currentColor' : 'none'} aria-hidden />
          ))}
        </p>
      )}
      <p className="whitespace-pre-wrap font-sans text-[15px] font-normal leading-[1.6] tracking-[-0.02em] text-[#0c1d22] sm:text-[16px]">
        « {avis.texte} »
      </p>
      {(avis.auteur || avis.entreprise) && (
        <footer className="mt-3 font-sans text-[12px] font-semibold tracking-[-0.02em] text-[#ec6435]">
          {[avis.auteur, avis.entreprise].filter(Boolean).join(' · ')}
        </footer>
      )}
    </blockquote>
  );
}

function AvisSwipe({ avis }: { avis: RealiseAvis[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const stepOf = (track: HTMLElement) => {
    const slide = track.children[0] as HTMLElement | undefined;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return (slide?.getBoundingClientRect().width || track.clientWidth || 1) + gap;
  };

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / stepOf(track));
    setActive(Math.max(0, Math.min(index, avis.length - 1)));
  }, [avis.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || avis.length < 2) return;
    const onScroll = () => sync();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sync);
    };
  }, [avis.length, sync]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * stepOf(track), behavior: 'smooth' });
    setActive(index);
  };

  if (avis.length === 1) {
    return (
      <div className="mt-8">
        <AvisCard avis={avis[0]} />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x_pan-y] [&::-webkit-scrollbar]:hidden"
        aria-label="Avis"
      >
        {avis.map((item, index) => (
          <div
            key={`${item.auteur}-${index}`}
            className="w-full min-w-0 max-w-full shrink-0 basis-full snap-start snap-always overflow-hidden"
            role="group"
            aria-label={`Avis ${index + 1} sur ${avis.length}`}
          >
            <AvisCard avis={item} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {avis.map((item, index) => (
          <button
            key={`${item.auteur}-dot-${index}`}
            type="button"
            aria-label={`Avis ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: index === active ? 28 : 8,
              background: index === active ? '#ec6435' : 'rgba(12,29,34,0.18)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
