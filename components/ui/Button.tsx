'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

// Base button variants (shadcn-compatible for pagination)
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-heading uppercase tracking-wider',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Custom variants for our app
        solid: 'bg-brand-green text-white hover:bg-brand-green/85',
        muted: 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700',
        'ghost-muted': '  border border-gray-700 hover:bg-gray-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs sm:text-sm',
        md: 'h-10 px-4 py-3 text-sm sm:text-base',
        lg: 'h-11 rounded-md px-5 py-3.5 text-sm sm:text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type CustomVariant = 'solid' | 'ghost' | 'muted' | 'ghost-muted' | 'default' | 'destructive' | 'outline' | 'secondary' | 'link';
type CustomSize = 'sm' | 'md' | 'lg' | 'default' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CustomVariant;
  size?: CustomSize;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', fullWidth, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant: variant as any, size: size as any }),
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
