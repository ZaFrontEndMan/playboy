'use client';

import UnifiedCard from '@/components/UnifiedCard';
import PageHeader from '@/components/PageHeader';
import PageLayout from '@/components/PageLayout';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useNewArrivals } from '@/hooks/useProducts';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function NewArrivalsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 12;

  const { data, isLoading, error, refetch } = useNewArrivals(undefined, page, pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage !== 1) {
      router.push(`/new-arrivals?page=${newPage}`);
    } else {
      router.push('/new-arrivals');
    }
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
              New <span className="text-brand-green">Arrivals</span>
            </>
          }
          description="Fresh drops just landed. Be the first to own the latest pieces."
        />

        {isLoading && <LoadingState message="Loading new arrivals..." />}

        {error && (
          <ErrorState 
            message={error instanceof Error ? error.message : 'An error occurred'} 
            onRetry={() => refetch()} 
          />
        )}

        {!isLoading && !error && data && (
          <>
            <div className="mb-6">
              <p className="text-foreground/60">
                {pagination 
                  ? `Showing ${((page - 1) * pageSize) + 1}-${Math.min(page * pageSize, pagination.totalItems)} of ${pagination.totalItems} new arrival${pagination.totalItems !== 1 ? 's' : ''}`
                  : `Showing ${data.products.length} new arrival${data.products.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {data.products.length > 0 ? (
                data.products.map((product, index) => (
                  <UnifiedCard 
                    key={product.id} 
                    item={product} 
                    index={index}
                    description={false}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-foreground/60 font-heading uppercase text-lg sm:text-xl">
                    No new arrivals at the moment
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
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
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

export default function NewArrivalsPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen">
        <PageLayout>
          <LoadingState message="Loading..." />
        </PageLayout>
      </main>
    }>
      <NewArrivalsContent />
    </Suspense>
  );
}



