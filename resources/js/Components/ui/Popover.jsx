import React from 'react';
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

export function Popover({ className = '', children, ...props }) {
    return (
        <HeadlessPopover className={cn('relative inline-block', className)} {...props}>
            {children}
        </HeadlessPopover>
    );
}

export function PopoverTrigger({ className = '', children, ...props }) {
    return (
        <PopoverButton
            className={cn(
                'inline-flex items-center gap-1.5 focus:outline-none cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </PopoverButton>
    );
}

export function PopoverContent({
    className = '',
    align = 'center',
    children,
    ...props
}) {
    const alignmentClasses = {
        left: 'left-0 origin-top-left',
        right: 'right-0 origin-top-right',
        center: 'left-1/2 -translate-x-1/2 origin-top',
    }[align] || 'left-1/2 -translate-x-1/2 origin-top';

    return (
        <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-1 scale-95"
        >
            <PopoverPanel
                className={cn(
                    'absolute z-50 mt-3 w-72 rounded-2xl border border-border bg-card p-4 shadow-xl focus:outline-none dark:bg-card/95 backdrop-blur-md',
                    alignmentClasses,
                    className
                )}
                {...props}
            >
                {children}
            </PopoverPanel>
        </Transition>
    );
}
