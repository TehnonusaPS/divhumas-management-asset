import { Link } from '@inertiajs/react';
import React from 'react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[#E8192C] bg-red-50 dark:bg-red-950/20 text-[#E8192C] dark:text-white focus:border-[#FF3347] focus:bg-red-100 dark:focus:bg-red-950/30 dark:border-[#E8192C]'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 focus:border-slate-300 focus:bg-slate-50 focus:text-slate-700 dark:text-zinc-400 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200 dark:focus:border-zinc-800 dark:focus:bg-zinc-900/50 dark:focus:text-zinc-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
