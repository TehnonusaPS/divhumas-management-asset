import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { cn } from '@/lib/utils';

export default function Switch({
    checked,
    onChange,
    disabled = false,
    className = '',
    label,
    variant = 'primary',
    ...props
}) {
    const activeColors = {
        primary: 'data-[checked]:bg-primary',
        secondary: 'data-[checked]:bg-secondary data-[checked]:text-black',
        success: 'data-[checked]:bg-emerald-600',
    };

    return (
        <div className="flex items-center gap-3 select-none">
            <HeadlessSwitch
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={cn(
                    'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted/30 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                    activeColors[variant] || activeColors.primary,
                    className
                )}
                {...props}
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
            </HeadlessSwitch>
            {label && (
                <span
                    className={cn(
                        'text-sm font-medium text-foreground cursor-pointer',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    onClick={() => !disabled && onChange(!checked)}
                >
                    {label}
                </span>
            )}
        </div>
    );
}
