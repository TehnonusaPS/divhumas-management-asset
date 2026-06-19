import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

export function Accordion({ className = '', children, ...props }) {
    return (
        <div className={cn('space-y-2 w-full', className)} {...props}>
            {children}
        </div>
    );
}

export function AccordionItem({ className = '', defaultOpen = false, children, ...props }) {
    return (
        <Disclosure defaultOpen={defaultOpen}>
            {({ open }) => (
                <div
                    className={cn(
                        'border border-border/80 rounded-2xl bg-card overflow-hidden transition-all duration-200',
                        open ? 'shadow-sm border-primary/20' : '',
                        className
                    )}
                    {...props}
                >
                    {typeof children === 'function' ? children({ open }) : children}
                </div>
            )}
        </Disclosure>
    );
}

export function AccordionTrigger({ className = '', children, ...props }) {
    return (
        <DisclosureButton
            className={cn(
                'flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold text-foreground hover:bg-muted/5 transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer group',
                className
            )}
            {...props}
        >
            <span>{children}</span>
            <ChevronDownIcon className="h-5 w-5 text-muted transition-transform duration-200 group-data-[open]:rotate-180" />
        </DisclosureButton>
    );
}

export function AccordionContent({ className = '', children, ...props }) {
    return (
        <DisclosurePanel
            transition
            className={cn(
                'px-5 pb-5 text-xs leading-relaxed text-muted border-t border-border/40 pt-4 bg-muted/[0.02] transition duration-200 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0',
                className
            )}
            {...props}
        >
            {children}
        </DisclosurePanel>
    );
}
