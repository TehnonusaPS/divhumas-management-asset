import React from 'react';
import { cn } from '@/lib/utils';

export default function Skeleton({ className = '', variant = 'rect', ...props }) {
    return (
        <div
            className={cn(
                'animate-pulse bg-muted/20 dark:bg-muted/10',
                variant === 'circle' ? 'rounded-full' : 'rounded-xl',
                className
            )}
            {...props}
        />
    );
}
