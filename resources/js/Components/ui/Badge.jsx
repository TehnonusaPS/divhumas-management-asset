import React from 'react';
import { cn } from '@/lib/utils';

const CheckCircleIcon = (props) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 mr-1 shrink-0" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);

export default function Badge({
    variant = 'default',
    className = '',
    showDot,
    icon,
    children,
    ...props
}) {
    const isOutline = variant.startsWith('outline-');
    
    const variants = {
        // Group 1: Solid soft background with dot
        default: 'bg-zinc-150 text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300 border-transparent',
        primary: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-red-400 border-transparent',
        secondary: 'bg-secondary/15 text-amber-800 dark:bg-secondary/10 dark:text-gold border-transparent',
        success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-transparent',
        warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border-transparent',
        danger: 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-transparent',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400 border-transparent',
        purple: 'bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400 border-transparent',
        pink: 'bg-pink-100 text-pink-800 dark:bg-pink-950/30 dark:text-pink-400 border-transparent',

        // Group 2: Outline border with icon
        'outline-success': 'bg-transparent border border-emerald-600/80 text-emerald-600 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-emerald-500/5',
        'outline-info': 'bg-transparent border border-blue-600/80 text-blue-600 dark:border-blue-500/30 dark:text-blue-400 dark:bg-blue-500/5',
        'outline-danger': 'bg-transparent border border-red-600/80 text-red-600 dark:border-red-500/30 dark:text-red-400 dark:bg-red-500/5',
    };

    const dotColors = {
        default: 'bg-zinc-400 dark:bg-zinc-500',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
        info: 'bg-blue-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
    };

    // By default, show dot for non-outline variants if not overridden
    const shouldShowDot = showDot !== undefined ? showDot : !isOutline;
    const activeDotColor = dotColors[variant] || 'bg-current';

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all',
                variants[variant] || variants.default,
                className
            )}
            {...props}
        >
            {/* Render check circle icon for outline variants by default, or if passed */}
            {icon ? icon : (isOutline && <CheckCircleIcon />)}
            
            {/* Render dot if requested */}
            {shouldShowDot && !icon && (
                <span className={cn('h-1.5 w-1.5 rounded-full mr-1.5 shrink-0', activeDotColor)} />
            )}
            
            {children}
        </span>
    );
}
