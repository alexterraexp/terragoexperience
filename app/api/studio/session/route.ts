import { NextResponse } from 'next/server';
import { isStudioAuthed, isStudioConfigured } from '@/lib/studioAuth';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    configured: isStudioConfigured(),
    authenticated: await isStudioAuthed(),
  });
}
