import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'subtle' | 'dark';
}

const cardVariantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default:
    'border border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl',
  glass:
    'border border-white/40 bg-white/80 text-slate-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-2xl',
  elevated:
    'border border-slate-200 bg-white text-slate-900 shadow-[0_20px_48px_rgba(15,23,42,0.12)]',
  subtle:
    'border border-slate-100 bg-slate-50/70 text-slate-900',
  dark:
    'border border-slate-800 bg-[#0F172A]/90 text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl transition-all duration-200',
        cardVariantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-1.5 p-5 sm:p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display text-lg font-bold tracking-tight text-slate-900',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs text-slate-500 sm:text-sm', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pt-0 sm:p-6 sm:pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-5 pt-0 sm:p-6 sm:pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('ml-auto flex items-center gap-2', className)}
    {...props}
  />
));
CardAction.displayName = 'CardAction';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
};
