import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function PageHeader({
    title,
    description,
    backUrl,
    backText = 'Kembali',
    actions,
    className = '',
}) {
    return (
        <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80', className)}>
            <div className="space-y-1">
                {backUrl && (
                    <Link
                        href={backUrl}
                        className="inline-flex items-center text-xs font-semibold text-muted hover:text-foreground transition gap-1.5 mb-2 cursor-pointer"
                    >
                        <ArrowLeftIcon className="h-3.5 w-3.5" />
                        {backText}
                    </Link>
                )}
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-muted">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
