'use client';

export default function SkeletonCard() {
  return (
    <div className="group">
      <div className="relative aspect-3/4 mb-4 overflow-hidden bg-transparent animate-pulse">
        <div className="w-full h-full bg-foreground/10" />
      </div>
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:justify-between sm:gap-2">
        <div className="flex-1 w-full">
          <div className="h-6 bg-foreground/10 rounded mb-2 w-3/4 animate-pulse" />
          <div className="h-4 bg-foreground/10 rounded w-1/2 animate-pulse" />
        </div>
        <div className="h-6 bg-foreground/10 rounded w-16 mt-2 sm:mt-0 sm:ml-4 animate-pulse" />
      </div>
    </div>
  );
}

