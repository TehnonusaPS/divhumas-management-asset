import React from 'react';
import { cn } from '@/lib/utils';

export default function Progress({
    className = '',
    value = 0,
    variant = 'primary',
    ...props
}) {
    const variants = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        success: 'bg-emerald-500',
        danger: 'bg-red-500',
    };

    // Cap value between 0 and 100
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
        <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={clampedValue}
            className={cn(
                'relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800',
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    'h-full w-full flex-1 transition-all duration-500 ease-out rounded-full',
                    variants[variant] || variants.primary
                )}
                style={{ transform: `translateX(-${100 - clampedValue}%)` }}
            />
        </div>
    );
}
