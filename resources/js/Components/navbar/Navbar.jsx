import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Navbar({ auth, theme, toggleTheme }) {
    return (
        <nav 
            className="sticky top-0 z-50 w-full bg-cover bg-no-repeat border-b border-border transition-colors duration-300"
            style={{ backgroundImage: "url('/images/BG_Header.png')", backgroundPosition: "top center" }}
        >
            {/* Primary gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-[1px] z-0"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    
                    {/* Brand / Logo */}
                    <div className="flex items-center">
                        <Link href={route('dashboard')} className="flex items-center gap-3 group">
                            <img 
                                src="/images/logo-divhumas.png" 
                                alt="Logo Divhumas Polri" 
                                className="h-9 w-auto filter drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
                            />
                            <span className="text-slate-900 dark:text-white font-bold tracking-widest text-xl drop-shadow-sm group-hover:text-slate-700 dark:group-hover:text-zinc-200 transition-colors">
                                SARANA
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Desktop */}
                    <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 font-medium">
                        <Link 
                            href={route('dashboard')} 
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                                route().current('dashboard') 
                                    ? 'text-[#E8192C] dark:text-white font-semibold' 
                                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                            }`}
                        >
                            Beranda
                            {route().current('dashboard') && (
                                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]"></span>
                            )}
                        </Link>

                        <Link 
                            href={route('aset')} 
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                                route().current('aset') && !route().current('aset.pencarian')
                                    ? 'text-[#E8192C] dark:text-white font-semibold' 
                                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                            }`}
                        >
                            Aset
                            {route().current('aset') && !route().current('aset.pencarian') && (
                                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]"></span>
                            )}
                        </Link>

                        <Link 
                            href={route('aset.pencarian')} 
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                                route().current('aset.pencarian')
                                    ? 'text-[#E8192C] dark:text-white font-semibold' 
                                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                            }`}
                        >
                            Daftar & Pencarian
                            {route().current('aset.pencarian') && (
                                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]"></span>
                            )}
                        </Link>

                        <Link 
                            href={route('pengaduan')} 
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                                route().current('pengaduan')
                                    ? 'text-[#E8192C] dark:text-white font-semibold' 
                                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                            }`}
                        >
                            Riwayat & Pengaduan
                            {route().current('pengaduan') && (
                                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]"></span>
                            )}
                        </Link>

                        {(auth?.user?.roles?.includes('pimpinan') || auth?.user?.roles?.includes('super-admin')) && (
                            <Link 
                                href={route('statistik')} 
                                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                                    route().current('statistik')
                                        ? 'text-[#E8192C] dark:text-white font-semibold' 
                                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                                }`}
                            >
                                Statistik
                                {route().current('statistik') && (
                                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]"></span>
                                )}
                            </Link>
                        )}

                        {auth?.user?.roles?.includes('super-admin') && (
                            <Link 
                                href={route('pengguna')} 
                                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 relative whitespace-nowrap ${
                                    route().current('pengguna')
                                        ? 'text-[#E8192C] dark:text-white font-semibold' 
                                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                                }`}
                            >
                                Manajemen Pengguna
                                {route().current('pengguna') && (
                                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]"></span>
                                )}
                            </Link>
                        )}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4">
                        
                        {/* Theme Toggle Switcher */}
                        {toggleTheme && (
                            <button 
                                onClick={toggleTheme} 
                                className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50 transition-all duration-200"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                        )}

                        {/* Notification Bell */}
                        <button 
                            className="p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50 transition-all duration-200 relative"
                            aria-label="Notifications"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#E8192C] ring-2 ring-white dark:ring-[#0A0A0A] animate-pulse" />
                        </button>

                        {/* User Profile Dropdown Menu */}
                        <div className="relative group cursor-pointer py-1">
                            <div className="flex items-center gap-2">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-400 to-blue-800 overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white mt-1.5 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div className="hidden sm:flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-zinc-200">
                                    {auth?.user?.name || 'Nama Pengguna'}
                                    <svg className="w-4 h-4 text-slate-400 mt-0.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Dropdown Box */}
                            <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-border/60 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
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
                    </div>

                </div>
            </div>
        </nav>
    );
}
