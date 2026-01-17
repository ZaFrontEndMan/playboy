'use client';

import SkeletonCard from './SkeletonCard';

interface LoadingStateProps {
  message?: string;
  skeletonCount?: number;
  showSkeletons?: boolean;
}

export default function LoadingState({ 
  message = 'Loading...', 
  skeletonCount = 6,
  showSkeletons = true 
}: LoadingStateProps) {
  if (showSkeletons) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="  font-heading uppercase">{message}</p>
      </div>
    </div>
  );
}




