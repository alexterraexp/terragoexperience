-- Image hero du dashboard événement (une URL par séminaire).
-- Supabase → SQL Editor → Run

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS image text;

COMMENT ON COLUMN public.events.image IS
  'URL publique de la photo hero du dashboard participant.';

UPDATE public.events
SET image = 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/HOME/seminaire/nouvelleaquitaine/hotel-indarra-arbonne-1.webp'
WHERE lower(code) = 'avb.2026';
