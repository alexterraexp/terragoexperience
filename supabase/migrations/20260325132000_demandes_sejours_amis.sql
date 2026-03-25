-- Formulaire « Séjours entre amis » (séjours-entre-amis) :
-- Supabase → insert + Resend (voir lib/sejours-entre-amis.ts)
--
-- On drop/recrée volontairement pour repartir sur le schéma mis à jour.

DROP TABLE IF EXISTS public.demandes_sejours_amis;

CREATE TABLE public.demandes_sejours_amis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),

  nom text NOT NULL,
  prenom text NOT NULL,
  email text NOT NULL,

  portable text,
  periode text,

  type_sejour text NOT NULL,
  participants text NOT NULL,

  ville_depart text,
  trajet_max text,

  precisions text,

  reference text NOT NULL UNIQUE
);

