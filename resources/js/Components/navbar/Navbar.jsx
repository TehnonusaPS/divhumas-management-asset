import { Link } from '@inertiajs/react';

export default function Navbar({ auth, theme, toggleTheme, items }) {
    const hasRoute = (name) => {
        if (typeof route === 'undefined') return false;
        try {
            if (typeof route().has === 'function') {
                return route().has(name);
            }
            route(name);
            return true;
        } catch (e) {
            return false;
        }
    };

    const getHref = (item) => {
        if (item.href) return item.href;
        if (item.route && typeof route !== 'undefined') {
            try {
                return route(item.route);
            } catch (e) {
                return '#';
            }
        }
        return '#';
    };

    const getIsActive = (item) => {
        if (item.active !== undefined) return item.active;
        if (item.activeCondition !== undefined) return item.activeCondition;
        if (item.route && typeof route !== 'undefined') {
            try {
                return route().current(item.route);
            } catch (e) {
                return false;
            }
        }
        return false;
    };

    const defaultItems = [
        { label: 'Beranda', route: 'dashboard' },
        { 
            label: 'Aset', 
            activeCondition: typeof route !== 'undefined' && (route().current('aset') || route().current('aset.pencarian')),
            children: [
                { label: 'Ringkasan Aset', route: 'aset' },
                { label: 'Daftar & Pencarian Aset', route: 'aset.pencarian' }
            ]
        },
        ...((auth?.user?.roles?.includes('pimpinan') || auth?.user?.roles?.includes('super-admin')) 
            ? [{ 
                label: 'Manajemen', 
                activeCondition: typeof route !== 'undefined' && (route().current('statistik') || route().current('pengguna') || route().current('dev.components')),
                children: [
                    ...((auth?.user?.roles?.includes('pimpinan') || auth?.user?.roles?.includes('super-admin')) 
                        ? [{ label: 'Dashboard & Statistik', route: 'statistik' }] 
                        : []),
                    ...(auth?.user?.roles?.includes('super-admin') 
                        ? [{ label: 'Manajemen Pengguna', route: 'pengguna' }] 
                        : []),
                    ...(auth?.user?.roles?.includes('super-admin') && hasRoute('dev.components')
                        ? [{ label: 'Dev Showcase', route: 'dev.components' }]
                        : [])
                ]
              }] 
            : []),
        { label: 'Riwayat & Pengaduan', route: 'pengaduan' }
    ];

    const resolvedItems = items || defaultItems;

    return (
        <nav className="sticky top-0 z-50 w-full bg-cover bg-[5%_-20px] bg-no-repeat border-b border-slate-200 dark:border-red-500/10 transition-all duration-300" style={{ backgroundImage: `url('/images/BG_Header.png')` }}>
            {/* Primary gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/60 dark:from-[#0A0A0A]/90 dark:via-black/60 dark:to-black/30 backdrop-blur-[1px] transition-colors duration-300 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex items-center justify-between py-3.5">
                {/* Brand */}
                <Link href={typeof route !== 'undefined' ? route('dashboard') : '#'} className="flex items-center gap-3 group">
                    <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="h-9 w-auto filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-slate-900 dark:text-white font-bold tracking-widest text-xl drop-shadow-sm dark:drop-shadow-none group-hover:text-slate-700 dark:group-hover:text-gray-100 transition-colors">SARANA</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold">
                    {resolvedItems.map((item, idx) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isActive = getIsActive(item);
                        
                        if (hasChildren) {
                            return (
                                <div key={idx} className="relative group cursor-pointer py-2">
                                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-white hover:text-slate-950 dark:hover:text-slate-200 transition text-sm drop-shadow-md dark:drop-shadow-none font-semibold">
                                        {item.label}
                                        <svg className="w-3.5 h-3.5 text-slate-600 dark:text-white/80 mt-0.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                    </div>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                                        <div className="rounded-xl shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-hidden py-2">
                                            {item.children.map((child, cIdx) => {
                                                const childHref = getHref(child);
                                                const isChildActive = getIsActive(child);
                                                return (
                                                    <Link 
                                                        key={cIdx} 
                                                        href={childHref} 
                                                        className={`block px-5 py-2.5 text-sm transition-colors font-semibold ${isChildActive ? 'text-[#E8192C] bg-slate-100/50 dark:bg-slate-700/50' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#E8192C]'}`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        const href = getHref(item);
                        return (
                            <Link 
                                key={idx} 
                                href={href} 
                                className="group relative text-slate-800 dark:text-white hover:text-slate-950 dark:hover:text-slate-200 transition text-sm drop-shadow-md dark:drop-shadow-none py-2 whitespace-nowrap font-semibold"
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    {toggleTheme && (
                        <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all duration-300 hover:scale-110 cursor-pointer">
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                    )}
                    <button className="p-2 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all duration-300 hover:scale-110 relative cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E8192C] text-[8px] font-bold text-white border-2 border-white dark:border-[#0A0A0A] shadow-sm animate-pulse">1</span>
                    </button>
                    <div className="relative group cursor-pointer py-2">
                        <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#60A5FA] to-[#1E3A8A] overflow-hidden border-2 border-slate-300 dark:border-white/40 shadow-[0_0_12px_rgba(37,99,235,0.3)] dark:shadow-[0_0_12px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] dark:group-hover:shadow-[0_0_20px_rgba(37,99,235,0.8)] transition-all duration-300 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white mt-1.5 opacity-90" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-white drop-shadow-md dark:drop-shadow-none">
                                {auth?.user?.name || 'Nama Pengguna'}
                                <svg className="w-3.5 h-3.5 text-slate-600 dark:text-white/80 mt-0.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                            <div className="rounded-xl shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-hidden py-2">
                                <Link href={typeof route !== 'undefined' && route.has && route.has('profile.edit') ? route('profile.edit') : '#'} className="block px-5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#E8192C] transition-colors font-semibold">Profile</Link>
                                <Link href={typeof route !== 'undefined' && route.has && route.has('logout') ? route('logout') : '#'} method="post" as="button" className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#E8192C] transition-colors font-semibold">Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
