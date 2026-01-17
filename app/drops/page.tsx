'use client';

import UnifiedCard from '@/components/UnifiedCard';
import PageHeader from '@/components/PageHeader';
import PageLayout from '@/components/PageLayout';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useDrops } from '@/hooks/useDrops';

export default function DropsPage() {
  // Fetch available drops
  const { 
    data: availableData, 
    isLoading: isLoadingAvailable, 
    error: availableError,
    refetch: refetchAvailable 
  } = useDrops({ availability: 'avail' });

  // Fetch coming soon drops
  const { 
    data: comingSoonData, 
    isLoading: isLoadingSoon, 
    error: soonError,
    refetch: refetchSoon 
  } = useDrops({ availability: 'soon' });

  const loading = isLoadingAvailable || isLoadingSoon;
  const error = availableError || soonError;
  const availableDrops = availableData?.drops || [];
  const comingSoonDrops = comingSoonData?.drops || [];

  return (
    <main className="relative min-h-screen">
      <PageLayout>
        <PageHeader
          title={
            <>
              Exclusive <span className="text-brand-green">Drops</span>
            </>
          }
          description="Limited-edition releases. Once they're gone, they're gone forever."
        />

        {loading && <LoadingState message="Loading drops..." />}

        {error && (
          <ErrorState 
            message={error instanceof Error ? error.message : 'An error occurred'} 
            onRetry={() => {
              refetchAvailable();
              refetchSoon();
            }} 
          />
        )}

        {!loading && !error && (
          <div className="space-y-16">
            {/* Available Drops */}
            {availableDrops.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold uppercase mb-6 text-brand-green">
                  Current Drop - Available Now
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {availableDrops.map((drop, index) => (
                    <UnifiedCard 
                      key={drop.id} 
                      item={drop} 
                      index={index}
                      description={false}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Coming Soon Drops */}
            {comingSoonDrops.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold uppercase mb-6 text-gray-500">
                  Coming Soon
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
                  {comingSoonDrops.map((drop, index) => (
                    <div key={drop.id} className="w-full">
                      <UnifiedCard 
                        item={drop} 
                        index={index}
                        description={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {availableDrops.length === 0 && comingSoonDrops.length === 0 && (
                <div className="text-center py-20">
                  <p className="  font-heading uppercase text-lg sm:text-xl">
                  No drops available at the moment
                </p>
              </div>
            )}
          </div>
        )}
      </PageLayout>
    </main>
  );
}
