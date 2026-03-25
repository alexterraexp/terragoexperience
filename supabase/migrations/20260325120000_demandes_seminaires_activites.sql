-- Colonne dédiée aux activités (pack séminaire), distincte du message libre du client.
ALTER TABLE demandes_seminaires
ADD COLUMN IF NOT EXISTS activites text;

COMMENT ON COLUMN demandes_seminaires.activites IS 'Activités sélectionnées pour le devis (texte agrégé, ex. pack + options).';

-- Optionnel : si d’anciennes lignes ont encore « Activités : … » concaténé dans message,
-- vous pouvez tenter une extraction (à valider au cas par cas sur vos données) :
--
-- UPDATE demandes_seminaires
-- SET
--   activites = NULLIF(
--     trim(substring(message from '(?s)Activités\s*:\s*(.+)$')),
--     ''
--   ),
--   message = NULLIF(
--     trim(regexp_replace(message, '(?s)\s*\n*\s*Activités\s*:\s*.+$', '')),
--     ''
--   )
-- WHERE message IS NOT NULL
--   AND message ~* 'Activités\s*:';
