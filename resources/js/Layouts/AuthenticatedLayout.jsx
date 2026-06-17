import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Theme state
    const [theme, setTheme] = useState(
        typeof window !== 'undefined' && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark'
    );

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-300 pb-16 md:pb-0">
            {/* Backgrounds */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#0A0A0A] dark:via-[#111111] dark:to-[#160306] transition-colors duration-300" />
            
            {/* Subtle grid pattern for texture */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-5 dark:opacity-[0.02]" 
                style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
            />



            {/* Premium Hero Section Wrapper */}
            <div className="relative z-10 bg-cover bg-center bg-no-repeat w-full" style={{ backgroundImage: `url('/images/BG_Header.png')` }}>
                {/* Primary gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-black/60 to-black/30 backdrop-blur-[1px]"></div>
                {/* Secondary gradient at the bottom to seamlessly blend into the dark red/black background of the page */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                
                {/* The Top Navigation Bar */}
                <Header auth={auth} theme={theme} toggleTheme={toggleTheme} />

                {/* The Page Title Area */}
                {header && (
                    <header className="relative z-20 pt-24 pb-16 md:pt-24 md:pb-12 border-b border-white/5">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
            </div>
 
            <main className="relative z-20 flex-grow">{children}</main>

            <Footer />

            {/* Mobile Bottom Navigation (PWA-like experience) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c0c] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-center px-1 pb-safe pt-2 pb-2 w-full">
                    <Link href={route('dashboard')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${route().current('dashboard') ? 'text-[#E8192C]' : 'text-slate-400'}`}>
                        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span className="text-[10px] font-medium leading-none">Beranda</span>
                    </Link>
                    
                    <Link href={route('aset')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${route().current('aset') && !route().current('aset.pencarian') ? 'text-[#E8192C]' : 'text-slate-400'}`}>
                        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path>
                        </svg>
                        <span className="text-[10px] font-medium leading-none">Aset</span>
                    </Link>

                    <Link href={route('aset.pencarian')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${route().current('aset.pencarian') ? 'text-[#E8192C]' : 'text-slate-400'}`}>
                        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span className="text-[10px] font-medium leading-none">Pencarian</span>
                    </Link>

                    <Link href={route('pengaduan')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${route().current('pengaduan') ? 'text-[#E8192C]' : 'text-slate-400'}`}>
                        <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span className="text-[10px] font-medium leading-none">Laporan</span>
                    </Link>

                    {(auth?.user?.roles?.includes('pimpinan') || auth?.user?.roles?.includes('super-admin')) && (
                        <Link href={route('statistik')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${route().current('statistik') ? 'text-[#E8192C]' : 'text-slate-400'}`}>
                            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            <span className="text-[10px] font-medium leading-none">Statistik</span>
                        </Link>
                    )}

                    {auth?.user?.roles?.includes('super-admin') && (
                        <Link href={route('pengguna')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-1 transition-colors ${route().current('pengguna') ? 'text-[#E8192C]' : 'text-slate-400'}`}>
                            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="text-[10px] font-medium leading-none">User</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
