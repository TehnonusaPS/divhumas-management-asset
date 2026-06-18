import React from 'react';
import { cn } from '@/lib/utils';

export default function Input({
    type = 'text',
    className = '',
    disabled = false,
    ...props
}) {
    return (
        <input
            type={type}
            disabled={disabled}
            className={cn(
                'w-full px-4 py-2.5 rounded-xl border border-border bg-card/50 text-foreground placeholder:text-muted/60 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        />
    );
}
