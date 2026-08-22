-- URL publique des fiches : /exemples-seminaire-entreprise/{slug}
ALTER TABLE public.seminaires
  ADD COLUMN IF NOT EXISTS slug text;

COMMENT ON COLUMN public.seminaires.slug IS
  'Segment URL SEO (ex. seminaire-piments-pays-basque). Éditable dans Supabase. Si vide, fallback auto depuis producteur.';

-- Index pour les lookups par slug (non unique : géré côté app tant qu''il n''y a pas de contrainte métier)
CREATE INDEX IF NOT EXISTS seminaires_slug_idx ON public.seminaires (slug)
  WHERE slug IS NOT NULL;
