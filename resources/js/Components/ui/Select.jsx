import React from 'react';
import { cn } from '@/lib/utils';

export default function Select({
    className = '',
    disabled = false,
    children,
    ...props
}) {
    return (
        <select
            disabled={disabled}
            className={cn(
                'w-full px-4 py-2.5 rounded-xl border border-border bg-card/50 text-foreground text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}
