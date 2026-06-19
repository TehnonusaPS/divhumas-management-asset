import { Link } from '@inertiajs/react';
import { usePWA } from '@/Hooks/usePWA';
import { Fragment } from 'react';

export default function Footer({ links }) {
    const { isInstallable, isInstalled, installPWA } = usePWA();
    return (
        <footer className="text-slate-800 dark:text-white pt-6 pb-3 relative overflow-hidden bg-cover bg-center bg-no-repeat shadow-[inset_0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_20px_50px_rgba(0,0,0,0.6)] mt-auto transition-colors duration-300" style={{ backgroundImage: `url('/images/BG_Footer.png')` }}>
            {/* Dark gradient overlay for a polished premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-100/90 to-slate-200/50 dark:from-[#0A0A0A] dark:via-black/80 dark:to-black/50 backdrop-blur-[1px] transition-colors duration-300"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Left Section */}
                <div className="flex flex-col gap-4 max-w-lg">
                    <Link href={route('dashboard')} className="flex items-center gap-4 group w-fit">
                        <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="h-10 w-auto filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" />
                        <span className="font-bold tracking-widest text-xl drop-shadow-md text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors">SARANA</span>
                    </Link>
                    
                    <div className="flex flex-col gap-1 text-[13px] text-slate-600 dark:text-gray-300 font-medium leading-relaxed drop-shadow-md border-l-[3px] border-[#E8192C] pl-4 py-0.5">
                        <p className="text-slate-900 dark:text-white font-semibold text-[15px] tracking-wide mb-1">Sistem Aset dan Sarana Prasarana</p>
                        <p className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Divisi Hubungan Masyarakat • Div Humas Polri</p>
                        <p className="mt-0.5">
                            Support: <a href="mailto:sarana-support@polri.go.id" className="text-slate-600 hover:text-[#E8192C] dark:text-gray-200 dark:hover:text-[#E8192C] transition-colors duration-300">sarana-support@polri.go.id</a> 
                            <span className="mx-2 opacity-50">•</span> 
                            Hotline: <span className="font-bold text-slate-900 dark:text-white tracking-wide">1500-699</span>
                        </p>
                    </div>
                </div>

                {/* Right Section - PWA Install */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-bold text-slate-800 dark:text-white tracking-wider uppercase drop-shadow-md">Aplikasi Mobile</span>
                    <div className="flex items-center gap-3">
                        {isInstalled ? (
                            <div className="flex items-center gap-3 bg-green-500/10 backdrop-blur-md border border-green-500/30 rounded-xl px-5 py-3 text-green-600 dark:text-green-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-bold tracking-wide leading-tight mt-0.5">PWA Terinstal</span>
                                </div>
                            </div>
                        ) : isInstallable ? (
                            <button onClick={installPWA} className="flex items-center gap-3 bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 rounded-xl px-5 py-2.5 hover:from-[#E8192C] hover:to-[#C0172A] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(232,25,44,0.3)] hover:ring-2 hover:ring-[#E8192C]/50 transition-all duration-300 group cursor-pointer">
                                <svg className="w-6 h-6 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-[10px] font-medium tracking-wide leading-none text-white/70 group-hover:text-white transition-colors">Dapatkan akses cepat</span>
                                    <span className="text-sm font-bold tracking-wide leading-tight text-white mt-0.5">Install App (PWA)</span>
                                </div>
                            </button>
                        ) : (
                            <div className="flex items-center gap-3 bg-slate-200/50 dark:bg-black/60 backdrop-blur-md border border-slate-300 dark:border-white/10 rounded-xl px-5 py-2.5 transition-colors duration-300">
                                <svg className="w-6 h-6 text-slate-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-[10px] font-medium tracking-wide leading-none text-slate-500 dark:text-gray-400">Buka di Browser Mobile</span>
                                    <span className="text-sm font-bold tracking-wide leading-tight text-slate-800 dark:text-white mt-0.5">Untuk Install App</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Copyright & Links */}
            <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/10 relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300">
                <span className="text-[12px] text-slate-500 dark:text-gray-400 font-medium tracking-wide drop-shadow-md">
                    &copy; 2025 Sarana Dev. All right reserved.
                </span>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-gray-400 font-medium">
                    {(links || [
                        { label: 'Kebijakan Privasi', href: '#' },
                        { label: 'Syarat & Ketentuan', href: '#' }
                    ]).map((link, idx) => (
                        <Fragment key={idx}>
                            {idx > 0 && <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-600"></span>}
                            <Link href={link.href || '#'} className="hover:text-slate-800 dark:hover:text-white transition-colors duration-300">
                                {link.label}
                            </Link>
                        </Fragment>
                    ))}
                </div>
            </div>
        </footer>
    );
}
