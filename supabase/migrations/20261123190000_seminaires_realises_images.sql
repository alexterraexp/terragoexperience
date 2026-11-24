-- Plusieurs photos par séminaire réalisé. La première reste dans couverture.
ALTER TABLE public.seminaires_realises
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.seminaires_realises
SET images = jsonb_build_array(couverture)
WHERE couverture <> ''
  AND (images IS NULL OR images = '[]'::jsonb);
