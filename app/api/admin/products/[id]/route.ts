import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products';
import { validateSession } from '@/lib/auth';
import { Product, Category } from '@/types/product';

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
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
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
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updates: Partial<Product> = {};

    if (body.name !== undefined) updates.name = body.name;
    if (body.price !== undefined) updates.price = Number(body.price);
    if (body.image !== undefined) updates.image = body.image;
    if (body.category !== undefined) {
      if (!['top', 'mid', 'bottom'].includes(body.category)) {
        return NextResponse.json(
          { error: 'Invalid category' },
          { status: 400 }
        );
      }
      updates.category = body.category as Category;
    }
    if (body.description !== undefined) updates.description = body.description;
    if (body.sizes !== undefined) updates.sizes = body.sizes;
    if (body.colors !== undefined) updates.colors = body.colors;
    if (body.isNew !== undefined) updates.isNew = body.isNew;
    if (body.isBestseller !== undefined) updates.isBestseller = body.isBestseller;
    if (body.isOnSale !== undefined) updates.isOnSale = body.isOnSale;
    if (body.salePrice !== undefined) updates.salePrice = body.salePrice ? Number(body.salePrice) : undefined;
    if (body.salePercentage !== undefined) updates.salePercentage = body.salePercentage ? Number(body.salePercentage) : undefined;

    const updatedProduct = updateProduct(productId, updates);

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: updatedProduct });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update product' },
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
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const deleted = deleteProduct(productId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}


