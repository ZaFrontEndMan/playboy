import { NextRequest, NextResponse } from 'next/server';
import { getDropById, updateDrop, deleteDrop } from '@/lib/drops';
import { validateSession } from '@/lib/auth';
import { Drop, Availability } from '@/types/drop';

function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return token ? validateSession(token) : false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const dropId = parseInt(id, 10);

    if (isNaN(dropId)) {
      return NextResponse.json(
        { error: 'Invalid drop ID' },
        { status: 400 }
      );
    }

    const drop = getDropById(dropId);

    if (!drop) {
      return NextResponse.json(
        { error: 'Drop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ drop });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch drop' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const dropId = parseInt(id, 10);

    if (isNaN(dropId)) {
      return NextResponse.json(
        { error: 'Invalid drop ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updates: Partial<Drop> = {};

    if (body.name !== undefined) updates.name = body.name;
    if (body.price !== undefined) updates.price = Number(body.price);
    if (body.image !== undefined) updates.image = body.image;
    if (body.description !== undefined) updates.description = body.description;
    if (body.sizes !== undefined) updates.sizes = body.sizes;
    if (body.availability !== undefined) {
      if (!['avail', 'soon'].includes(body.availability)) {
        return NextResponse.json(
          { error: 'Invalid availability' },
          { status: 400 }
        );
      }
      updates.availability = body.availability as Availability;
    }

    const updatedDrop = updateDrop(dropId, updates);

    if (!updatedDrop) {
      return NextResponse.json(
        { error: 'Drop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ drop: updatedDrop });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update drop' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const dropId = parseInt(id, 10);

    if (isNaN(dropId)) {
      return NextResponse.json(
        { error: 'Invalid drop ID' },
        { status: 400 }
      );
    }

    const deleted = deleteDrop(dropId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Drop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete drop' },
      { status: 500 }
    );
  }
}


