import React, { Fragment } from 'react';
import { 
    Dialog as HeadlessDialog, 
    DialogPanel, 
    DialogTitle as HeadlessDialogTitle, 
    DialogDescription as HeadlessDialogDescription, 
    Transition, 
    TransitionChild 
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export function Sheet({ open, onClose, children }) {
    return (
        <Transition show={open} as={Fragment}>
            <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
                {children}
            </HeadlessDialog>
        </Transition>
    );
}

export function SheetContent({ className = '', side = 'right', children, ...props }) {
    const sideStyles = {
        top: 'inset-x-0 top-0 border-b h-auto max-h-[40vh]',
        bottom: 'inset-x-0 bottom-0 border-t h-auto max-h-[40vh]',
        left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r',
        right: 'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l',
    };

    const sideTransitions = {
        top: {
            enterFrom: '-translate-y-full',
            enterTo: 'translate-y-0',
            leaveFrom: 'translate-y-0',
            leaveTo: '-translate-y-full',
        },
        bottom: {
            enterFrom: 'translate-y-full',
            enterTo: 'translate-y-0',
            leaveFrom: 'translate-y-0',
            leaveTo: 'translate-y-full',
        },
        left: {
            enterFrom: '-translate-x-full',
            enterTo: 'translate-x-0',
            leaveFrom: 'translate-x-0',
            leaveTo: '-translate-x-full',
        },
        right: {
            enterFrom: 'translate-x-full',
            enterTo: 'translate-x-0',
            leaveFrom: 'translate-x-0',
            leaveTo: 'translate-x-full',
        },
    };

    const transitions = sideTransitions[side] || sideTransitions.right;

    return (
        <>
            {/* Backdrop */}
            <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" />
            </TransitionChild>

            {/* Panel Wrapper */}
            <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 overflow-hidden">
                    <div className={cn(
                        'pointer-events-none fixed flex max-w-full',
                        side === 'left' ? 'inset-y-0 left-0' : '',
                        side === 'right' ? 'inset-y-0 right-0' : '',
                        side === 'top' ? 'inset-x-0 top-0' : '',
                        side === 'bottom' ? 'inset-x-0 bottom-0' : ''
                    )}>
                        <TransitionChild
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom={transitions.enterFrom}
                            enterTo={transitions.enterTo}
                            leave="transform transition ease-in-out duration-300"
                            leaveFrom={transitions.leaveFrom}
                            leaveTo={transitions.leaveTo}
                        >
                            <DialogPanel
                                className={cn(
                                    'pointer-events-auto w-screen bg-card text-card-foreground p-6 shadow-2xl border-border transition-all flex flex-col',
                                    sideStyles[side],
                                    className
                                )}
                                {...props}
                            >
                                {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </>
    );
}

export function SheetClose({ className = '', onClick, ...props }) {
    return (
        <button
            type="button"
            className={cn(
                'absolute right-4 top-4 rounded-lg opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none cursor-pointer',
                className
            )}
            onClick={onClick}
            {...props}
        >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
        </button>
    );
}

export function SheetHeader({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'flex flex-col space-y-1.5 text-left border-b border-border/40 pb-4 mb-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SheetFooter({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-border/40 mt-auto pt-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SheetTitle({ className = '', children, ...props }) {
    return (
        <HeadlessDialogTitle
            className={cn(
                'text-lg font-bold leading-none tracking-tight text-foreground',
                className
            )}
            {...props}
        >
            {children}
        </HeadlessDialogTitle>
    );
}

export function SheetDescription({ className = '', children, ...props }) {
    return (
        <HeadlessDialogDescription
            className={cn('text-xs text-muted leading-relaxed mt-2', className)}
            {...props}
        >
            {children}
        </HeadlessDialogDescription>
    );
}

