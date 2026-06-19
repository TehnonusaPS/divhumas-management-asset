import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function Avatar({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/40 bg-muted/10',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function AvatarImage({ className = '', src, alt = '', ...props }) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return null;
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className={cn('aspect-square h-full w-full object-cover', className)}
            {...props}
        />
    );
}

export function AvatarFallback({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'flex h-full w-full items-center justify-center rounded-full bg-muted/20 text-xs font-bold text-muted select-none uppercase',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
