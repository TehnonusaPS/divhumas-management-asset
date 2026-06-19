import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

export function Breadcrumb({ className = '', children, ...props }) {
    return (
        <nav aria-label="breadcrumb" className={cn('flex', className)} {...props}>
            {children}
        </nav>
    );
}

export function BreadcrumbList({ className = '', children, ...props }) {
    return (
        <ol
            className={cn(
                'flex flex-wrap items-center gap-1.5 break-words text-xs font-medium text-muted uppercase tracking-wider',
                className
            )}
            {...props}
        >
            {children}
        </ol>
    );
}

export function BreadcrumbItem({ className = '', children, ...props }) {
    return (
        <li className={cn('inline-flex items-center gap-1.5', className)} {...props}>
            {children}
        </li>
    );
}

export function BreadcrumbLink({ className = '', href, children, ...props }) {
    const baseStyles = 'transition-colors hover:text-foreground';

    if (href) {
        return (
            <Link href={href} className={cn(baseStyles, className)} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <span className={cn(baseStyles, className)} {...props}>
            {children}
        </span>
    );
}

export function BreadcrumbPage({ className = '', children, ...props }) {
    return (
        <span
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn('font-bold text-primary dark:text-red-400', className)}
            {...props}
        >
            {children}
        </span>
    );
}

export function BreadcrumbSeparator({ className = '', children, ...props }) {
    return (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5 text-muted/60', className)}
            {...props}
        >
            {children || <ChevronRightIcon />}
        </li>
    );
}

export function BreadcrumbEllipsis({ className = '', ...props }) {
    return (
        <span
            role="presentation"
            aria-hidden="true"
            className={cn('flex h-9 w-9 items-center justify-center', className)}
            {...props}
        >
            <EllipsisHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">More</span>
        </span>
    );
}
