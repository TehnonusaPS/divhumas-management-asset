import { Link } from '@inertiajs/react';
import { usePWA } from '@/Hooks/usePWA';

export default function Footer({ plain = false }) {
    const { isInstallable, isInstalled, installPWA } = usePWA();
    return (
        <footer
            className={`text-white pt-4 pb-2.5 relative overflow-hidden mt-auto ${
                plain
                    ? 'border-t border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md'
                    : 'bg-cover bg-no-repeat shadow-[inset_0_12px_30px_rgba(0,0,0,0.5)]'
            }`}
            style={!plain ? { backgroundImage: `url('/images/BG_Footer.png')`, backgroundPosition: 'center 60%' } : {}}
        >
            {/* Dark gradient overlay for a polished premium look */}
            {!plain && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/85 to-black/60 backdrop-blur-[1px]"></div>
            )}
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left Section (Compact Horizontal Layout) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 max-w-2xl w-full md:w-auto">
                    <Link href={route('dashboard')} className="flex items-center gap-3 group shrink-0">
                        <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="h-8 w-auto filter drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] group-hover:scale-105 group-hover:brightness-110 transition-all duration-300" />
                        <span className="font-bold tracking-widest text-lg drop-shadow-md text-white group-hover:text-gray-200 transition-colors">SARANA</span>
                    </Link>
                    
                    <div className="flex flex-col text-[12px] text-gray-300 font-medium leading-relaxed drop-shadow-md border-l-2 border-[#E8192C] pl-4">
                        <p className="text-white font-semibold text-[13px] tracking-wide">Sistem Aset dan Sarana Prasarana</p>
                        <p className="text-gray-400 hover:text-white transition-colors duration-300">Divisi Hubungan Masyarakat • Div Humas Polri</p>
                        <p className="text-gray-400 mt-0.5 text-[11px]">
                            Support: <a href="mailto:sarana-support@polri.go.id" className="text-gray-200 hover:text-[#E8192C] transition-colors duration-300">sarana-support@polri.go.id</a> 
                            <span className="mx-2 opacity-50">•</span> 
                            Hotline: <span className="font-semibold text-white">1500-699</span>
                        </p>
                    </div>
                </div>

                {/* Right Section - PWA Install (Only on non-welcome pages) */}
                {!plain && (
                    <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
                        {isInstalled ? (
                            <div className="flex items-center gap-2 bg-green-500/10 backdrop-blur-md border border-green-500/30 rounded-lg px-4 py-1.5 text-green-400">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                <span className="text-xs font-bold tracking-wide">PWA Terinstal</span>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    if (isInstallable) {
                                        installPWA();
                                    } else {
                                        alert(
                                            "Cara menginstal aplikasi SARANA:\n\n" +
                                            "• Browser Chrome/Edge/Firefox: Klik menu titik tiga di kanan atas browser, lalu pilih 'Instal Aplikasi' atau 'Tambahkan ke Layar Utama'.\n" +
                                            "• Browser Safari (iOS/macOS): Klik tombol 'Bagikan' (Share) di bagian bawah/atas layar, lalu pilih 'Tambahkan ke Layar Utama' (Add to Home Screen)."
                                        );
                                    }
                                }}
                                className="flex items-center gap-2 bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 rounded-lg px-4 py-1.5 hover:from-[#E8192C] hover:to-[#C0172A] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,25,44,0.25)] transition-all duration-300 group text-white"
                            >
                                <svg className="w-4.5 h-4.5 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                <span className="text-xs font-bold tracking-wide">Install PWA</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Copyright & Links */}
            <div className="mt-4 pt-2 border-t border-white/5 relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2.5">
                <span className="text-[11px] text-gray-500 font-medium tracking-wide">
                    &copy; 2025 Sarana Dev. All rights reserved.
                </span>
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-medium">
                    <Link href="#" className="hover:text-white transition-colors duration-300">Kebijakan Privasi</Link>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <Link href="#" className="hover:text-white transition-colors duration-300">Syarat & Ketentuan</Link>
                </div>
            </div>
        </footer>
    );
}
