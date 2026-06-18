import React from 'react';
import { cn } from '@/lib/utils';

export default function Label({ className = '', children, ...props }) {
    return (
        <label
            className={cn(
                'block text-xs font-bold text-muted uppercase tracking-wider mb-2 select-none',
                className
            )}
            {...props}
        >
            {children}
        </label>
    );
}
