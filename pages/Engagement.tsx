import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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

const VALEURS = [
  {
    icon: 'diversity_3',
    title: "L'humain",
    badge: 'NOS PRODUCTEURS',
    color: '#f78d00',
    image: 'https://images.unsplash.com/photo-1624720114692-037e42acec41?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0',
    text: "Remettre l'humain au centre, valoriser les visages derrière chaque produit, cultiver la rencontre et le partage, pour soutenir des familles, pour faire vivre nos villages, et pour donner du sens à ce que vous vivez.",
  },
  {
    icon: 'workspace_premium',
    title: 'Le savoir-faire',
    badge: 'FRANÇAIS',
    color: '#1e291a',
    image: 'https://images.unsplash.com/photo-1594928357228-3075ba0e4674?q=80&w=1293&auto=format&fit=crop&ixlib=rb-4.1.0',
    text: "Transmettre des gestes ancestraux, préserver des techniques rares, honorer ceux qui consacrent leur vie à l'excellence d'un produit. Le savoir-faire français est un patrimoine vivant — nous le célébrons.",
  },
  {
    icon: 'nature',
    title: 'La nature',
    badge: 'ET VOTRE SANTÉ',
    color: '#5a7a2e',
    image: 'https://images.unsplash.com/photo-1720420865912-2bbd6bfa1e85?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0',
    text: "Reconnecter chacun au vivant, aux saisons, aux sols. Comprendre d'où vient ce qu'on mange, respirer autrement, poser les mains sur la terre. La nature n'est pas un décor — c'est notre fondation.",
  },
];

const TEMOIGNAGES = [
  {
    text: "Je suis venu pour un séminaire, je suis reparti avec de la boue sur mes baskets neuves et un immense respect pour ceux qui nous nourrissent. Mes chaussures boudent, mais mon cœur est ravi. Terrago, c’est du vrai.",
    author: "********",
    role: "Consultant informatique",
    initial: "S",
  },
  {
    text: "Je pensais faire une petite balade, je me suis retrouvé au cœur du réacteur agricole. On sent que l'équipe Terrago y met tout son cœur (et beaucoup d'énergie). C'est sincère, c'est brut, c'est génial.",
    author: "********",
    role: "Développeur informatique",
    initial: "T",
  },
  {
    text: "Enfin une activité où on ne construit pas des tours en spaghettis. On a soutenu un producteur passionné et soudé l'équipe autour d'un vrai projet. Plus efficace qu'une thérapie de groupe.",
    author: "********",
    role: "Manager Team-Building",
    initial: "M",
  },
];

const EQUIPE = [
  {
    name: 'Jérôme Peyron',
    role: 'Co-fondateur',
    bio: "Ingénieur des Mines passé par les stratégies de décarbonation, Jérôme a fini par choisir le terrain, le vrai. Aujourd'hui, il met sa rigueur au service du vivant pour que chaque immersion soutienne concrètement nos producteurs. Son moteur ? Réconcilier le monde d'où il vient avec la terre qui nous nourrit.",
    initials: 'JP',
    color: '#1e291a',
  },
  {
    name: "Alex Soulard",
    role: 'Co-fondateur',
    bio: "Prof le jour et mordu d'événementiel sportif le reste du temps, Alex vit pour l'aventure et les rencontres. Amoureux des bons produits et des grands espaces, il adore par-dessus tout partager un bout de terroir avec ceux qu'il croise. Avec Terrago, il crée ces liens simples et authentiques qui font du bien à tout le monde.",
    initials: 'AS',
    color: '#f78d00',
  },
];

const Engagement: React.FC = () => {
  const [activeValeur, setActiveValeur] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#equipe') {
      const el = document.getElementById('equipe');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  return (
    <div className="font-sans bg-beige-bg min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full">
        <div className="relative min-h-[88vh] sm:min-h-[82vh] lg:min-h-[78vh] w-full overflow-hidden flex items-center justify-center group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[14s] group-hover:scale-[1.03]"
            style={{ backgroundImage: "url('https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/paysagebanc.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 lg:mt-32 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
              <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 10, letterSpacing: '0.28em', fontWeight: 700, textTransform: 'uppercase' }}>
                mission et engagement
              </span>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.40)' }} />
            </div>
            <h1 className="text-white font-semibold leading-[1.06] mb-6 drop-shadow-lg">
              <span className="font-sans text-4xl md:text-4xl lg:text-5xl">Des expériences qui </span>
              <span className="font-display italic text-5xl md:text-5xl lg:text-6xl">soutiennent nos terroirs.</span>
            </h1>
            <p className="text-white/80 text-ml max-w-4xl mx-auto mb-10 leading-relaxed italic">
              Nous créons des immersions mains dans la terre pour reconnecter chacun au vivant, tout en permettant un soutien financier direct et juste à nos producteurs partenaires, tous engagés pour produire bien et bon.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/partenaires"
                className="text-white border border-white/100 hover:border-white/70 px-6 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:bg-white/10 rounded-full"
              >
                Nos producteurs partenaires
              </Link>
              <Link
                to="/entreprises"
                className="text-white/90 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300"
              >
                Nos séminaires d'entreprise →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimate>
              <span className="inline-block px-3 py-1 bg-[#f78d00] text-white font-bold tracking-[0.3em] uppercase text-[9px] rounded-full mb-6">Notre mission</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#1e291a] leading-tight mb-6">
                <span className="font-sans not-italic text-3xl sm:text-5xl">Reconnecter </span>
                <span className="font-display italic text-4xl sm:text-6xl">l'humain à la terre.</span>
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
                <span className="font-sans not-italic text-3xl sm:text-4xl">Chez Terrago, nous avons une </span>
                <span className="font-display italic text-5xl sm:text-5xl">boussole.</span>
              </h2>
              <p className="text-gray-500 text-base mt-4 max-w-xl mx-auto">Pas pour trouver le nord, mais pour garder le cap sur ce qui compte vraiment.</p>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALEURS.map((v, i) => (
              <ScrollAnimate key={v.title} delay={i * 150}>
                <div
                  className="group relative rounded-3xl border border-black/8 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  onClick={() => setActiveValeur(activeValeur === i ? null : i)}
                >
                  <div className="absolute inset-0">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                      style={{ background: activeValeur === i ? v.color : 'rgba(255,255,255,0.15)', color: activeValeur === i ? '#fff' : '#fff' }}
                    >
                      <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-md">{v.title}</h3>
                      <span
                        className="flex-shrink-0 px-3 py-1 text-white text-[8px] font-bold tracking-[0.15em] uppercase rounded-full"
                        style={{ background: v.color }}
                      >
                        {v.badge}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/0 group-hover:text-white/90 transition-colors duration-300 max-w-xs">
                      {v.text}
                    </p>
                    <div
                      className="mt-4 h-px w-16 rounded-full opacity-70"
                      style={{ background: 'rgba(255,255,255,0.7)' }}
                    />
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ───────────────────────────────────────────────────────────── */}
      <section id="equipe" className="py-20 sm:py-28 px-6 bg-[#faf8f5]">
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
                <p className="text-white/70 text-sm mb-10 max-w-xl mx-auto">
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