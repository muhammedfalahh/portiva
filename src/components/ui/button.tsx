import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'dark'
    | 'glow';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'pill';
  asChild?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:
    'bg-[#0066FF] text-white shadow-[0_4px_16px_rgba(0,102,255,0.3)] hover:bg-[#0052CC] hover:shadow-[0_6px_24px_rgba(0,102,255,0.45)]',
  destructive:
    'bg-red-500 text-white shadow-sm hover:bg-red-600',
  outline:
    'border border-slate-200/80 bg-white/90 text-[#0F172A] shadow-sm backdrop-blur-xl hover:bg-white hover:border-slate-300 hover:shadow-md',
  secondary:
    'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200/80',
  ghost:
    'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
  link:
    'text-[#0066FF] underline-offset-4 hover:underline',
  dark:
    'bg-[#0F172A] text-white shadow-[0_4px_16px_rgba(15,23,42,0.25)] hover:bg-[#1E293B] hover:shadow-[0_6px_24px_rgba(15,23,42,0.35)]',
  glow:
    'bg-gradient-to-r from-[#0066FF] to-[#38BDF8] text-white shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:shadow-[0_6px_28px_rgba(0,102,255,0.6)]',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'h-10 px-5 py-2 text-sm',
  sm: 'h-8 rounded-lg px-3 text-xs',
  lg: 'h-12 rounded-xl px-7 text-base font-semibold',
  icon: 'h-10 w-10 p-0 rounded-full',
  'icon-sm': 'h-8 w-8 p-0 rounded-lg',
  pill: 'h-11 rounded-full px-6 text-sm font-semibold',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
