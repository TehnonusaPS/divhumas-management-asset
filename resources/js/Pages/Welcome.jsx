import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function Welcome({ auth }) {
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
                width:${size}px;height:${size}px;
                left:${Math.random() * 100}%;
                animation-duration:${Math.random() * 14 + 10}s;
                animation-delay:${Math.random() * -20}s;
                opacity:0;
            `;
            container.appendChild(p);
        }
        return () => { container.innerHTML = ''; };
    }, []);

    return (
        <>
            <Head title="Beranda" />

            <style>{`
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                :root{
                    --red-deep:#8B0000;--red-mid:#C0172A;--red-bright:#E8192C;
                    --red-glow:#FF3347;--gold:#D4AF37;--gold-light:#F5D060;
                    --black:#0A0A0A;--black-mid:#111111;--black-soft:#1A1A1A;
                    --white:#FFFFFF;--white-soft:rgba(255,255,255,0.92);
                    --white-dim:rgba(255,255,255,0.60);--white-faint:rgba(255,255,255,0.15);
                }
                html{scroll-behavior:smooth}
                body{font-family:'Inter',sans-serif;background:var(--black);color:var(--white);overflow-x:hidden;min-height:100vh}
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

                .bg-scene{position:fixed;inset:0;z-index:0;
                    background:
                        radial-gradient(ellipse 80% 60% at 50% -10%,rgba(192,23,42,0.45) 0%,transparent 70%),
                        radial-gradient(ellipse 60% 40% at 80% 80%,rgba(139,0,0,0.30) 0%,transparent 65%),
                        radial-gradient(ellipse 50% 50% at 20% 90%,rgba(180,10,30,0.20) 0%,transparent 60%),
                        linear-gradient(180deg,#0A0A0A 0%,#100508 40%,#160306 100%);
                }
                .particles{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
                .particle{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(232,25,44,0.7),transparent);animation:floatUp linear infinite;opacity:0}
                @keyframes floatUp{0%{transform:translateY(100vh) scale(0);opacity:0}10%{opacity:0.6}90%{opacity:0.2}100%{transform:translateY(-20vh) scale(1.5);opacity:0}}
                .grid-overlay{position:fixed;inset:0;z-index:0;pointer-events:none;
                    background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
                    background-size:60px 60px;
                }
                .page-wrapper{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column}

                /* HEADER */
                header{position:fixed;top:0;left:0;right:0;z-index:100;padding:14px 40px;display:flex;align-items:center;justify-content:space-between;
                    background:rgba(10,10,10,0.75);backdrop-filter:blur(20px);border-bottom:1px solid rgba(232,25,44,0.20);transition:all 0.3s ease}
                .header-brand{display:flex;align-items:center;gap:12px}
                .header-brand img{height:38px;width:auto;filter:drop-shadow(0 0 8px rgba(232,25,44,0.5))}
                .header-title{font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--white-soft);line-height:1.3}
                .header-title span{display:block;color:var(--red-bright);font-size:0.65rem;font-weight:500;letter-spacing:0.15em}
                .header-nav{display:flex;align-items:center;gap:8px}
                .btn-nav{padding:8px 20px;border-radius:6px;font-size:0.85rem;font-weight:500;letter-spacing:0.03em;cursor:pointer;text-decoration:none;transition:all 0.25s ease;display:inline-flex;align-items:center;gap:6px}
                .btn-ghost{color:var(--white-dim);border:1px solid var(--white-faint);background:transparent}
                .btn-ghost:hover{color:var(--white);border-color:rgba(255,255,255,0.35);background:rgba(255,255,255,0.06)}
                .btn-primary-nav{color:var(--white);background:linear-gradient(135deg,var(--red-mid),var(--red-deep));border:1px solid rgba(232,25,44,0.40);box-shadow:0 0 20px rgba(232,25,44,0.25)}
                .btn-primary-nav:hover{background:linear-gradient(135deg,var(--red-bright),var(--red-mid));box-shadow:0 0 30px rgba(232,25,44,0.45);transform:translateY(-1px)}

                /* HERO */
                .hero{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 24px 80px;text-align:center;position:relative}
                .hero-ring{position:absolute;width:480px;height:480px;border-radius:50%;border:1px solid rgba(232,25,44,0.12);top:50%;left:50%;transform:translate(-50%,-50%);animation:rotateSlow 30s linear infinite;pointer-events:none}
                .hero-ring::after{content:'';position:absolute;width:560px;height:560px;border-radius:50%;border:1px dashed rgba(212,175,55,0.10);top:50%;left:50%;transform:translate(-50%,-50%)}
                @keyframes rotateSlow{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}

                .logos-row{display:flex;align-items:center;justify-content:center;gap:40px;margin-bottom:40px;position:relative}
                .logo-wrapper{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;animation:fadeInUp 0.8s ease both}
                .logo-wrapper:nth-child(1){animation-delay:0.1s}
                .logo-wrapper:nth-child(2){animation-delay:0.05s}
                .logo-wrapper:nth-child(3){animation-delay:0.1s}
                .logo-img-container{position:relative;display:flex;align-items:center;justify-content:center}
                .logo-glow{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(232,25,44,0.20) 0%,transparent 70%);animation:pulse 3s ease-in-out infinite}
                .logo-glow.gold{background:radial-gradient(circle,rgba(212,175,55,0.18) 0%,transparent 70%)}
                @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:0.7}}
                .logo-img{position:relative;height:130px;width:auto;object-fit:contain;filter:drop-shadow(0 4px 20px rgba(0,0,0,0.6));transition:transform 0.3s ease}
                .logo-img:hover{transform:scale(1.05)}
                .logo-label{font-size:0.65rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--white-dim)}
                .logo-divider{width:1px;height:80px;background:linear-gradient(to bottom,transparent,rgba(232,25,44,0.50),transparent);position:relative}
                .logo-divider::after{content:'';position:absolute;width:5px;height:5px;background:var(--red-bright);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px var(--red-bright)}

                .hero-eyebrow{font-size:0.7rem;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:var(--red-bright);margin-bottom:14px;animation:fadeInUp 0.7s ease 0.3s both;display:flex;align-items:center;justify-content:center;gap:10px}
                .hero-eyebrow::before,.hero-eyebrow::after{content:'';display:block;width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--red-bright))}
                .hero-eyebrow::after{background:linear-gradient(90deg,var(--red-bright),transparent)}
                .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,5vw,3.6rem);font-weight:800;line-height:1.15;letter-spacing:-0.01em;color:var(--white);margin-bottom:16px;animation:fadeInUp 0.7s ease 0.4s both}
                .hero-title .highlight{background:linear-gradient(135deg,var(--red-bright),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
                .hero-subtitle{font-size:clamp(0.9rem,2vw,1.05rem);font-weight:400;color:var(--white-dim);max-width:560px;line-height:1.7;margin:0 auto 36px;animation:fadeInUp 0.7s ease 0.5s both}
                .hero-actions{display:flex;align-items:center;gap:14px;justify-content:center;flex-wrap:wrap;animation:fadeInUp 0.7s ease 0.6s both}

                .btn-hero-primary{padding:14px 36px;border-radius:8px;font-size:0.95rem;font-weight:600;letter-spacing:0.03em;color:var(--white);background:linear-gradient(135deg,var(--red-bright),var(--red-deep));border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 30px rgba(232,25,44,0.40),0 0 0 1px rgba(232,25,44,0.25);transition:all 0.3s ease}
                .btn-hero-primary:hover{background:linear-gradient(135deg,var(--red-glow),var(--red-mid));box-shadow:0 8px 40px rgba(232,25,44,0.55),0 0 0 1px rgba(232,25,44,0.4);transform:translateY(-2px)}
                .btn-hero-secondary{padding:14px 36px;border-radius:8px;font-size:0.95rem;font-weight:500;color:var(--white-soft);background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;backdrop-filter:blur(10px);transition:all 0.3s ease}
                .btn-hero-secondary:hover{background:rgba(255,255,255,0.11);border-color:rgba(255,255,255,0.30);transform:translateY(-2px)}

                .icon-arrow{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform 0.25s ease}
                .btn-hero-primary:hover .icon-arrow{transform:translateX(3px)}

                /* STATS */
                .stats-bar{margin-top:64px;width:100%;max-width:700px;margin-left:auto;margin-right:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;animation:fadeInUp 0.7s ease 0.7s both}
                .stat-item{padding:20px 24px;text-align:center;background:rgba(10,10,10,0.70);backdrop-filter:blur(10px);transition:background 0.25s ease}
                .stat-item:hover{background:rgba(232,25,44,0.08)}
                .stat-value{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--white);line-height:1;margin-bottom:4px}
                .stat-value span{background:linear-gradient(135deg,var(--red-bright),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
                .stat-label{font-size:0.7rem;font-weight:500;color:var(--white-dim);letter-spacing:0.08em;text-transform:uppercase}

                /* SCROLL INDICATOR */
                .scroll-indicator{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0.4;animation:fadeInUp 1s ease 1s both}
                .scroll-indicator span{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--white-dim)}
                .scroll-mouse{width:20px;height:32px;border:1.5px solid rgba(255,255,255,0.35);border-radius:10px;display:flex;justify-content:center;padding-top:5px}
                .scroll-wheel{width:3px;height:6px;background:rgba(255,255,255,0.6);border-radius:2px;animation:scrollDown 2s ease-in-out infinite}
                @keyframes scrollDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(10px);opacity:0}}

                /* FOOTER */
                footer{position:relative;z-index:1;padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;background:rgba(10,10,10,0.50);backdrop-filter:blur(10px)}
                .footer-copy{font-size:0.75rem;color:rgba(255,255,255,0.35);letter-spacing:0.04em}
                .footer-copy strong{color:rgba(255,255,255,0.60);font-weight:600}
                .footer-badge{display:flex;align-items:center;gap:6px;font-size:0.7rem;color:rgba(255,255,255,0.30);letter-spacing:0.06em}
                .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--red-bright);animation:blink 2s ease-in-out infinite}
                @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}

                @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

                @media(max-width:640px){
                    header{padding:12px 20px}
                    .header-title{display:none}
                    .hero{padding:100px 16px 60px}
                    .logos-row{gap:20px}
                    .logo-img{height:90px}
                    .logo-divider{height:60px}
                    .stats-bar{grid-template-columns:1fr;max-width:320px}
                    footer{padding:16px 20px}
                }
            `}</style>

            {/* Backgrounds */}
            <div className="bg-scene" />
            <div className="grid-overlay" />
            <div className="particles" ref={particlesRef} />

            <div className="page-wrapper">
                {/* HEADER */}
                <header>
                    <div className="header-brand">
                        <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" />
                        <div className="header-title">
                            Sistem Manajemen Aset
                            <span>Divhumas Polri</span>
                        </div>
                    </div>
                    <nav className="header-nav">
                        {auth?.user ? (
                            <Link href="/dashboard" className="btn-nav btn-ghost">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="btn-nav btn-ghost">Masuk</Link>
                                <Link href="/register" className="btn-nav btn-primary-nav">Daftar</Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* HERO */}
                <main className="hero">
                    <div className="hero-ring" />

                    {/* Logos */}
                    <div className="logos-row">
                        <div className="logo-wrapper">
                            <div className="logo-img-container">
                                <div className="logo-glow gold" />
                                <img src="/images/logo-polri.png" alt="Logo Polri" className="logo-img" />
                            </div>
                            <span className="logo-label">Polri</span>
                        </div>

                        <div className="logo-divider" />

                        <div className="logo-wrapper">
                            <div className="logo-img-container">
                                <div className="logo-glow" />
                                <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="logo-img" />
                            </div>
                            <span className="logo-label">Divhumas Polri</span>
                        </div>
                    </div>

                    {/* Text */}
                    <p className="hero-eyebrow">Kepolisian Negara Republik Indonesia</p>

                    <h1 className="hero-title">
                        Sistem Manajemen Aset<br />
                        <span className="highlight">Divhumas Polri</span>
                    </h1>

                    <p className="hero-subtitle">
                        Platform terpadu untuk pengelolaan dan pemantauan aset Divisi Hubungan Masyarakat
                        Kepolisian Negara Republik Indonesia secara efisien, transparan, dan akuntabel.
                    </p>

                    <div className="hero-actions">
                        {auth?.user ? (
                            <Link href="/dashboard" className="btn-hero-primary">
                                Buka Dashboard
                                <svg className="icon-arrow" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="btn-hero-primary">
                                    Masuk ke Sistem
                                    <svg className="icon-arrow" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link href="/register" className="btn-hero-secondary">
                                    Buat Akun
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="stats-bar">
                        <div className="stat-item">
                            <div className="stat-value"><span>100%</span></div>
                            <div className="stat-label">Akuntabel</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value"><span>24/7</span></div>
                            <div className="stat-label">Monitoring</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value"><span>Real-time</span></div>
                            <div className="stat-label">Data Terkini</div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="scroll-indicator">
                        <div className="scroll-mouse">
                            <div className="scroll-wheel" />
                        </div>
                        <span>Scroll</span>
                    </div>
                </main>

                {/* FOOTER */}
                <footer>
                    <div className="footer-copy">
                        &copy; {new Date().getFullYear()} <strong>Divisi Hubungan Masyarakat Polri</strong>. Hak Cipta Dilindungi.
                    </div>
                    <div className="footer-badge">
                        <div className="badge-dot" />
                        Sistem Aktif &bull; Powered by Laravel &amp; Inertia.js
                    </div>
                </footer>
            </div>
        </>
    );
}