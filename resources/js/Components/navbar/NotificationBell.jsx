/**
 * NotificationBell – icon button with animated badge.
 * Extracted from Navbar for a focused, single-responsibility component.
 */
export default function NotificationBell() {
    return (
        <button
            className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50 transition-all duration-200 relative"
            aria-label="Notifikasi"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
            </svg>
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#E8192C] ring-2 ring-white dark:ring-[#0A0A0A] animate-pulse" />
        </button>
    );
}
