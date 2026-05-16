-- Renommer les types de format séminaire et retirer « sur mesure »
UPDATE seminaire_formats SET type = 'journee' WHERE type = '1jour';
UPDATE seminaire_formats SET type = 'residentiel' WHERE type = '2jours';

DELETE FROM seminaire_programme
WHERE format_id IN (SELECT id FROM seminaire_formats WHERE type = 'mesure');

DELETE FROM seminaire_formats WHERE type = 'mesure';
