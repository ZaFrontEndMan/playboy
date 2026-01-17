import { useQuery } from '@tanstack/react-query';
import { Drop, Availability } from '@/types/drop';

interface UseDropsParams {
  availability?: Availability;
  page?: number;
  pageSize?: number;
}

interface DropsResponse {
  drops: Drop[];
  count?: number; // For backward compatibility
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  availability: string;
}

async function fetchDrops(params: UseDropsParams = {}): Promise<DropsResponse> {
  const { availability, page = 1, pageSize = 10 } = params;
  const queryParams = new URLSearchParams();
  
  if (availability) {
    queryParams.append('availability', availability);
  }
  
  if (page !== 1) {
    queryParams.append('page', page.toString());
  }
  queryParams.append('pageSize', pageSize.toString());
  
  const url = queryParams.toString() 
    ? `/api/drops?${queryParams.toString()}`
    : '/api/drops';
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch drops');
  }
  return response.json();
}

export function useDrops(params: UseDropsParams = {}) {
  const { availability, page = 1, pageSize = 10 } = params;
  
  return useQuery({
    queryKey: ['drops', availability, page, pageSize],
    queryFn: () => fetchDrops(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}




