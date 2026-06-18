import { Link, usePage } from '@inertiajs/react';
import {
    MOBILE_NAV_ITEMS,
    MOBILE_NAV_ITEMS_PIMPINAN,
    MOBILE_NAV_ITEMS_ADMIN,
} from '@/constants/navigation';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS = {
    home: (
        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    box: (
        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
    ),
    search: (
        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    report: (
        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    chart: (
        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    users: (
        <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
};

// ─── Helper: determine active state ─────────────────────────────────────────

function isItemActive(item) {
    if (item.excludeRoutes?.length) {
        return route().current(item.routeName) &&
            !item.excludeRoutes.some((r) => route().current(r));
    }
    return route().current(item.routeName);
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * MobileBottomNav – PWA-style bottom navigation bar for small screens.
 * Reads auth from Inertia usePage() internally — no props needed.
 */
export default function MobileBottomNav() {
    const { auth } = usePage().props;
    const isPimpinan =
        auth?.user?.roles?.includes('pimpinan') ||
        auth?.user?.roles?.includes('super-admin');
    const isAdmin = auth?.user?.roles?.includes('super-admin');

    const items = [
        ...MOBILE_NAV_ITEMS,
        ...(isPimpinan ? MOBILE_NAV_ITEMS_PIMPINAN : []),
        ...(isAdmin ? MOBILE_NAV_ITEMS_ADMIN : []),
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0c] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
            <div className="flex justify-between items-center px-1 pt-2 pb-2 w-full">
                {items.map((item) => (
                    <Link
                        key={item.routeName}
                        href={route(item.routeName)}
                        className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${
                            isItemActive(item) ? 'text-[#E8192C]' : 'text-slate-400'
                        }`}
                    >
                        {ICONS[item.iconKey]}
                        <span className="text-[10px] font-medium leading-none">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
