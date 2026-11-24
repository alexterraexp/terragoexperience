import Link from 'next/link';
import RealisePhotos from '@/components/RealisePhotos';
import RealiseProgramme from '@/components/RealiseProgramme';
import { HOME_RADIUS } from '@/components/home/homeStyles';
import { realiseFacts, type SeminaireRealise } from '@/lib/seminairesRealises';

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

  return (
    <article className={`bg-white font-sans ${preview ? 'pb-16' : ''}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="mx-auto w-full max-w-[1100px] px-4 pb-4 pt-[calc(8.5rem+env(safe-area-inset-top))] sm:px-6">
        {item.images.length > 0 && <RealisePhotos images={item.images} label={item.titre} />}
        <div className={item.images.length > 0 ? 'pt-8 sm:pt-10' : ''}>
          <span className="inline-flex rounded-full bg-[#ec6435] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Séminaire réalisé
          </span>
          <h1 className="mt-4 max-w-4xl text-balance font-sans text-[clamp(2.1rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.075em] text-[#0c1d22]">
            {item.titre}
          </h1>
          {facts.length > 0 && (
            <p className="mt-4 font-sans text-sm font-medium tracking-[-0.03em] text-[#0c1d22]/70 sm:text-base">
              {facts.join(' · ')}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14">
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

        {item.lieux.length > 0 && (
          <section>
            <h2 className={titleClass}>
              Les <span className="font-bold">lieux</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {item.lieux.map((lieu) => (
                <li key={`${lieu.nom}-${lieu.photo}`} className="overflow-hidden bg-[#f4f4f4]" style={{ borderRadius: HOME_RADIUS }}>
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
          <section className="px-6 py-8 sm:px-10 sm:py-12" style={{ background: '#f4f4f4', borderRadius: HOME_RADIUS }}>
            <h2 className={titleClass}>
              Le <span className="font-bold">programme</span>
            </h2>
            <div className="mt-8">
              <RealiseProgramme jours={item.programme} />
            </div>
          </section>
        )}

        {item.avis.length > 0 && (
          <section>
            <h2 className={titleClass}>
              Les <span className="font-bold">avis</span>
            </h2>
            <ul className="mt-8 space-y-8">
              {item.avis.map((avis) => (
                <li key={`${avis.auteur}-${avis.texte.slice(0, 24)}`}>
                  <blockquote>
                    <p className="font-sans text-[26px] font-normal leading-[1.25] tracking-[-0.05em] text-[#0c1d22] sm:text-[32px]">
                      « {avis.texte} »
                    </p>
                    {(avis.auteur || avis.entreprise) && (
                      <footer className="mt-4 font-sans text-sm font-semibold tracking-[-0.03em] text-[#ec6435]">
                        {[avis.auteur, avis.entreprise].filter(Boolean).join(' · ')}
                      </footer>
                    )}
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section
          className="flex flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10"
          style={{ background: '#0c1d22', borderRadius: HOME_RADIUS }}
        >
          <h2 className="max-w-md font-sans text-[28px] font-normal leading-[1.1] tracking-[-0.075em] text-white sm:text-[34px]">
            Imaginer <span className="font-bold">le vôtre.</span>
          </h2>
          <Link
            href="/demande-seminaire"
            className="inline-flex rounded-full bg-[#ec6435] px-6 py-3 text-sm font-semibold text-white"
          >
            Partager un brief
          </Link>
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
