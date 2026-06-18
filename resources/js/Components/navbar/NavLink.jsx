import { Link } from '@inertiajs/react';
import React from 'react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#E8192C] text-slate-900 dark:text-white focus:border-[#FF3347] dark:border-[#E8192C] dark:focus:border-[#FF3347]'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 focus:border-slate-300 focus:text-slate-700 dark:text-zinc-400 dark:hover:border-zinc-800 dark:hover:text-zinc-200 dark:focus:border-zinc-800 dark:focus:text-zinc-200') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
