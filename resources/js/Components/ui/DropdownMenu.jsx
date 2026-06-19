import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

export function DropdownMenu({ className = '', children, ...props }) {
    return (
        <Menu as="div" className={cn('relative inline-block text-left', className)} {...props}>
            {children}
        </Menu>
    );
}

export function DropdownMenuTrigger({ className = '', children, ...props }) {
    return (
        <MenuButton
            className={cn(
                'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        >
            {children}
        </MenuButton>
    );
}

export function DropdownMenuContent({
    className = '',
    align = 'right',
    children,
    ...props
}) {
    const alignmentClasses = {
        left: 'origin-top-left left-0',
        right: 'origin-top-right right-0',
    }[align] || 'origin-top-right right-0';

    return (
        <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <MenuItems
                className={cn(
                    'absolute z-50 mt-2 w-56 rounded-2xl border border-border bg-card text-card-foreground shadow-lg focus:outline-none p-1.5 backdrop-blur-md bg-card/95',
                    alignmentClasses,
                    className
                )}
                {...props}
            >
                {children}
            </MenuItems>
        </Transition>
    );
}

export function DropdownMenuItem({ className = '', children, onClick, ...props }) {
    return (
        <MenuItem>
            {({ focus }) => (
                <button
                    type="button"
                    onClick={onClick}
                    className={cn(
                        'flex w-full items-center rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-left transition-colors duration-150 cursor-pointer focus:outline-none',
                        focus 
                            ? 'bg-primary text-white dark:bg-primary/20 dark:text-red-400' 
                            : 'text-foreground hover:bg-muted/5',
                        className
                    )}
                    {...props}
                >
                    {children}
                </button>
            )}
        </MenuItem>
    );
}

export function DropdownMenuLabel({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'px-3 py-2 text-[10px] font-bold text-muted uppercase tracking-widest',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function DropdownMenuSeparator({ className = '', ...props }) {
    return (
        <div
            className={cn('-mx-1.5 my-1.5 h-px bg-border/60', className)}
            {...props}
        />
    );
}
