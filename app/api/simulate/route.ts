import { NextResponse } from 'next/server';
import { simulateOutcome } from '@/lib/ai';
import { mockUserProfile } from '@/lib/mockData';

export async function POST(req: Request) {
  try {
    const { opportunity } = await req.json();
    if (!opportunity) {
      return NextResponse.json({ error: 'Missing opportunity' }, { status: 400 });
    }
    const result = await simulateOutcome(mockUserProfile, opportunity);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Simulation failed' }, { status: 500 });
  }
}
