import { createClient } from '@supabase/supabase-js';

const rawUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  process.env.VITE_SUPABASE_URL?.trim() ||
  '';
const rawKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  '';

/** True when les deux variables sont définies (sinon le client utilise des valeurs factices pour éviter un crash au import / SSR). */
export const isSupabaseConfigured = Boolean(rawUrl && rawKey);

/** Valeurs factices : clé anon « démo » locale Supabase (publique), uniquement pour satisfaire createClient si .env manque. */
const PLACEHOLDER_URL = 'http://127.0.0.1:54321';
const PLACEHOLDER_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTk1NzM0NTYwMH0.dc_X5iR_VP_qT0zsiyj_I_OZoT8SnFfQ0CST6RldZX0';

if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
  console.warn(
    '[TerraGo] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY est manquant — définissez-les dans .env.local. Les requêtes Supabase échoueront tant que ce n’est pas fait.'
  );
}

const supabaseUrl = isSupabaseConfigured ? rawUrl : PLACEHOLDER_URL;
const supabaseKey = isSupabaseConfigured ? rawKey : PLACEHOLDER_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/** Clé serveur uniquement — jamais de préfixe NEXT_PUBLIC_ */
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

const serverKey = serviceRoleKey ?? supabaseKey;

if (isSupabaseConfigured && !serviceRoleKey && process.env.NODE_ENV === 'development') {
  console.warn(
    '[TerraGo] SUPABASE_SERVICE_ROLE_KEY est manquant — supabaseServer utilise la clé anon. Définissez-la dans .env.local (serveur uniquement).'
  );
}

/**
 * Client Supabase réservé au serveur (RSC, routes API).
 * Utilise SUPABASE_SERVICE_ROLE_KEY quand elle est définie (contourne RLS) ;
 * sinon retombe sur la clé anon pour ne pas casser le dev local.
 */
export const supabaseServer = createClient(supabaseUrl, serverKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
  },
});

/**
 * Alias explicite quand la service role est configurée (insertions API, etc.).
 * null si SUPABASE_SERVICE_ROLE_KEY est absente — les appels utilisent alors supabaseServer (anon).
 */
export const supabaseAdmin = isSupabaseConfigured && serviceRoleKey ? supabaseServer : null;
