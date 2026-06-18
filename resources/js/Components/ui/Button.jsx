import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    href,
    children,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/15 active:scale-[0.98] border border-transparent',
        secondary: 'bg-secondary text-black hover:bg-secondary-hover hover:shadow-lg hover:shadow-secondary/15 active:scale-[0.98] border border-transparent',
        outline: 'border border-border bg-card text-foreground hover:bg-background active:scale-[0.98]',
        ghost: 'text-foreground hover:bg-card active:scale-[0.98]',
        danger: 'border border-red-500/50 text-red-600 dark:text-red-400 dark:hover:border-red-500 hover:shadow-lg hover:shadow-red-600/15 active:scale-[0.98]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3.5 text-base',
        icon: 'p-2.5 aspect-square',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href && !disabled) {
        return (
            <Link
                href={href}
                className={classes}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}
