'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

// Badge variants (inspired by shadcn but customized)
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-heading font-bold uppercase',
  {
    variants: {
      variant: {
        solid: 'bg-brand-green text-white border-transparent',
        muted: 'bg-gray-700 text-gray-200 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  }
);

type Variant = 'solid' | 'muted';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ variant = 'solid', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
