import { NextResponse } from 'next/server';
import { getAllProducts, getNewArrivals, getBestsellers, getSaleProducts } from '@/lib/products';
import { getAllDrops, getAvailableDrops, getComingSoonDrops } from '@/lib/drops';
import { validateSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Check authentication
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader
      ?.split(';')
      .find((c) => c.trim().startsWith('admin_token='))
      ?.split('=')[1];

    if (!token || !validateSession(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all data
    const allProducts = getAllProducts();
    const allDrops = getAllDrops();
    const newArrivals = getNewArrivals();
    const bestsellers = getBestsellers();
    const saleProducts = getSaleProducts();
    const availableDrops = getAvailableDrops();
    const comingSoonDrops = getComingSoonDrops();

    // Calculate statistics
    const stats = {
      products: {
        total: allProducts.length,
        newArrivals: newArrivals.length,
        bestsellers: bestsellers.length,
        onSale: saleProducts.length,
      },
      drops: {
        total: allDrops.length,
        available: availableDrops.length,
        comingSoon: comingSoonDrops.length,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}


