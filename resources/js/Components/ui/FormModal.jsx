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

export default function FormModal({
    open = false,
    onClose,
    title = '',
    description = '',
    onSubmit,
    loading = false,
    submitText = 'Simpan',
    cancelText = 'Batal',
    children,
    className = '',
    maxWidth = '2xl',
    ...props
}) {
    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth] || 'sm:max-w-lg';

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
                    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" />
                </TransitionChild>

                {/* Dialog Panel */}
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
                                    'relative transform overflow-hidden rounded-2xl bg-card border border-border text-left shadow-xl transition-all w-full sm:my-8',
                                    maxWidthClass,
                                    className
                                )}
                                {...props}
                            >
                                <form onSubmit={handleSubmit}>
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
                                        <div className="p-6 pb-0">
                                            <div className="flex flex-col space-y-1.5 text-center sm:text-left pr-8">
                                                {title && (
                                                    <HeadlessDialogTitle className="text-lg font-bold leading-none tracking-tight text-foreground">
                                                        {title}
                                                    </HeadlessDialogTitle>
                                                )}
                                                {description && (
                                                    <HeadlessDialogDescription className="text-xs text-muted leading-relaxed mt-2">
                                                        {description}
                                                    </HeadlessDialogDescription>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Body */}
                                    <div className="p-6">
                                        {children}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-border/40 px-6 py-4 bg-background/20">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleClose}
                                            disabled={loading}
                                        >
                                            {cancelText}
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="sm"
                                            disabled={loading}
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
            </HeadlessDialog>
        </Transition>
    );
}
