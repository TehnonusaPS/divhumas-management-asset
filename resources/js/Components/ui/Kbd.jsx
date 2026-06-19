import React from 'react';
import { cn } from '@/lib/utils';

export default function Kbd({ className = '', children, ...props }) {
    return (
        <kbd
            className={cn(
                'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/80 bg-slate-100 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-bold text-muted-foreground uppercase shadow-[0_1px_0_0px_rgba(0,0,0,0.05)]',
                className
            )}
            {...props}
        >
            {children}
        </kbd>
    );
}
