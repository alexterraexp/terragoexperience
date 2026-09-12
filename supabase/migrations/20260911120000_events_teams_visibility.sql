-- Visibilité de la section Équipes du dashboard participant.
-- Optionnel : le dashboard calcule déjà samedi 11h / dimanche 9h à partir de start_date.
-- Supabase → SQL Editor → Run seulement pour forcer un affichage immédiat ou changer l’heure.
--
-- Afficher les deux jours tout de suite :
--   UPDATE public.events SET teams_is_public = true WHERE lower(code) = 'avb2026';
-- Afficher seulement le samedi maintenant :
--   UPDATE public.events
--   SET teams_samedi_reveal_at = now()
--   WHERE lower(code) = 'avb2026';

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS teams_is_public boolean NOT NULL DEFAULT false;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS teams_reveal_at timestamptz;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS teams_samedi_reveal_at timestamptz;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS teams_dimanche_reveal_at timestamptz;

COMMENT ON COLUMN public.events.teams_is_public IS
  'Si true, les deux journées d’équipes sont visibles tout de suite.';

COMMENT ON COLUMN public.events.teams_samedi_reveal_at IS
  'Date/heure de dévoilement des équipes du samedi. Sinon : samedi 11h (heure de Paris).';

COMMENT ON COLUMN public.events.teams_dimanche_reveal_at IS
  'Date/heure de dévoilement des équipes du dimanche. Sinon : dimanche 9h (heure de Paris).';
