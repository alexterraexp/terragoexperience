-- Migration : création de la table blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id            UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          TEXT         UNIQUE NOT NULL,
  title         TEXT         NOT NULL,
  description   TEXT,
  content       TEXT,
  category      TEXT,
  cover_url     TEXT,
  reading_time  TEXT,
  published     BOOLEAN      DEFAULT false,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ  DEFAULT now(),
  updated_at    TIMESTAMPTZ  DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx   ON blog_posts (published);

-- Article à la une (publié)
INSERT INTO blog_posts (slug, title, description, category, cover_url, reading_time, published, published_at)
VALUES (
  'seminaire-au-vert-guide-2025',
  'Comment organiser un séminaire au vert : le guide complet 2025',
  'Tout ce qu''il faut savoir pour organiser un séminaire au vert réussi : lieu, format, budget, activités.',
  'Séminaires',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop',
  '7 min',
  true,
  now()
)
ON CONFLICT (slug) DO NOTHING;

-- Articles "bientôt disponible"
INSERT INTO blog_posts (slug, title, category, cover_url, published) VALUES
(
  'team-building-terroir',
  'Team building terroir : 8 idées originales pour souder vos équipes',
  'Team building',
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800&auto=format&fit=crop',
  false
),
(
  'seminaire-engage-2025',
  'Séminaire engagé : pourquoi et comment en organiser un en 2025',
  'Séminaires',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
  false
),
(
  'week-end-vigneron-ventoux',
  'Week-end chez un vigneron : notre guide pour une immersion Ventoux',
  'Terroir & producteurs',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
  false
)
ON CONFLICT (slug) DO NOTHING;
