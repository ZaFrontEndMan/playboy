"use client";

import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-20">
      <p className="text-red-400 font-heading uppercase mb-4">Error: {message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="solid"
          size="md"
          className="px-6 py-3 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all"
        >
          Retry
        </Button>
      )}
    </div>
  );
}


