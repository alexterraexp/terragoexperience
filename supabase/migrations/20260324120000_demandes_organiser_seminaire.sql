-- Formulaire « Organiser un séminaire » (/api/reservation)
-- Supabase → SQL Editor → Run
--
-- Si la table existe déjà et que seule la colonne message manque, cette ligne suffit :
--   ALTER TABLE public.demandes_organiser_seminaire ADD COLUMN IF NOT EXISTS message text;

CREATE TABLE IF NOT EXISTS public.demandes_organiser_seminaire (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nom text NOT NULL,
  email text NOT NULL,
  entreprise text,
  participants text,
  periode text,
  ville_depart text,
  trajet_max text,
  hebergement text,
  transport text,
  activites text,
  message text,
  reference text
);

ALTER TABLE public.demandes_organiser_seminaire
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS reference text;
