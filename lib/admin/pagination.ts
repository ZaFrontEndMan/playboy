/**
 * Pagination utility function
 * Applies pagination to an array of items and returns paginated results with metadata
 */
export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): {
  paginatedItems: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
} {
  // Ensure page is at least 1
  const currentPage = Math.max(1, page);
  const currentPageSize = Math.max(1, pageSize);
  
  // Calculate pagination metadata
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / currentPageSize);
  
  // Calculate slice indices
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = startIndex + currentPageSize;
  
  // Get paginated items
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    paginatedItems,
    pagination: {
      page: currentPage,
      pageSize: currentPageSize,
      totalItems,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}


