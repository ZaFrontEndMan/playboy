'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import UnifiedCard from '@/components/UnifiedCard';
import PageHeader from '@/components/PageHeader';
import PageTabs from '@/components/PageTabs';
import PageLayout from '@/components/PageLayout';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useProducts } from '@/hooks/useProducts';
import { Category } from '@/types/product';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function CollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get category and pagination from URL params
  const categoryParam = searchParams.get('category');
  const selectedCategory: Category | 'all' = 
    categoryParam && ['top', 'mid', 'bottom'].includes(categoryParam) 
      ? (categoryParam as Category) 
      : 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 12;

  // Fetch products using React Query hook
  const { data, isLoading, error, refetch } = useProducts({ 
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    page,
    pageSize,
  });

  const categories: Array<{ value: Category | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'top', label: 'Top' },
    { value: 'mid', label: 'Mid' },
    { value: 'bottom', label: 'Bottom' },
  ];

  const handleTabChange = (value: string) => {
    if (value === 'all') {
      router.push('/collection');
    } else {
      router.push(`/collection?category=${value}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    if (newPage !== 1) {
      params.set('page', String(newPage));
    }
    const queryString = params.toString();
    router.push(`/collection${queryString ? `?${queryString}` : ''}`);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pagination = data?.pagination;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <main className="relative min-h-screen">
      <PageLayout>
        <PageHeader
          title={
            <>
              Full <span className="text-brand-green">Collection</span>
            </>
          }
          description="Explore our complete range of premium streetwear pieces designed for the digital age."
        />

        <PageTabs
          tabs={categories}
          activeTab={selectedCategory}
          onTabChange={handleTabChange}
        />

        {isLoading && <LoadingState message="Loading products..." />}

        {error && (
          <ErrorState 
            message={error instanceof Error ? error.message : 'An error occurred'} 
            onRetry={() => refetch()} 
          />
        )}

        {!isLoading && !error && data && (
          <>
            <div className="mb-6">
              <p className=" ">
                {pagination 
                  ? `Showing ${((page - 1) * pageSize) + 1}-${Math.min(page * pageSize, pagination.totalItems)} of ${pagination.totalItems} product${pagination.totalItems !== 1 ? 's' : ''}`
                  : `Showing ${data.products.length} product${data.products.length !== 1 ? 's' : ''}`
                }
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {data.products.length > 0 ? (
                data.products.map((product, index) => (
                  <UnifiedCard 
                    key={product.id} 
                    item={product} 
                    index={index}
                    description={true}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="  font-heading uppercase text-lg sm:text-xl">
                    No products found in this category
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page - 1);
                        }}
                        className={!pagination.hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {/* Page numbers */}
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.totalPages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(pageNum);
                              }}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page + 1);
                        }}
                        className={!pagination.hasNextPage ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </PageLayout>
    </main>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen">
        <PageLayout>
          <LoadingState message="Loading..." />
        </PageLayout>
      </main>
    }>
      <CollectionContent />
    </Suspense>
  );
}
