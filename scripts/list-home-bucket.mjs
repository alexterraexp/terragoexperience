import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env.local');

function loadEnvFile(path) {
  if (!existsSync(path)) throw new Error(`Missing ${path}`);
  const env = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const env = loadEnvFile(envPath);
const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim() || env.VITE_SUPABASE_URL?.trim();
const key =
  env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  env.VITE_SUPABASE_ANON_KEY?.trim();

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or key in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const BUCKET = 'HOME';

function publicUrl(path) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

async function listAll(prefix) {
  const out = [];
  async function walk(dir) {
    const { data, error } = await supabase.storage.from(BUCKET).list(dir, {
      limit: 1000,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (error) throw new Error(`list ${dir}: ${error.message}`);
    for (const item of data ?? []) {
      const full = dir ? `${dir}/${item.name}` : item.name;
      const isFolder = item.id == null && item.metadata == null;
      if (isFolder) await walk(full);
      else {
        out.push({
          name: item.name,
          path: full,
          size: item.metadata?.size ?? item.metadata?.contentLength ?? null,
          updated: item.updated_at ?? item.created_at ?? null,
        });
      }
    }
  }
  await walk(prefix);
  return out;
}

function fmtBytes(n) {
  if (n == null) return 'n/a';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MiB`;
}

console.log('=== HOME/seminaire/nouvelleaquitaine/ ===\n');
const naq = await listAll('seminaire/nouvelleaquitaine');
if (!naq.length) console.log('(aucun fichier)');
else {
  for (const f of naq.sort((a, b) => a.path.localeCompare(b.path))) {
    console.log(`- ${f.path}`);
    console.log(`  size: ${fmtBytes(f.size)}`);
    console.log(`  url:  ${publicUrl(f.path)}`);
  }
  console.log(`\nTotal: ${naq.length} fichier(s)`);
}

console.log('\n=== HOME/Destination/ (arcachon / oyster, jpg/png récents) ===\n');
const dest = await listAll('Destination');
const imgExt = /\.(jpe?g|png)$/i;
const keywords = /arcachon|oyster|huître|huitre|ostré|ostre/i;
const matches = dest.filter((f) => imgExt.test(f.name) && keywords.test(f.path));
matches.sort((a, b) => String(b.updated ?? '').localeCompare(String(a.updated ?? '')));
const recent = matches.slice(0, 50);
if (!recent.length) {
  console.log('(aucun jpg/png correspondant arcachon/oyster)');
  const anyArcachon = dest.filter((f) => keywords.test(f.path));
  if (anyArcachon.length) {
    console.log(`\nAutres fichiers arcachon/oyster (${anyArcachon.length}):`);
    for (const f of anyArcachon.slice(0, 30)) {
      console.log(`- ${f.path} | ${fmtBytes(f.size)} | updated: ${f.updated ?? 'n/a'}`);
    }
  }
} else {
  for (const f of recent) {
    console.log(`- ${f.path}`);
    console.log(`  size: ${fmtBytes(f.size)} | updated: ${f.updated ?? 'n/a'}`);
    console.log(`  url:  ${publicUrl(f.path)}`);
  }
  console.log(`\nTotal correspondances: ${matches.length} (affichés: ${recent.length})`);
}
