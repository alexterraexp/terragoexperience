-- Séminaires déjà vécus, édités depuis l'espace fondateurs.
CREATE TABLE IF NOT EXISTS public.seminaires_realises (
  id                TEXT         PRIMARY KEY,
  titre             TEXT         NOT NULL DEFAULT '',
  nombre_personnes  INTEGER      CHECK (nombre_personnes IS NULL OR (nombre_personnes > 0 AND nombre_personnes <= 5000)),
  lieu              TEXT         NOT NULL DEFAULT '',
  duree             TEXT         NOT NULL DEFAULT '',
  brief             TEXT         NOT NULL DEFAULT '',
  couverture        TEXT         NOT NULL DEFAULT '',
  images            JSONB        NOT NULL DEFAULT '[]'::jsonb,
  lieux             JSONB        NOT NULL DEFAULT '[]'::jsonb,
  programme         JSONB        NOT NULL DEFAULT '[]'::jsonb,
  avis              JSONB        NOT NULL DEFAULT '[]'::jsonb,
  publie            BOOLEAN      NOT NULL DEFAULT false,
  ordre             INTEGER      NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS seminaires_realises_publie_ordre_idx
  ON public.seminaires_realises (publie, ordre, titre);

ALTER TABLE public.seminaires_realises ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.seminaires_realises TO anon, authenticated;
GRANT ALL ON public.seminaires_realises TO service_role;

DROP POLICY IF EXISTS seminaires_realises_public_read ON public.seminaires_realises;
CREATE POLICY seminaires_realises_public_read
  ON public.seminaires_realises
  FOR SELECT
  TO anon, authenticated
  USING (publie = true);
