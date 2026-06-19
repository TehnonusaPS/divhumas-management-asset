import React from 'react';
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Button from '@/Components/ui/Button';
import { cn } from '@/lib/utils';

function FilterItem({ label, span = 1, children, className = '' }) {
    const spanClass = {
        1: 'col-span-1',
        2: 'col-span-1 sm:col-span-2',
        3: 'col-span-1 sm:col-span-3',
        4: 'col-span-1 sm:col-span-4',
    }[span] || 'col-span-1';

    return (
        <div className={cn(spanClass, 'space-y-2', className)}>
            {label && (
                <label className="block text-xs font-bold text-muted uppercase tracking-wider select-none">
                    {label}
                </label>
            )}
            {children}
        </div>
    );
}

function FilterSearchBar({
    title = 'Filter Pencarian',
    cols = 4,
    onSearch,
    onReset,
    children,
    className = '',
    ...props
}) {
    const colsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    }[cols] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all',
                className
            )}
            {...props}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-4 border-b border-border/40">
                <h3 className="text-sm font-bold text-foreground tracking-tight flex items-center gap-2">
                    <MagnifyingGlassIcon className="h-4.5 w-4.5 text-primary" />
                    {title}
                </h3>
            </div>

            {/* Filter Grid */}
            <div className={cn('grid gap-4 p-5', colsClass)}>
                {children}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-start gap-2 px-5 pb-5">
                {onReset && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onReset}
                    >
                        <ArrowPathIcon className="h-4 w-4 mr-1.5" />
                        Reset
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                >
                    <MagnifyingGlassIcon className="h-4 w-4 mr-1.5" />
                    Cari
                </Button>
            </div>
        </form>
    );
}

FilterSearchBar.Item = FilterItem;

export default FilterSearchBar;
