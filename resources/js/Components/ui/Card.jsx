import React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'flex flex-col h-full rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className = '', children, ...props }) {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardTitle({ className = '', children, ...props }) {
    return (
        <h3
            className={cn(
                'text-lg font-bold leading-none tracking-tight text-foreground',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

export function CardDescription({ className = '', children, ...props }) {
    return (
        <p
            className={cn('text-xs text-muted leading-relaxed', className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function CardContent({ className = '', children, ...props }) {
    return (
        <div className={cn('p-6 pt-0 flex-1', className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className = '', children, ...props }) {
    return (
        <div
            className={cn('flex items-center p-6 border-t border-border/40 mt-auto bg-background/20 rounded-b-2xl', className)}
            {...props}
        >
            {children}
        </div>
    );
}

