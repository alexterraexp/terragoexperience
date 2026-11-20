-- Champs saisis dans l’espace fondateurs (/studio).
-- pills : pastilles et filtres du catalogue.
-- activites : activités possibles sur place.
-- publie : false = brouillon, absent du catalogue public.

ALTER TABLE public.seminaires
  ADD COLUMN IF NOT EXISTS pills text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS activites text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS publie boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.seminaires.pills IS
  'Pilules catalogue (regen, rse, cohesion, inspiration, codir, au-vert, original).';

COMMENT ON COLUMN public.seminaires.activites IS
  'Activités possibles sur place, saisies dans l’espace fondateurs.';

COMMENT ON COLUMN public.seminaires.publie IS
  'false = brouillon, invisible du catalogue public. Le statut « bientôt » reste coming_soon.';
