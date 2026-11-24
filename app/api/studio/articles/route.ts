import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ArticleInputError, listStudioArticles, saveStudioArticle } from '@/lib/studioArticles';
import { studioGuard } from '@/lib/studioAuth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function refresh(slug = '') {
  revalidatePath('/blog');
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function GET() {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const articles = await listStudioArticles(supabaseAdmin);
    return NextResponse.json({ articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lecture impossible.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const article = await saveStudioArticle(supabaseAdmin, body, '');
    refresh(article.slug);
    return NextResponse.json({ article });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof ArticleInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
