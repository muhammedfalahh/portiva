import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'accent'
    | 'glass'
    | 'success'
    | 'warning';
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:
    'border-transparent bg-[#0F172A] text-white hover:bg-[#1E293B]',
  secondary:
    'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200/80',
  destructive:
    'border-transparent bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20',
  outline:
    'border-slate-200/80 bg-white/80 text-slate-800 shadow-sm backdrop-blur-md',
  accent:
    'border-transparent bg-blue-500/10 text-[#0066FF] border border-blue-500/20 hover:bg-blue-500/20',
  glass:
    'border-white/30 bg-white/70 text-slate-900 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-xl',
  success:
    'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 border',
  warning:
    'border-amber-500/20 bg-amber-500/10 text-amber-600 border',
};

function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
