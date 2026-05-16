-- Site web partenaire — carte « En partenariat avec » (détail séminaire)
ALTER TABLE public.seminaires
  ADD COLUMN IF NOT EXISTS partenaire_site_web text;

COMMENT ON COLUMN public.seminaires.partenaire_site_web IS 'URL du site du partenaire (lien « En savoir plus »).';

-- Exemple : REVOLIVA (ajuster ou supprimer si l’URL diffère)
UPDATE public.seminaires
SET partenaire_site_web = 'https://revoliva.com'
WHERE partenaire_nom = 'REVOLIVA'
  AND (partenaire_site_web IS NULL OR partenaire_site_web = '');
