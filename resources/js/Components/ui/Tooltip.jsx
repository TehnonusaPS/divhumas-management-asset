import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Tooltip({
    children,
    content,
    position = 'top',
    className = '',
    ...props
}) {
    const [visible, setVisible] = useState(false);

    const positions = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrows = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-800',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-800',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-800',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-800',
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            {...props}
        >
            {children}
            {visible && content && (
                <div
                    className={cn(
                        'absolute z-[9999] px-2.5 py-1.5 text-[10px] tracking-wide uppercase font-bold text-white bg-slate-900 rounded-lg shadow-md whitespace-nowrap dark:bg-slate-800 dark:text-slate-100 transition-opacity duration-200 border border-slate-700/50 pointer-events-none animate-in fade-in zoom-in-95 duration-100',
                        positions[position],
                        className
                    )}
                >
                    {content}
                    {/* Small arrow */}
                    <div
                        className={cn(
                            'absolute border-4 border-transparent',
                            arrows[position]
                        )}
                    />
                </div>
            )}
        </div>
    );
}
