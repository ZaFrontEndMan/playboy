import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';
import { validateSession } from '@/lib/auth';
import { searchProducts, filterProducts, ProductFilterOptions } from '@/lib/admin/filters';
import { exportProductsToExcel } from '@/lib/admin/excel';
import { Category } from '@/types/product';

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
    const category = searchParams.get('category') as Category | null;
    const isNew = searchParams.get('isNew');
    const isBestseller = searchParams.get('isBestseller');
    const isOnSale = searchParams.get('isOnSale');

    let products = getAllProducts();

    // Apply search
    if (search) {
      products = searchProducts(products, search);
    }

    // Apply filters
    const filters: ProductFilterOptions = {};
    if (category) filters.category = category;
    if (isNew !== null) filters.isNew = isNew === 'true';
    if (isBestseller !== null) filters.isBestseller = isBestseller === 'true';
    if (isOnSale !== null) filters.isOnSale = isOnSale === 'true';

    products = filterProducts(products, filters);

    const excelBuffer = exportProductsToExcel(products);

    return new Response(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="products_${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to export products' },
      { status: 500 }
    );
  }
}

