import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductById } from '@/lib/products';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(parseInt(id, 10));

  if (!product) {
    return {
      title: 'Product Not Found - FUTUREWEAR',
    };
  }

  return {
    title: `${product.name} - FUTUREWEAR`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative min-h-screen">
      <ProductDetailClient product={product} />
    </main>
  );
}
