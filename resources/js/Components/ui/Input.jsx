import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(function Input(
    { type = 'text', className = '', disabled = false, isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            type={type}
            disabled={disabled}
            ref={localRef}
            className={cn(
                'w-full px-4 py-2.5 rounded-xl border border-border bg-card/50 text-foreground placeholder:text-muted/60 text-sm transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        />
    );
});

export default Input;
