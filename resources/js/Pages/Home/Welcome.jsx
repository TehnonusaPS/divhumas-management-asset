import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { usePWA } from '@/Hooks/usePWA';

// ─── Auth-aware CTA buttons ───────────────────────────────────────────────────

function HeroActions() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const { isInstallable, isInstalled, installPWA } = usePWA();

    if (user) {
        return (
            <Link
                href="/dashboard"
                className="flex-1 min-w-[180px] max-sm:w-full py-3.5 px-7 rounded-lg text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-[#E8192C] to-[#8B0000] shadow-[0_4px_30px_rgba(232,25,44,0.3)] hover:from-red-500 hover:to-red-700 hover:shadow-[0_8px_40px_rgba(232,25,44,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none flex items-center justify-center gap-2 group"
            >
                Buka Dashboard
                <svg className="w-4 h-4 stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        );
    }

    return (
        <>
            <Link
                href="/login"
                className="flex-1 min-w-[180px] max-sm:w-full py-3.5 px-7 rounded-lg text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-[#E8192C] to-[#8B0000] shadow-[0_4px_30px_rgba(232,25,44,0.3)] hover:from-red-500 hover:to-red-700 hover:shadow-[0_8px_40px_rgba(232,25,44,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none flex items-center justify-center gap-2 group"
            >
                Masuk ke Sistem
                <svg className="w-4 h-4 stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
            
            {isInstalled ? (
                <div className="flex-1 min-w-[180px] max-sm:w-full py-3.5 px-7 rounded-lg text-sm font-semibold tracking-wider text-green-400 bg-green-500/10 border border-green-500/25 flex items-center justify-center gap-2 select-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Aplikasi Terinstal
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
                    className="flex-1 min-w-[180px] max-sm:w-full py-3.5 px-7 rounded-lg text-sm font-medium tracking-wider text-white/90 bg-white/5 border border-white/15 backdrop-blur-md hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none flex items-center justify-center gap-2"
                >
                    <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Install App
                </button>
            )}
        </>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Welcome() {
    const particlesRef = useRef(null);

    useEffect(() => {
        const container = particlesRef.current;
        if (!container) return;
        const count = 18;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 5 + 2;
            p.style.cssText = `
                width:${size}px; height:${size}px;
                left:${Math.random() * 100}%;
                animation-duration:${Math.random() * 14 + 10}s;
                animation-delay:${Math.random() * -20}s;
                opacity: 0;
            `;
            container.appendChild(p);
        }
        return () => { container.innerHTML = ''; };
    }, []);

    return (
        <AppLayout simple={true}>
            <Head title="Beranda" />

            {/* Fixed background layers */}
            <div className="bg-scene" />
            <div className="grid-overlay" />
            <div className="particles" ref={particlesRef} />

            {/* Hero section */}
            <section className="relative flex flex-col items-center justify-center flex-grow pt-24 pb-16 px-3 sm:px-6 md:px-8 sm:py-20 md:py-24 text-center overflow-hidden z-10">
                <div className="hero-ring" />

                {/* Dual logos — larger than auth pages */}
                <div className="flex items-center justify-center gap-4 sm:gap-10 mb-6 sm:mb-8 z-10">
                    <div className="relative flex flex-col items-center gap-2 animate-[fadeInUp_0.8s_ease_both]" style={{ animationDelay: '100ms' }}>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute -inset-5 rounded-full bg-yellow-500/5 blur-xl animate-pulse" />
                            <img src="/images/logo-polri.png" alt="Logo Polri" className="relative h-[55px] sm:h-[90px] lg:h-[110px] w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300" />
                        </div>
                        <span className="text-[9px] md:text-xs font-semibold tracking-widest uppercase text-zinc-400">Polri</span>
                    </div>

                    <div className="w-[1px] h-[35px] sm:h-[60px] lg:h-[70px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent relative after:content-[''] after:absolute after:w-[4px] after:h-[4px] after:bg-[#E8192C] after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:shadow-[0_0_8px_#E8192C]" />

                    <div className="relative flex flex-col items-center gap-2 animate-[fadeInUp_0.8s_ease_both]" style={{ animationDelay: '100ms' }}>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute -inset-5 rounded-full bg-red-500/5 blur-xl animate-pulse" />
                            <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="relative h-[55px] sm:h-[90px] lg:h-[110px] w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300" />
                        </div>
                        <span className="text-[9px] md:text-xs font-semibold tracking-widest uppercase text-zinc-400">Divhumas Polri</span>
                    </div>
                </div>

                {/* Glassmorphic hero card */}
                <div className="w-full max-w-[680px] bg-[#0A0A0A]/55 backdrop-blur-[25px] border border-white/5 rounded-2xl px-4 py-7 sm:p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] mt-2.5 flex flex-col items-center z-10 transition-all duration-300 animate-[fadeInUp_0.8s_ease_0.2s_both]">

                    <p className="text-[9px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#E8192C] mb-3.5 flex items-center justify-center gap-2.5 before:content-[''] before:hidden sm:before:block before:w-[25px] md:before:w-[40px] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:to-[#E8192C] after:content-[''] after:hidden sm:after:block after:w-[25px] md:after:w-[40px] after:h-[1px] after:bg-gradient-to-r after:from-[#E8192C] after:to-transparent">
                        Kepolisian Negara Republik Indonesia
                    </p>

                    <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white mb-4">
                        Sistem Manajemen Aset<br />
                        <span className="bg-gradient-to-r from-red-500 to-[#D4AF37] bg-clip-text text-transparent">Divhumas Polri</span>
                    </h1>

                    <p className="text-sm md:text-base text-zinc-400 max-w-[560px] leading-relaxed mb-8">
                        Platform terpadu untuk pengelolaan dan pemantauan aset Divisi Hubungan Masyarakat
                        Kepolisian Negara Republik Indonesia secara efisien, transparan, dan akuntabel.
                    </p>

                    <div className="flex items-center gap-3.5 justify-center w-full max-w-[480px] mb-7 max-sm:flex-col">
                        <HeroActions />
                    </div>

                    {/* Stats bar */}
                    <div className="w-full grid grid-cols-3 gap-[1px] bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                        {[
                            { value: '100%', label: 'Akuntabel' },
                            { value: '24/7',  label: 'Monitoring' },
                            { value: 'Real-time', label: 'Data Terkini' },
                        ].map(({ value, label }) => (
                            <div key={label} className="py-3 px-2 sm:px-4 text-center bg-[#0A0A0A]/40 hover:bg-red-500/[0.08] transition-colors duration-200">
                                <div className="font-serif text-sm xs:text-base sm:text-lg md:text-2xl font-bold text-white mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span className="bg-gradient-to-r from-red-500 to-[#D4AF37] bg-clip-text text-transparent">{value}</span>
                                </div>
                                <div className="text-[9px] sm:text-xs font-medium text-zinc-400 tracking-wider uppercase whitespace-nowrap">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}