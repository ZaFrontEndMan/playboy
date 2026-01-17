import { NextRequest, NextResponse } from 'next/server';
import { getAllDrops } from '@/lib/drops';
import { validateSession } from '@/lib/auth';
import { searchDrops, filterDrops, DropFilterOptions } from '@/lib/admin/filters';
import { exportDropsToExcel } from '@/lib/admin/excel';
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

    let drops = getAllDrops();

    // Apply search
    if (search) {
      drops = searchDrops(drops, search);
    }

    // Apply filters
    const filters: DropFilterOptions = {};
    if (availability) filters.availability = availability;

    drops = filterDrops(drops, filters);

    const excelBuffer = exportDropsToExcel(drops);

    return new Response(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="drops_${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to export drops' },
      { status: 500 }
    );
  }
}

