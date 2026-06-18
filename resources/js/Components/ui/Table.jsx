import React from 'react';
import { cn } from '@/lib/utils';

export function Table({ className = '', children, ...props }) {
    return (
        <div className="relative w-full overflow-auto rounded-xl border border-border bg-card">
            <table className={cn('w-full caption-bottom text-sm', className)} {...props}>
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ className = '', children, ...props }) {
    return (
        <thead className={cn('bg-background/50 border-b border-border', className)} {...props}>
            {children}
        </thead>
    );
}

export function TableBody({ className = '', children, ...props }) {
    return (
        <tbody className={cn('divide-y divide-border/60 [&_tr:last-child]:border-0', className)} {...props}>
            {children}
        </tbody>
    );
}

export function TableRow({ className = '', children, ...props }) {
    return (
        <tr
            className={cn(
                'transition-colors hover:bg-background/40 data-[state=selected]:bg-muted/15',
                className
            )}
            {...props}
        >
            {children}
        </tr>
    );
}

export function TableHead({ className = '', children, ...props }) {
    return (
        <th
            className={cn(
                'h-12 px-4 text-left align-middle font-bold text-muted text-xs tracking-wider uppercase [&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        >
            {children}
        </th>
    );
}

export function TableCell({ className = '', children, ...props }) {
    return (
        <td
            className={cn(
                'p-4 align-middle text-foreground [&:has([role=checkbox])]:pr-0',
                className
            )}
            {...props}
        >
            {children}
        </td>
    );
}
