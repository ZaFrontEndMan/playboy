import { useQuery } from '@tanstack/react-query';
import { Drop } from '@/types/drop';

interface DropResponse {
  drop: Drop;
}

async function fetchDrop(id: number): Promise<DropResponse> {
  const response = await fetch(`/api/drops/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Drop not found');
    }
    throw new Error('Failed to fetch drop');
  }
  return response.json();
}

export function useDrop(id: number) {
  return useQuery({
    queryKey: ['drop', id],
    queryFn: () => fetchDrop(id),
    enabled: !!id && !isNaN(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}





