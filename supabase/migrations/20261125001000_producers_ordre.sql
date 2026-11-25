-- Ordre d’affichage des producteurs. 0 = après les numéros, par nom.
alter table public.producers
  add column if not exists ordre integer not null default 0;
