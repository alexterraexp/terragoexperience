-- Nouveau formulaire « Organiser un séminaire » (/api/reservation)
-- Supabase → SQL Editor → Run
--
-- Les colonnes ville_depart, trajet_max, hebergement, transport, activites et entreprise
-- ne sont plus alimentées : elles restent en place pour l'historique des demandes.

ALTER TABLE public.demandes_organiser_seminaire
  ADD COLUMN IF NOT EXISTS telephone text,
  ADD COLUMN IF NOT EXISTS type_evenement text,
  ADD COLUMN IF NOT EXISTS lieu_souhaite text,
  ADD COLUMN IF NOT EXISTS budget_par_personne text;
