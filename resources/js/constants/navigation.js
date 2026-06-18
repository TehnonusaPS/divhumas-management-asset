/**
 * Navigation constants — single source of truth.
 * Used by Navbar, MobileBottomNav, and any other navigation component.
 * NOTE: No JSX here — this is a plain JS module.
 */

export const NAV_LINKS = [
    { label: 'Beranda', routeName: 'dashboard', excludeRoutes: [] },
    { label: 'Aset', routeName: 'aset', excludeRoutes: ['aset.pencarian'] },
    { label: 'Daftar & Pencarian', routeName: 'aset.pencarian', excludeRoutes: [] },
    { label: 'Riwayat & Pengaduan', routeName: 'pengaduan', excludeRoutes: [] },
];

/** Links only visible to pimpinan or super-admin */
export const NAV_LINKS_PIMPINAN = [
    { label: 'Statistik', routeName: 'statistik', excludeRoutes: [] },
];

/** Links only visible to super-admin */
export const NAV_LINKS_ADMIN = [
    { label: 'Manajemen Pengguna', routeName: 'pengguna', excludeRoutes: [] },
];

/**
 * Mobile bottom nav items — icons are defined separately in MobileBottomNav.jsx
 * to keep this file JSX-free.
 */
export const MOBILE_NAV_ITEMS = [
    { label: 'Beranda', routeName: 'dashboard', iconKey: 'home' },
    { label: 'Aset', routeName: 'aset', iconKey: 'box', excludeRoutes: ['aset.pencarian'] },
    { label: 'Pencarian', routeName: 'aset.pencarian', iconKey: 'search' },
    { label: 'Laporan', routeName: 'pengaduan', iconKey: 'report' },
];

export const MOBILE_NAV_ITEMS_PIMPINAN = [
    { label: 'Statistik', routeName: 'statistik', iconKey: 'chart' },
];

export const MOBILE_NAV_ITEMS_ADMIN = [
    { label: 'User', routeName: 'pengguna', iconKey: 'users' },
];
