import { NextRequest, NextResponse } from 'next/server';
import { getAllDrops, getDropsByAvailability } from '@/lib/drops';
import { paginate } from '@/lib/admin/pagination';
import { Availability } from '@/types/drop';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const availability = searchParams.get('availability') as Availability | null;
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Validate availability if provided
    if (availability && !['avail', 'soon'].includes(availability)) {
      return NextResponse.json(
        { error: 'Invalid availability. Must be: avail or soon' },
        { status: 400 }
      );
    }

    const drops = getDropsByAvailability(availability || undefined);

    // Apply pagination
    const { paginatedItems, pagination } = paginate(drops, page, pageSize);

    return NextResponse.json({
      drops: paginatedItems,
      pagination,
      availability: availability || 'all',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch drops' },
      { status: 500 }
    );
  }
}

