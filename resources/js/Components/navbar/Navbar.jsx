import { Link } from '@inertiajs/react';

export default function Navbar({ auth, theme, toggleTheme }) {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="relative z-10 flex items-center justify-between px-8 py-4">
                {/* Brand */}
                <Link href={route('dashboard')} className="flex items-center gap-3 group">
                    <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="h-9 w-auto filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300" />
                    <span className="text-white font-bold tracking-widest text-xl drop-shadow-md group-hover:text-gray-100 transition-colors">SARANA</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-medium">
                    <Link href={route('dashboard')} className="group relative text-white transition text-sm drop-shadow-md py-2 whitespace-nowrap">
                        Beranda
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${route().current('dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </Link>

                    <Link href={route('aset')} className="group relative text-white transition text-sm drop-shadow-md py-2 whitespace-nowrap">
                        Aset
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${route().current('aset') && !route().current('aset.pencarian') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </Link>

                    <Link href={route('aset.pencarian')} className="group relative text-white transition text-sm drop-shadow-md py-2 whitespace-nowrap">
                        Daftar & Pencarian Aset
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${route().current('aset.pencarian') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </Link>

                    <Link href={route('pengaduan')} className="group relative text-white transition text-sm drop-shadow-md py-2 whitespace-nowrap">
                        Riwayat & Pengaduan
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${route().current('pengaduan') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </Link>

                    {(auth?.user?.roles?.includes('pimpinan') || auth?.user?.roles?.includes('super-admin')) && (
                        <Link href={route('statistik')} className="group relative text-white transition text-sm drop-shadow-md py-2 whitespace-nowrap">
                            Dashboard & Statistik
                            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${route().current('statistik') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </Link>
                    )}

                    {auth?.user?.roles?.includes('super-admin') && (
                        <Link href={route('pengguna')} className="group relative text-white transition text-sm drop-shadow-md py-2 whitespace-nowrap">
                            Manajemen Pengguna
                            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#E8192C] transform origin-left transition-transform duration-300 ${route().current('pengguna') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </Link>
                    )}
                </nav>

                {/* User Section */}
                <div className="flex items-center gap-5">
                    {/* Theme Toggle */}
                    {toggleTheme && (
                        <button onClick={toggleTheme} className="relative text-white hover:text-slate-200 transition-colors drop-shadow-md hover:scale-110 transform duration-300">
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                    )}
                    <button className="relative text-white hover:text-slate-200 transition-colors drop-shadow-md hover:scale-110 transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E8192C] text-[8px] font-bold text-white border-2 border-[#1A1A1A] shadow-sm animate-pulse">1</span>
                    </button>
                    <div className="relative group cursor-pointer py-2">
                        <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#60A5FA] to-[#1E3A8A] overflow-hidden border-2 border-white/40 shadow-[0_0_12px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.8)] transition-all duration-300 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white mt-1.5 opacity-90" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-semibold text-white drop-shadow-md">
                                {auth?.user?.name || 'Nama Pengguna'}
                                <svg className="w-4 h-4 text-white/80 mt-0.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                            <div className="py-2">
                                <Link href={route('profile.edit')} className="block px-5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#E8192C] transition-colors font-medium">Profile</Link>
                                <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-[#E8192C] transition-colors font-medium">Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
