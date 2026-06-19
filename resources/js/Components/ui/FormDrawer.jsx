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
import Button from '@/Components/ui/Button';
import { cn } from '@/lib/utils';

export default function FormDrawer({
    open = false,
    onClose,
    title = '',
    description = '',
    onSubmit,
    loading = false,
    submitText = 'Simpan',
    cancelText = 'Batal',
    side = 'right',
    children,
    className = '',
    ...props
}) {
    const sideStyles = {
        left: 'inset-y-0 left-0 h-full w-full sm:w-[640px] sm:max-w-[90vw] border-r',
        right: 'inset-y-0 right-0 h-full w-full sm:w-[640px] sm:max-w-[90vw] border-l',
    };

    const sideTransitions = {
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

    const handleClose = () => {
        if (!loading) onClose?.();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <Transition show={open} as={Fragment}>
            <HeadlessDialog as="div" className="relative z-50" onClose={handleClose}>
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

                {/* Panel */}
                <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className={cn(
                            'pointer-events-none fixed flex max-w-full',
                            side === 'left' ? 'inset-y-0 left-0' : 'inset-y-0 right-0'
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
                                        'pointer-events-auto w-screen bg-card text-card-foreground shadow-2xl border-border transition-all flex flex-col',
                                        sideStyles[side],
                                        className
                                    )}
                                    {...props}
                                >
                                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                                        {/* Close Button */}
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            disabled={loading}
                                            className="absolute right-4 top-4 rounded-lg opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed z-10"
                                        >
                                            <XMarkIcon className="h-5 w-5 text-foreground" />
                                            <span className="sr-only">Close</span>
                                        </button>

                                        {/* Header */}
                                        {(title || description) && (
                                            <div className="flex flex-col space-y-1.5 text-left border-b border-border/40 p-6 pb-4">
                                                {title && (
                                                    <HeadlessDialogTitle className="text-lg font-bold leading-none tracking-tight text-foreground pr-8">
                                                        {title}
                                                    </HeadlessDialogTitle>
                                                )}
                                                {description && (
                                                    <HeadlessDialogDescription className="text-xs text-muted leading-relaxed mt-2">
                                                        {description}
                                                    </HeadlessDialogDescription>
                                                )}
                                            </div>
                                        )}

                                        {/* Body (Scrollable) */}
                                        <div className="flex-1 p-6 overflow-y-auto">
                                            {children}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-border/40 p-6 pt-4 mt-auto bg-background/20">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleClose}
                                                disabled={loading}
                                                className="w-full sm:w-auto"
                                            >
                                                {cancelText}
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="sm"
                                                disabled={loading}
                                                className="w-full sm:w-auto"
                                            >
                                                {loading && (
                                                    <svg className="animate-spin h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                )}
                                                {loading ? 'Menyimpan...' : submitText}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </HeadlessDialog>
        </Transition>
    );
}
