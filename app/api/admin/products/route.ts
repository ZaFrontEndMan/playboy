import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/products';
import { validateSession } from '@/lib/auth';
import { searchProducts, filterProducts, sortProducts, ProductFilterOptions } from '@/lib/admin/filters';
import { paginate } from '@/lib/admin/pagination';
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
    const sortBy = searchParams.get('sortBy') || 'id';
    const order = (searchParams.get('order') || 'asc') as 'asc' | 'desc';
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

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

    // Apply sorting
    products = sortProducts(products, sortBy, order);

    // Apply pagination
    const { paginatedItems, pagination } = paginate(products, page, pageSize);

    return NextResponse.json({
      products: paginatedItems,
      pagination,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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
    const { name, price, image, category, description, sizes, colors, isNew, isBestseller, isOnSale, salePrice, salePercentage } = body;

    // Validation
    if (!name || !price || !image || !category || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['top', 'mid', 'bottom'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const newProduct = createProduct({
      name,
      price: Number(price),
      image,
      category: category as Category,
      description,
      sizes: sizes || [],
      colors: colors || [],
      isNew: isNew || false,
      isBestseller: isBestseller || false,
      isOnSale: isOnSale || false,
      salePrice: salePrice ? Number(salePrice) : undefined,
      salePercentage: salePercentage ? Number(salePercentage) : undefined,
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

