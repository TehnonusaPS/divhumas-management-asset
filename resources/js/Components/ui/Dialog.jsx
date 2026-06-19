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

export function Dialog({ open, onClose, children }) {
    return (
        <Transition show={open} as={Fragment}>
            <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
                {children}
            </HeadlessDialog>
        </Transition>
    );
}

export function DialogContent({ className = '', children, ...props }) {
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
                <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" />
            </TransitionChild>

            {/* Dialog Panel Wrapper */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            className={cn(
                                'relative transform overflow-hidden rounded-2xl bg-card border border-border p-6 text-left shadow-xl transition-all w-full sm:my-8 sm:max-w-lg',
                                className
                            )}
                            {...props}
                        >
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </>
    );
}

export function DialogClose({ className = '', onClick, ...props }) {
    return (
        <button
            type="button"
            className={cn(
                'absolute right-4 top-4 rounded-lg opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer',
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

export function DialogHeader({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'flex flex-col space-y-1.5 text-center sm:text-left',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function DialogFooter({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-border/40 mt-6 pt-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function DialogTitle({ className = '', children, ...props }) {
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

export function DialogDescription({ className = '', children, ...props }) {
    return (
        <HeadlessDialogDescription
            className={cn('text-xs text-muted leading-relaxed mt-2', className)}
            {...props}
        >
            {children}
        </HeadlessDialogDescription>
    );
}
