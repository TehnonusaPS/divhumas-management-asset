import React from 'react';
import { RadioGroup as HeadlessRadioGroup, Radio } from '@headlessui/react';
import { cn } from '@/lib/utils';

export function RadioGroup({ className = '', children, ...props }) {
    return (
        <HeadlessRadioGroup className={cn('grid gap-2', className)} {...props}>
            {children}
        </HeadlessRadioGroup>
    );
}

export function RadioGroupItem({ className = '', value, label, disabled = false, ...props }) {
    return (
        <Radio
            value={value}
            disabled={disabled}
            className={cn(
                'group flex items-center gap-3 cursor-pointer select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        >
            {({ checked }) => (
                <>
                    <span
                        className={cn(
                            'h-4 w-4 rounded-full border border-border/80 flex items-center justify-center bg-card shadow-sm transition-all duration-150',
                            checked 
                                ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                                : 'group-hover:border-primary/50'
                        )}
                    >
                        <span 
                            className={cn(
                                'h-2 w-2 rounded-full bg-primary transition-transform scale-0 duration-150',
                                checked && 'scale-100'
                            )} 
                        />
                    </span>
                    {label && (
                        <span className="text-sm font-medium text-foreground">
                            {label}
                        </span>
                    )}
                </>
            )}
        </Radio>
    );
}
