'use client';

import FlickerText from '@/components/FlickerText';
import { Badge } from './Badge';

interface SaleBadgeProps {
  percentage?: number;
  className?: string;
}

export function SaleBadge({ percentage, className = '' }: SaleBadgeProps) {
  const displayText = percentage ? `-${percentage}%` : 'SALE';

  return (
    <Badge
      variant="solid"
      className={`bg-red-500 hover:bg-red-600 ${className}`}
    >
      <FlickerText>{displayText}</FlickerText>
    </Badge>
  );
}

