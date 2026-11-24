import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HOME_RADIUS } from '@/components/home/homeStyles';
import { PAGE_OG, pageMeta } from '@/lib/pageMeta';
import { realiseFacts, realisePath, REALISES_PATH } from '@/lib/seminairesRealises';
import { listPublishedRealises } from '@/lib/studioRealises';
import { supabaseServer } from '@/lib/supabase';

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: 'Séminaires réalisés – TerraGo',
  description:
    'Retours d’expérience de séminaires déjà vécus avec TerraGo : le brief, les lieux, le programme et les avis des équipes.',
  path: REALISES_PATH,
  images: [PAGE_OG.seminaires],
});

export default async function SeminairesRealisesPage() {
  const realises = await listPublishedRealises(supabaseServer).catch(() => []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <section className="relative flex h-[68vh] min-h-[480px] w-full items-end justify-center overflow-hidden sm:h-[72vh]">
        <Image
          src={PAGE_OG.seminaires.url}
          alt={PAGE_OG.seminaires.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.16) 55%, rgba(0,0,0,0.42) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 pb-14 text-center sm:px-6 sm:pb-20">
          <h1 className="font-sans text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.075em] text-white">
            Séminaires <span className="font-bold">réalisés.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-[14px] font-normal leading-relaxed tracking-[-0.03em] text-white/80">
            Retours d’expérience sur le terrain : le brief, les lieux, le programme, les avis.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-6 sm:py-20">
        {realises.length === 0 ? (
          <div className="px-6 py-10 sm:px-10" style={{ background: '#f4f4f4', borderRadius: HOME_RADIUS }}>
            <h2 className="font-sans text-[32px] font-normal leading-[1.08] tracking-[-0.075em] text-[#0c1d22] sm:text-[40px]">
              Les premiers récits <span className="font-bold">arrivent.</span>
            </h2>
            <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed tracking-[-0.04em] text-[#0c1d22]/65">
              Chaque séminaire vécu avec une équipe sera raconté ici, du brief jusqu’aux avis.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {realises.map((item) => {
              const facts = realiseFacts(item);
              return (
                <li key={item.id}>
                  <Link href={realisePath(item.id)} className="block h-full overflow-hidden bg-[#f4f4f4]" style={{ borderRadius: HOME_RADIUS }}>
                    <span className="block aspect-[4/3] bg-[#0c1d22]">
                      {item.couverture && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.couverture} alt="" className="h-full w-full object-cover" />
                      )}
                    </span>
                    <span className="block px-5 py-5">
                      {item.lieu && (
                        <span className="block truncate text-[11px] font-bold uppercase tracking-[0.14em] text-[#ec6435]">
                          {item.lieu}
                        </span>
                      )}
                      <span className="mt-2 block font-sans text-xl font-semibold leading-tight tracking-[-0.04em] text-[#0c1d22]">
                        {item.titre}
                      </span>
                      {facts.length > 0 && (
                        <span className="mt-2 block text-sm tracking-[-0.03em] text-[#0c1d22]/55">
                          {facts.join(' · ')}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
