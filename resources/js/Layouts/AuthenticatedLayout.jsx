import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen text-white relative overflow-x-hidden pb-24 lg:pb-12">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
                
                :root {
                    --red-deep:#8B0000;--red-mid:#C0172A;--red-bright:#E8192C;
                    --red-glow:#FF3347;--gold:#D4AF37;--gold-light:#F5D060;
                    --black:#0A0A0A;--black-mid:#111111;--black-soft:#1A1A1A;
                    --white:#FFFFFF;--white-soft:rgba(255,255,255,0.92);
                    --white-dim:rgba(255,255,255,0.60);--white-faint:rgba(255,255,255,0.15);
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background: var(--black);
                    color: var(--white);
                }

                .bg-scene{position:fixed;inset:0;z-index:0;
                    background:
                        radial-gradient(ellipse 80% 60% at 50% -10%,rgba(192,23,42,0.30) 0%,transparent 70%),
                        radial-gradient(ellipse 60% 40% at 80% 80%,rgba(139,0,0,0.15) 0%,transparent 65%),
                        radial-gradient(ellipse 50% 50% at 20% 90%,rgba(180,10,30,0.10) 0%,transparent 60%),
                        linear-gradient(180deg,#0A0A0A 0%,#100508 40%,#160306 100%);
                }
                .grid-overlay{position:fixed;inset:0;z-index:0;pointer-events:none;
                    background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);
                    background-size:60px 60px;
                }

                /* Custom Premium Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: var(--black);
                }
                ::-webkit-scrollbar-thumb {
                    background: var(--red-deep);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: var(--red-mid);
                }
            `}</style>

            {/* Backgrounds */}
            <div className="bg-scene" />
            <div className="grid-overlay" />

            <nav className="border-b border-red-950/30 bg-[#0a0a0a]/85 backdrop-blur-md sticky top-0 z-50 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-3">
                                    <img src="/images/logo-divhumas.png" alt="Logo" className="h-9 w-auto filter drop-shadow-[0_0_6px_rgba(232,25,44,0.4)]" />
                                    <div className="flex flex-col leading-none">
                                        <span className="font-extrabold text-xs tracking-wider text-white-soft">SISTEM ASET</span>
                                        <span className="text-[9px] font-bold text-[#E8192C] tracking-widest mt-0.5">DIVHUMAS POLRI</span>
                                    </div>
                                </Link>
                            </div>
 
                             <div className="hidden space-x-8 lg:-my-px lg:ms-10 lg:flex">
                                 <NavLink
                                     href={route('dashboard')}
                                     active={route().current('dashboard')}
                                 >
                                     Beranda
                                 </NavLink>
                                 <NavLink
                                     href={route('aset')}
                                     active={route().current('aset')}
                                 >
                                     Aset
                                 </NavLink>
                                 <NavLink
                                     href={route('aset.pencarian')}
                                     active={route().current('aset.pencarian')}
                                 >
                                     Daftar & Pencarian Aset
                                 </NavLink>
                                 <NavLink
                                     href={route('pengaduan')}
                                     active={route().current('pengaduan')}
                                 >
                                     Riwayat & Pengaduan
                                 </NavLink>
                                 {(user.roles?.includes('pimpinan') || user.roles?.includes('super-admin')) && (
                                     <NavLink
                                         href={route('statistik')}
                                         active={route().current('statistik')}
                                     >
                                         Dashboard & Statistik
                                     </NavLink>
                                 )}
                                 {user.roles?.includes('super-admin') && (
                                     <NavLink
                                         href={route('pengguna')}
                                         active={route().current('pengguna')}
                                     >
                                         Manajemen Pengguna
                                     </NavLink>
                                 )}
                             </div>
                         </div>
 
                         <div className="flex ms-4 items-center">
                             <div className="relative">
                                 <Dropdown>
                                     <Dropdown.Trigger>
                                         <span className="inline-flex rounded-md">
                                             <button
                                                 type="button"
                                                 className="inline-flex items-center rounded-xl border border-red-950/40 bg-black/50 hover:bg-[#1a1a1a] hover:border-red-500/20 px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white transition gap-1.5"
                                             >
                                                 <svg className="h-4 w-4 text-zinc-400 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                 </svg>
                                                 <span className="hidden lg:inline">{user.name}</span>
 
                                                 <svg
                                                     className="-me-0.5 ms-1 h-4 w-4"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20"
                                                     fill="currentColor"
                                                 >
                                                     <path
                                                         fillRule="evenodd"
                                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                         clipRule="evenodd"
                                                     />
                                                 </svg>
                                             </button>
                                         </span>
                                     </Dropdown.Trigger>
 
                                     <Dropdown.Content contentClasses="py-1 bg-[#111] border border-red-950/40 text-white shadow-xl">
                                         <Dropdown.Link
                                             href={route('profile.edit')}
                                             className="hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] text-gray-300 hover:text-white"
                                         >
                                             Profile
                                         </Dropdown.Link>
                                         <Dropdown.Link
                                             href={route('logout')}
                                             method="post"
                                             as="button"
                                             className="hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] text-gray-300 hover:text-white w-full text-start"
                                         >
                                             Log Out
                                         </Dropdown.Link>
                                     </Dropdown.Content>
                                 </Dropdown>
                             </div>
                         </div>
                    </div>
                </div>
            </nav>
 
            {header && (
                <header className="relative z-10 border-b border-red-950/20 bg-black/30 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}
 
            <main className="relative z-10">{children}</main>

            {/* Fixed Bottom Navigation for Mobile & Tablet viewports */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-t border-red-950/30 lg:hidden px-2 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-around max-w-xl mx-auto">
                    <Link 
                        href={route('dashboard')} 
                        className={`flex flex-col items-center justify-center py-1 transition-all ${
                            route().current('dashboard') 
                                ? 'text-[#E8192C] drop-shadow-[0_0_8px_rgba(232,25,44,0.4)]' 
                                : 'text-zinc-500 hover:text-zinc-350'
                        }`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-[9px] font-bold mt-1">Beranda</span>
                    </Link>

                    <Link 
                        href={route('aset')} 
                        className={`flex flex-col items-center justify-center py-1 transition-all ${
                            route().current('aset') 
                                ? 'text-[#E8192C] drop-shadow-[0_0_8px_rgba(232,25,44,0.4)]' 
                                : 'text-zinc-500 hover:text-zinc-350'
                        }`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-[9px] font-bold mt-1">Aset</span>
                    </Link>

                    <Link 
                        href={route('aset.pencarian')} 
                        className={`flex flex-col items-center justify-center py-1 transition-all ${
                            route().current('aset.pencarian') 
                                ? 'text-[#E8192C] drop-shadow-[0_0_8px_rgba(232,25,44,0.4)]' 
                                : 'text-zinc-500 hover:text-zinc-355'
                        }`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-[9px] font-bold mt-1">Pencarian</span>
                    </Link>

                    <Link 
                        href={route('pengaduan')} 
                        className={`flex flex-col items-center justify-center py-1 transition-all ${
                            route().current('pengaduan') 
                                ? 'text-[#E8192C] drop-shadow-[0_0_8px_rgba(232,25,44,0.4)]' 
                                : 'text-zinc-500 hover:text-zinc-350'
                        }`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-[9px] font-bold mt-1">Laporan</span>
                    </Link>

                    {(user.roles?.includes('pimpinan') || user.roles?.includes('super-admin')) && (
                        <Link 
                            href={route('statistik')} 
                            className={`flex flex-col items-center justify-center py-1 transition-all ${
                                route().current('statistik') 
                                    ? 'text-[#E8192C] drop-shadow-[0_0_8px_rgba(232,25,44,0.4)]' 
                                    : 'text-zinc-500 hover:text-zinc-350'
                            }`}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="text-[9px] font-bold mt-1">Statistik</span>
                        </Link>
                    )}

                    {user.roles?.includes('super-admin') && (
                        <Link 
                            href={route('pengguna')} 
                            className={`flex flex-col items-center justify-center py-1 transition-all ${
                                route().current('pengguna') 
                                    ? 'text-[#E8192C] drop-shadow-[0_0_8px_rgba(232,25,44,0.4)]' 
                                    : 'text-zinc-500 hover:text-zinc-350'
                            }`}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-[9px] font-bold mt-1">User</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
