import React from 'react';
import { cn } from '@/lib/utils';
import { 
    InformationCircleIcon, 
    CheckCircleIcon, 
    ExclamationTriangleIcon, 
    XCircleIcon,
    BellIcon
} from '@heroicons/react/24/outline';

const icons = {
    default: BellIcon,
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon,
};

export function Alert({
    className = '',
    variant = 'default',
    children,
    showIcon = true,
    ...props
}) {
    const variants = {
        default: 'bg-card border-border text-foreground',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-400 dark:bg-blue-950/20',
        success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-400 dark:bg-emerald-950/20',
        warning: 'bg-secondary/15 border-secondary/35 text-amber-800 dark:text-gold dark:bg-secondary/5',
        danger: 'bg-primary/10 border-primary/25 text-primary dark:text-red-400 dark:bg-primary/15',
    };

    const Icon = icons[variant] || icons.default;

    return (
        <div
            role="alert"
            className={cn(
                'relative w-full rounded-2xl border p-4 flex gap-3 transition-colors duration-200',
                variants[variant] || variants.default,
                className
            )}
            {...props}
        >
            {showIcon && (
                <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="flex-1 space-y-1">
                {children}
            </div>
        </div>
    );
}

export function AlertTitle({ className = '', children, ...props }) {
    return (
        <h5
            className={cn('font-bold text-sm tracking-wide leading-none', className)}
            {...props}
        >
            {children}
        </h5>
    );
}

export function AlertDescription({ className = '', children, ...props }) {
    return (
        <div
            className={cn('text-xs opacity-90 leading-relaxed [&_p]:leading-relaxed', className)}
            {...props}
        >
            {children}
        </div>
    );
}
