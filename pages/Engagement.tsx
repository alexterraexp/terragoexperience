import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── ScrollAnimate simple (inline pour autonomie du fichier) ──────────────────
const ScrollAnimate: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '8+', label: 'Producteurs partenaires', icon: 'groups' },
  { value: '4', label: 'Régions de France', icon: 'map' },
  { value: '100%', label: 'français & engagés', icon: 'eco' },
  { value: '5/5', label: 'Satisfaction client', icon: 'star' },
];

const VALEURS = [
  {
    icon: 'diversity_3',
    title: "L'humain",
    badge: 'NOS PRODUCTEURS',
    color: '#f78d00',
    text: "Remettre l'humain au centre, valoriser les visages derrière chaque produit, cultiver la rencontre et le partage, pour soutenir des familles, pour faire vivre nos villages, et pour donner du sens à ce que vous vivez.",
  },
  {
    icon: 'workspace_premium',
    title: 'Le savoir-faire',
    badge: 'FRANÇAIS',
    color: '#1e291a',
    text: "Transmettre des gestes ancestraux, préserver des techniques rares, honorer ceux qui consacrent leur vie à l'excellence d'un produit. Le savoir-faire français est un patrimoine vivant — nous le célébrons.",
  },
  {
    icon: 'nature',
    title: 'La nature',
    badge: 'ET VOTRE SANTÉ',
    color: '#5a7a2e',
    text: "Reconnecter chacun au vivant, aux saisons, aux sols. Comprendre d'où vient ce qu'on mange, respirer autrement, poser les mains sur la terre. La nature n'est pas un décor — c'est notre fondation.",
  },
];

const TEMOIGNAGES = [
  {
    text: "Une journée inoubliable dans les vignes du Mont Ventoux. L'équipe Terrago a tout orchestré avec une attention aux détails remarquable. Nos collaborateurs en parlent encore.",
    author: "Sophie M.",
    role: "DRH — Cabinet conseil, Paris",
    initial: "S",
  },
  {
    text: "Nous cherchions quelque chose d'authentique, loin des séminaires classiques. Terrago nous a offert exactement ça : du sens, de l'humain, et une immersion totale dans le terroir charentais.",
    author: "Thomas R.",
    role: "CEO — Startup tech, Lyon",
    initial: "T",
  },
  {
    text: "La cueillette des truffes avec le chien, le déjeuner préparé avec ce qu'on venait de récolter… c'est ça, Terrago. Une expérience qui touche au cœur.",
    author: "Marie-Claire B.",
    role: "Directrice marketing — Groupe industriel",
    initial: "M",
  },
];

const EQUIPE = [
  {
    name: 'Jérôme Peyron',
    role: 'Co-fondateur',
    bio: "Passionné de terroir et d'aventure humaine, Alex parcourt la France pour dénicher les producteurs qui font vibrer nos expériences.",
    initials: 'A',
    color: '#1e291a',
  },
  {
    name: "Alex Soulard",
    role: 'Co-fondateur',
    bio: "Pssionné de terroir et d'aventure humaine, Alex parcourt la France pour dénicher les producteurs qui font vibrer nos expériences.",
    initials: 'T',
    color: '#f78d00',
  },
];

// ── Composant principal ───────────────────────────────────────────────────────
const Engagement: React.FC = () => {
  const [activeValeur, setActiveValeur] = useState<number | null>(null);

  return (
    <div className="font-sans bg-beige-bg min-h-screen">

      {/* ── SEO Meta (à intégrer dans votre <Helmet> ou head) ───────────────── */}
      {/* 
        <title>Notre Engagement | Terrago — Expériences authentiques au cœur du terroir</title>
        <meta name="description" content="Terrago s'engage à mettre en lumière les producteurs français passionnés et à reconnecter entreprises et particuliers à la nature à travers des expériences immersives et authentiques." />
        <meta name="keywords" content="engagement terrago, séminaire nature, producteurs français, terroir, expérience authentique, cohésion équipe" />
      */}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-0 pb-36 lg:pb-0">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/paysageterroir.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e291a]/70 via-[#1e291a]/50 to-[#1e291a]/80" />

        {/* Motif pointillé */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 text-center max-w-none w-full mx-auto px-2 pt-24">
          <div style={{ opacity: 1, transform: 'translateY(0)', transition: 'all 0.8s ease' }}>
            <span className="inline-block px-4 py-1.5 bg-[#f78d00] text-white font-bold font-sans tracking-[0.3em] uppercase text-[9px] mb-6 rounded-full shadow-lg">
              Notre engagement
            </span>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-6xl mx-auto px-2 sm:px-4 lg:px-0">
              <span className="font-sans not-italic block sm:inline">Des expériences qui </span>
              <span className="font-display italic text-4xl sm:text-5xl lg:text-6xl sm:inline">
                soutiennent nos terroirs.
              </span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-4xl mx-auto px-3 sm:px-4 lg:px-0 leading-relaxed mb-10">
            Nous créons des immersions mains dans la terre pour reconnecter chacun au vivant, tout en garantissant un soutien financier direct et juste aux producteurs qui s'engagent pour la terre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partenaires" className="inline-block bg-white text-[#1e291a] px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#f78d00] hover:text-white transition-all duration-300 shadow-xl">
                Nos producteurs →
              </Link>
              <Link to="/entreprises" className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-300">
                Nos séminaires
              </Link>
            </div>
          </div>
        </div>

        {/* Flèche bas */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-black/5">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((s, i) => (
        <ScrollAnimate key={s.label} delay={i * 100}>
          <div className="group relative bg-[#faf8f5] rounded-2xl p-8 border border-black/5 hover:border-[#f78d00]/30 hover:shadow-lg transition-all duration-300 text-center overflow-hidden">
            
            {/* Icône */}
            <div className="w-12 h-12 rounded-xl bg-[#1e291a]/5 text-[#1e291a] group-hover:bg-[#f78d00] group-hover:text-white flex items-center justify-center mx-auto mb-5 transition-all duration-300">
              <span className="material-symbols-outlined text-xl">{s.icon}</span>
            </div>

            {/* Valeur */}
            <div className="font-display italic text-4xl sm:text-5xl font-bold text-[#1e291a] mb-2 leading-none">{s.value}</div>

            {/* Label */}
            <div className="text-[10px] font-sans font-semibold text-gray-400 uppercase tracking-[0.12em] leading-tight">{s.label}</div>

            {/* Barre orange bas */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f78d00] group-hover:w-full transition-all duration-500" />
          </div>
        </ScrollAnimate>
      ))}
    </div>
  </div>
</section>

      {/* ── MISSION ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimate>
              <span className="inline-block px-3 py-1 bg-[#f78d00] text-white font-bold tracking-[0.3em] uppercase text-[9px] rounded-full mb-6">Notre mission</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1e291a] leading-tight mb-6">
                <span className="font-sans not-italic text-4xl sm:text-5xl">Reconnecter </span>
                <span className="font-display italic text-5xl sm:text-6xl">l'humain à la terre.</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Dans un monde qui s'accélère, Terrago ouvre des parenthèses. Des moments où l'on pose les mains sur la terre, où l'on écoute les producteurs parler de leurs sols, où l'on comprend que derrière chaque produit, il y a une vie, un engagement, une passion.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Notre mission : créer des ponts durables entre ceux qui produisent et ceux qui consomment, à travers des expériences immersives qui laissent une trace.
              </p>
              <Link to="/entreprises" className="inline-block bg-[#1e291a] text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#f78d00] transition-all duration-300">
                Découvrir nos séminaires d'entreprise →
              </Link>
            </ScrollAnimate>

            <ScrollAnimate delay={200}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                  <img
                    src="https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/pommes.png"
                    alt="Producteur dans ses champs"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f78d00]/10 text-[#f78d00] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">favorite</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Producteurs sélectionnés</div>
                      <div className="text-sm font-bold text-[#1e291a]">Pour leur authenticité</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── BOUSSOLE / VALEURS ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
        <ScrollAnimate>
  <div className="text-center mb-16">
    <span className="inline-block px-3 py-1 bg-[#f78d00] text-white font-bold tracking-[0.3em] uppercase text-[9px] rounded-full mb-6">Notre engagement</span>
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e291a] leading-tight">
      <span className="font-sans not-italic text-4xl sm:text-5xl">Chez Terrago, nous avons une </span>
      <span className="font-display italic text-5xl sm:text-6xl">boussole.</span>
    </h2>
    <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto">Pas pour trouver le nord, mais pour garder le cap sur ce qui compte vraiment.</p>
  </div>
</ScrollAnimate>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {VALEURS.map((v, i) => (
    <ScrollAnimate key={v.title} delay={i * 150}>
      <div
        className="group relative rounded-3xl border border-black/8 bg-[#faf8f5] p-8 cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
        onClick={() => setActiveValeur(activeValeur === i ? null : i)}
      >
        {/* Icône */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
          style={{ background: activeValeur === i ? v.color : `${v.color}15`, color: activeValeur === i ? '#fff' : v.color }}
        >
          <span className="material-symbols-outlined text-2xl">{v.icon}</span>
        </div>

        {/* Titre + badge sur la même ligne */}
        <div className="flex items-center gap-3 flex-wrap mb-4">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e291a]">{v.title}</h3>
        <span className="flex-shrink-0 px-3 py-1 text-white text-[8px] font-bold tracking-[0.15em] uppercase rounded-full" style={{ background: v.color }}>
        {v.badge}
        </span>
        </div>

        {/* Texte — toujours visible */}
        <p className="text-gray-600 text-sm leading-relaxed">{v.text}</p>

        {/* Barre couleur bas */}
        <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: v.color }} />
      </div>
    </ScrollAnimate>
  ))}
</div>
</div>
      </section>

      {/* ── ÉQUIPE ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-[#f78d00] text-white font-bold tracking-[0.3em] uppercase text-[9px] rounded-full mb-6">L'équipe</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1e291a] leading-tight">
                <span className="font-sans not-italic text-4xl sm:text-5xl">Des humains </span>
                <span className="font-display italic text-5xl sm:text-6xl">passionnés.</span>
              </h2>
              <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto">Terrago c'est avant tout une équipe qui croit profondément que les meilleures expériences naissent de vraies rencontres.</p>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {EQUIPE.map((m, i) => (
              <ScrollAnimate key={m.name} delay={i * 150} className="h-full">
                <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                  {/* Avatar initiales */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg"
                    style={{ background: m.color }}
                  >
                    {m.initials}
                  </div>
                  <h3 className="text-lg font-bold text-[#1e291a] mb-1 font-sans not-italic">{m.name}</h3>
                  <p className="text-[10px] font-bold text-[#f78d00] uppercase tracking-wider mb-4">{m.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.bio}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-[#f78d00] text-white font-bold tracking-[0.3em] uppercase text-[9px] rounded-full mb-6">Témoignages</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1e291a] leading-tight">
                <span className="font-sans not-italic text-3xl sm:text-4xl">Ils ont vécu </span>
                <span className="font-display italic text-4xl sm:text-5xl">l'expérience.</span>
              </h2>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMOIGNAGES.map((t, i) => (
              <ScrollAnimate key={i} delay={i * 100}>
                <div className="bg-[#faf8f5] rounded-3xl p-8 border border-black/5 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  {/* Étoiles */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-[#f78d00] text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3 mt-auto pt-5 border-t border-black/5">
                    <div className="w-10 h-10 rounded-full bg-[#1e291a] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1e291a]">{t.author}</div>
                      <div className="text-[10px] text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIENS VERS AUTRES PAGES ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <ScrollAnimate>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1e291a]">
                <span className="font-sans not-italic text-3xl sm:text-4xl">Envie d'aller </span>
                <span className="font-display italic text-4xl sm:text-5xl">plus loin ?</span>
              </h2>
            </div>
          </ScrollAnimate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card séminaires */}
            <ScrollAnimate delay={100}>
              <Link to="/entreprises" className="group relative rounded-3xl overflow-hidden block h-56">
                <img
                  src="https://images.unsplash.com/photo-1680617550341-3fa60e61f572?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Séminaires entreprise"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e291a]/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[9px] font-bold text-[#f78d00] uppercase tracking-wider mb-1">Pour les entreprises</div>
                  <h3 className="text-white text-xl font-bold">Séminaires d'entreprise →</h3>
                </div>
              </Link>
            </ScrollAnimate>
            {/* Card producteurs */}
            <ScrollAnimate delay={200}>
              <Link to="/partenaires" className="group relative rounded-3xl overflow-hidden block h-56">
                <img
                  src="https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/cognacjf/vigneron.png"
                  alt="Producteurs partenaires"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e291a]/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[9px] font-bold text-[#f9c06a] uppercase tracking-wider mb-1">Nos partenaires</div>
                  <h3 className="text-white text-xl font-bold">Producteurs partenaires →</h3>
                </div>
              </Link>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* ── BANDEAU FINAL ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollAnimate>
            <div
              className="relative rounded-3xl overflow-hidden text-center py-20 px-8"
              style={{ background: 'linear-gradient(135deg, #1e291a 0%, #2d4a2d 100%)' }}
            >
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10">
                <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4">
                  <span className="font-sans not-italic text-3xl sm:text-4xl">Se reconnecter à </span>
                  <span className="font-display italic text-4xl sm:text-5xl">l'essentiel.</span>
                </h2>
                <p className="text-white/70 text-base mb-10 max-w-xl mx-auto">
                Parce que la reconnexion commence par une rencontre. Que vous soyez pro ou passionné, écrivons la suite ensemble.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:terragoexperiences@gmail.com"
                    className="bg-[#f78d00] text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all"
                  >
                    Discutons ensemble
                  </a>
                  <Link
                    to="/nous-rejoindre"
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all"
                  >
                    Devenir producteur partenaire
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

    </div>
  );
};

export default Engagement;
