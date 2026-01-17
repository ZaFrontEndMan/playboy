import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

interface ProductResponse {
  product: Product;
}

async function fetchProduct(id: number): Promise<ProductResponse> {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id && !isNaN(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}





