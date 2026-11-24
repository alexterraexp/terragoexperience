import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ArticleInputError, deleteStudioArticle, saveStudioArticle } from '@/lib/studioArticles';
import { studioGuard } from '@/lib/studioAuth';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

function refresh(slug = '') {
  revalidatePath('/blog');
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const article = await saveStudioArticle(supabaseAdmin, body, id);
    refresh(article.slug);
    return NextResponse.json({ article });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Enregistrement impossible.';
    const status = error instanceof ArticleInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await studioGuard();
  if (denied) return denied;
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur.' },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const body = await supabaseAdmin.from('blog_posts').select('slug').eq('id', id).maybeSingle();
    await deleteStudioArticle(supabaseAdmin, id);
    refresh(typeof body.data?.slug === 'string' ? body.data.slug : '');
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Suppression impossible.';
    const status = error instanceof ArticleInputError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
