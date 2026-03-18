import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lxlvcwwvnujfbqgcfzze.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_Mtnk8ImM2KGy4XoLSHPtBg_zULZWV09';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (url, options) =>
      fetch(url, { ...options, cache: 'no-store' }),
  },
});
