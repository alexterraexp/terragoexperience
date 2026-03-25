-- Budget indicatif — formulaire « Organiser un séminaire »
ALTER TABLE public.demandes_organiser_seminaire
  ADD COLUMN IF NOT EXISTS budget text;
