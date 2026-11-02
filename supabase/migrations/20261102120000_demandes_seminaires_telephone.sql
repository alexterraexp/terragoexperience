-- Téléphone du devis lié à une offre, distinct de la précision libre (colonne message).
ALTER TABLE public.demandes_seminaires
  ADD COLUMN IF NOT EXISTS telephone text;

COMMENT ON COLUMN public.demandes_seminaires.telephone IS 'Téléphone indiqué dans le formulaire de devis lié à une offre.';
COMMENT ON COLUMN public.demandes_seminaires.message IS 'Précision libre saisie avant le volet contact.';

COMMENT ON COLUMN public.demandes_organiser_seminaire.message IS 'Précision libre saisie avant le volet contact du formulaire Organiser mon séminaire.';
