import { useQuery } from '@tanstack/react-query';
import { Product, Category } from '@/types/product';

interface UseProductsParams {
  category?: Category | 'all';
  limit?: number; // For backward compatibility
  filter?: 'new' | 'bestseller' | 'sale';
  page?: number;
  pageSize?: number;
}

interface ProductsResponse {
  products: Product[];
  count?: number; // For backward compatibility
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  category?: string;
  filter?: string;
}

async function fetchProducts(params: UseProductsParams = {}): Promise<ProductsResponse> {
  const { category, limit, filter, page = 1, pageSize = 10 } = params;
  let url = '/api/products';
  const queryParams = new URLSearchParams();
  
  // Filter takes precedence over category
  if (filter) {
    queryParams.append('filter', filter);
  } else if (category && category !== 'all') {
    queryParams.append('category', category);
  }
  
  // Prefer pagination over limit
  if (page !== 1) {
    queryParams.append('page', page.toString());
  }
  queryParams.append('pageSize', pageSize.toString());
  
  // Support limit for backward compatibility (only if pagination not used)
  if (limit && page === 1 && pageSize === 10) {
    queryParams.delete('pageSize');
    queryParams.append('limit', limit.toString());
  }
  
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export function useProducts(params: UseProductsParams = {}) {
  const { category = 'all', limit, filter, page = 1, pageSize = 10 } = params;
  
  return useQuery({
    queryKey: ['products', category, limit, filter, page, pageSize],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

// Convenience hooks for cleaner API
export function useNewArrivals(limit?: number, page?: number, pageSize?: number) {
  return useProducts({ filter: 'new', limit, page, pageSize });
}

export function useBestsellers(limit?: number, page?: number, pageSize?: number) {
  return useProducts({ filter: 'bestseller', limit, page, pageSize });
}

export function useSaleProducts(limit?: number, page?: number, pageSize?: number) {
  return useProducts({ filter: 'sale', limit, page, pageSize });
}




