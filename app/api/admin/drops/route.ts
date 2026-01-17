import { NextRequest, NextResponse } from 'next/server';
import { getAllDrops, createDrop } from '@/lib/drops';
import { validateSession } from '@/lib/auth';
import { searchDrops, filterDrops, sortDrops, DropFilterOptions } from '@/lib/admin/filters';
import { paginate } from '@/lib/admin/pagination';
import { Availability } from '@/types/drop';

function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return token ? validateSession(token) : false;
}

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const availability = searchParams.get('availability') as Availability | null;
    const sortBy = searchParams.get('sortBy') || 'id';
    const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    let drops = getAllDrops();

    // Apply search
    if (search) {
      drops = searchDrops(drops, search);
    }

    // Apply filters
    const filters: DropFilterOptions = {};
    if (availability) filters.availability = availability;

    drops = filterDrops(drops, filters);

    // Apply sorting
    drops = sortDrops(drops, sortBy, order);

    // Apply pagination
    const { paginatedItems, pagination } = paginate(drops, page, pageSize);

    return NextResponse.json({
      drops: paginatedItems,
      pagination,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch drops' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, price, image, description, sizes, availability } = body;

    // Validation
    if (!name || !price || !image || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (availability && !['avail', 'soon'].includes(availability)) {
      return NextResponse.json(
        { error: 'Invalid availability' },
        { status: 400 }
      );
    }

    const newDrop = createDrop({
      name,
      price: Number(price),
      image,
      description,
      sizes: sizes || [],
      availability: availability || 'avail',
    });

    return NextResponse.json({ drop: newDrop }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create drop' },
      { status: 500 }
    );
  }
}

