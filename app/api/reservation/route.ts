import { NextRequest, NextResponse } from 'next/server';
import { processReservation } from '@/lib/reservation';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Corps JSON invalide.' },
      { status: 400, headers: corsHeaders },
    );
  }

  const result = await processReservation(body);
  return NextResponse.json(result.body, { status: result.status, headers: corsHeaders });
}
