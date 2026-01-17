import { NextRequest, NextResponse } from 'next/server';
import { getDropById } from '@/lib/drops';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid drop ID' },
        { status: 400 }
      );
    }

    const drop = getDropById(id);

    if (!drop) {
      return NextResponse.json(
        { error: 'Drop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ drop });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch drop' },
      { status: 500 }
    );
  }
}

