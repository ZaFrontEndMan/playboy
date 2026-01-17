import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllProducts, 
  getProductsByCategoryOrAll,
  getNewArrivals,
  getBestsellers,
  getSaleProducts
} from '@/lib/products';
import { paginate } from '@/lib/admin/pagination';
import { Category } from '@/types/product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as Category | null;
    const filter = searchParams.get('filter') as 'new' | 'bestseller' | 'sale' | null;
    const limitParam = searchParams.get('limit');
    
    // Pagination parameters (prefer page/pageSize over limit)
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : (limitParam ? parseInt(limitParam, 10) : 10);

    // Handle filter parameter (takes precedence over category)
    if (filter) {
      let filteredProducts: ReturnType<typeof getAllProducts>;
      
      switch (filter) {
        case 'new':
          filteredProducts = getNewArrivals();
          break;
        case 'bestseller':
          filteredProducts = getBestsellers();
          break;
        case 'sale':
          filteredProducts = getSaleProducts();
          break;
        default:
          return NextResponse.json(
            { error: 'Invalid filter. Must be: new, bestseller, or sale' },
            { status: 400 }
          );
      }

      // Apply pagination
      const { paginatedItems, pagination } = paginate(filteredProducts, page, pageSize);

      return NextResponse.json({
        products: paginatedItems,
        pagination,
        filter,
      });
    }

    // Validate category if provided
    if (category && !['top', 'mid', 'bottom'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be: top, mid, or bottom' },
        { status: 400 }
      );
    }

    let products = getProductsByCategoryOrAll(category || undefined);

    // Apply pagination
    const { paginatedItems, pagination } = paginate(products, page, pageSize);

    return NextResponse.json({
      products: paginatedItems,
      pagination,
      category: category || 'all',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}



