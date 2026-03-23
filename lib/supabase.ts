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
    '[Terrago] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY est manquant — définissez-les dans .env.local. Les requêtes Supabase échoueront tant que ce n’est pas fait.'
  );
}

const supabaseUrl = isSupabaseConfigured ? rawUrl : PLACEHOLDER_URL;
const supabaseKey = isSupabaseConfigured ? rawKey : PLACEHOLDER_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
  },
});
