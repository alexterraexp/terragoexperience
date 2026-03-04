import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://lxlvcwwvnujfbqgcfzze.supabase.co',
  'sb_publishable_Mtnk8ImM2KGy4XoLSHPtBg_zULZWV09'  // ← remplace ici
);