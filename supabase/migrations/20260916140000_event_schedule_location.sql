-- Emplacement optionnel d’un créneau du planning (lien Maps).
-- Supabase → SQL Editor → Run

ALTER TABLE public.event_schedule
  ADD COLUMN IF NOT EXISTS location_name text,
  ADD COLUMN IF NOT EXISTS location_address text,
  ADD COLUMN IF NOT EXISTS location_maps_url text;

COMMENT ON COLUMN public.event_schedule.location_name IS
  'Nom du lieu affiché sur le créneau (ex. point de rendez-vous navette).';
COMMENT ON COLUMN public.event_schedule.location_address IS
  'Adresse du lieu, utilisée pour l’itinéraire.';
COMMENT ON COLUMN public.event_schedule.location_maps_url IS
  'URL Maps (coords de préférence) pour ouvrir Plans / Google Maps / Waze.';

UPDATE public.event_schedule AS s
SET
  location_name = 'Cité De L''océan',
  location_address = '1 Av. de la Plage, 64200 Biarritz',
  location_maps_url = 'https://www.google.com/maps/search/?api=1&query=43.46253919038132,-1.572977843148794'
FROM public.events AS e
WHERE s.event_id = e.id
  AND lower(regexp_replace(e.code, '[^a-zA-Z0-9]', '', 'g')) = 'avb2026'
  AND (
    s.title ilike '%Navette 1%Retour%'
    OR s.title ilike '%Navette 2%Retour%'
  );
