-- Galerie propre au producteur, distincte des photos du séminaire.
alter table public.producers
  add column if not exists images jsonb not null default '[]'::jsonb;
