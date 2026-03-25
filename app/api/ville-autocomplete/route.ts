import { NextRequest, NextResponse } from 'next/server';
import { getMapboxPublicToken } from '@/lib/mapbox-public';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const token = getMapboxPublicToken();
  if (!token) {
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }

  // Forward geocoding: retours “villes/lieux” pertinents, filtrés sur France.
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    q,
  )}.json?access_token=${encodeURIComponent(token)}&autocomplete=true&types=place&country=fr&limit=6&language=fr`;

  try {
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json().catch(() => ({}));
    const features = Array.isArray(data.features) ? data.features : [];

    const suggestions = features
      .map((f: any) => {
        const place_name = typeof f?.place_name === 'string' ? f.place_name : '';
        const id = typeof f?.id === 'string' ? f.id : undefined;
        return place_name ? { id, place_name } : null;
      })
      .filter(Boolean);

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}

