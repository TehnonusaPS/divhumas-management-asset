import React from 'react';
import { cn } from '@/lib/utils';

export default function Checkbox({
    className = '',
    disabled = false,
    label,
    id,
    ...props
}) {
    const checkboxId = id || React.useId();
    return (
        <div className="flex items-center gap-2 select-none">
            <input
                type="checkbox"
                id={checkboxId}
                disabled={disabled}
                className={cn(
                    'h-4 w-4 rounded border-border text-primary bg-card/50 focus:ring-primary focus:ring-offset-0 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                    className
                )}
                {...props}
            />
            {label && (
                <label
                    htmlFor={checkboxId}
                    className={cn(
                        'text-sm font-medium text-foreground cursor-pointer',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    {label}
                </label>
            )}
        </div>
    );
}
