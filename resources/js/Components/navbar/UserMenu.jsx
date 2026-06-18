import { Link } from '@inertiajs/react';

/**
 * UserMenu – profile avatar + hover dropdown for authenticated users.
 *
 * @param {object} user  - The authenticated user object
 */
export default function UserMenu({ user }) {
    return (
        <div className="relative group cursor-pointer py-1">
            {/* Avatar + Name trigger */}
            <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-400 to-blue-800 overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white mt-1.5 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-zinc-200">
                    {user?.name || 'Nama Pengguna'}
                    <svg
                        className="w-4 h-4 text-slate-400 mt-0.5 group-hover:rotate-180 transition-transform duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="py-1">
                    <Link
                        href={route('profile.edit')}
                        className="block px-4 py-2.5 text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors font-medium"
                    >
                        Profile
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors font-medium"
                    >
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    );
}
