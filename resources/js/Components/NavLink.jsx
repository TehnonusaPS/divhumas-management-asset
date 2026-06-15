import { Link } from '@inertiajs/react';

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
                    ? 'border-[#E8192C] text-white focus:border-[#FF3347] dark:border-[#E8192C] dark:text-white'
                    : 'border-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 focus:border-zinc-700 focus:text-zinc-200 dark:text-zinc-400 dark:hover:border-zinc-800 dark:hover:text-zinc-200') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
