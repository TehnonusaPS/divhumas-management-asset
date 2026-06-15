import { Link } from '@inertiajs/react';

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
                    ? 'border-[#E8192C] bg-red-950/20 text-white focus:border-[#FF3347] focus:bg-red-950/30 focus:text-white dark:border-[#E8192C] dark:bg-red-950/20 dark:text-white dark:focus:border-[#FF3347]'
                    : 'border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/50 hover:text-zinc-200 focus:border-zinc-800 focus:bg-zinc-900/50 focus:text-zinc-200 dark:text-zinc-400 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
