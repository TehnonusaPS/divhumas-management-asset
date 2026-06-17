import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function GuestLayout({ children }) {
    const particlesRef = useRef(null);

    useEffect(() => {
        const container = particlesRef.current;
        if (!container) return;
        const count = 15;
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
            <style>{`
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
                :root{
                    --red-deep:#8B0000;--red-mid:#C0172A;--red-bright:#E8192C;
                    --red-glow:#FF3347;--gold:#D4AF37;--gold-light:#F5D060;
                    --black:#0A0A0A;--black-mid:#111111;--black-soft:#1A1A1A;
                    --white:#FFFFFF;--white-soft:rgba(255,255,255,0.92);
                    --white-dim:rgba(255,255,255,0.60);--white-faint:rgba(255,255,255,0.15);
                }
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
                @keyframes floatUp{0%{transform:translateY(100dvh) scale(0);opacity:0}10%{opacity:0.6}90%{opacity:0.2}100%{transform:translateY(-20dvh) scale(1.5);opacity:0}}
                .grid-overlay{position:fixed;inset:0;z-index:0;pointer-events:none;
                    background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
                    background-size:60px 60px;
                }

                .auth-wrapper {
                    position: relative;
                    z-index: 1;
                    min-height: 100dvh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    padding: calc(40px + env(safe-area-inset-top)) 20px calc(40px + env(safe-area-inset-bottom));
                    overflow-y: auto;
                    font-family: 'Inter', sans-serif;
                }

                /* Brand Header */
                .auth-brand {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    margin-bottom: 24px;
                    z-index: 10;
                }
                .auth-logo-img {
                    height: 60px;
                    width: auto;
                    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
                    transition: transform 0.3s ease;
                }
                .auth-logo-img:hover {
                    transform: scale(1.05);
                }
                .auth-logo-divider {
                    width: 1px;
                    height: 45px;
                    background: linear-gradient(to bottom, transparent, rgba(232,25,44,0.50), transparent);
                    position: relative;
                }
                .auth-logo-divider::after {
                    content: '';
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    background: var(--red-bright);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    box-shadow: 0 0 8px var(--red-bright);
                }

                /* Card styling */
                .auth-card {
                    margin: auto 0;
                    width: 100%;
                    max-width: 420px;
                    background: rgba(10, 10, 10, 0.75) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(232, 25, 44, 0.20) !important;
                    border-radius: 12px;
                    padding: 36px 30px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(232, 25, 44, 0.08) !important;
                    z-index: 10;
                    transition: all 0.3s ease;
                }

                /* Header in card */
                .auth-title-container {
                    text-align: center;
                    margin-bottom: 24px;
                }
                .auth-title-container h2 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.6rem;
                    font-weight: 800;
                    color: var(--white);
                    margin-bottom: 4px;
                }
                .auth-title-container p {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: var(--red-bright);
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                /* Inputs overrides */
                .auth-card label {
                    color: var(--white-soft) !important;
                    font-weight: 500;
                    font-size: 0.8rem;
                    letter-spacing: 0.02em;
                }
                .auth-card input[type="text"],
                .auth-card input[type="email"],
                .auth-card input[type="password"] {
                    background: rgba(26, 26, 26, 0.6) !important;
                    border: 1px solid rgba(255, 255, 255, 0.12) !important;
                    color: var(--white) !important;
                    padding: 10px 14px !important;
                    border-radius: 8px !important;
                    font-size: 0.9rem !important;
                    transition: all 0.25s ease !important;
                    width: 100%;
                    margin-top: 6px;
                }
                .auth-card input[type="text"]:focus,
                .auth-card input[type="email"]:focus,
                .auth-card input[type="password"]:focus {
                    border-color: var(--red-bright) !important;
                    box-shadow: 0 0 10px rgba(232, 25, 44, 0.35) !important;
                    background: rgba(26, 26, 26, 0.85) !important;
                    outline: none !important;
                }

                /* Checkbox and labels */
                .auth-card input[type="checkbox"] {
                    accent-color: var(--red-bright) !important;
                    cursor: pointer;
                    border-radius: 4px;
                    width: 16px;
                    height: 16px;
                }
                .auth-card .remember-text {
                    color: var(--white-dim) !important;
                    font-size: 0.8rem !important;
                    margin-left: 8px;
                }

                /* Links */
                .auth-card a {
                    color: var(--white-dim) !important;
                    text-decoration: none !important;
                    font-size: 0.8rem !important;
                    transition: all 0.2s ease !important;
                }
                .auth-card a:hover {
                    color: var(--red-bright) !important;
                    text-decoration: underline !important;
                }

                /* Custom Primary Buttons */
                .auth-card button,
                .auth-card button[type="submit"] {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    padding: 12px 24px !important;
                    border-radius: 8px !important;
                    font-size: 0.9rem !important;
                    font-weight: 600 !important;
                    text-transform: none !important;
                    letter-spacing: 0.03em !important;
                    color: var(--white) !important;
                    background: linear-gradient(135deg, var(--red-bright), var(--red-deep)) !important;
                    border: none !important;
                    box-shadow: 0 4px 15px rgba(232, 25, 44, 0.3) !important;
                    cursor: pointer;
                    transition: all 0.3s ease !important;
                    user-select: none;
                }
                .auth-card button:hover,
                .auth-card button[type="submit"]:hover {
                    background: linear-gradient(135deg, var(--red-glow), var(--red-mid)) !important;
                    box-shadow: 0 6px 20px rgba(232, 25, 44, 0.5) !important;
                    transform: translateY(-1px);
                }
                .auth-card button:disabled,
                .auth-card button[type="submit"]:disabled {
                    opacity: 0.4 !important;
                    cursor: not-allowed !important;
                    transform: none !important;
                    box-shadow: none !important;
                }

                /* Error styles */
                .auth-card .text-red-600 {
                    color: var(--red-glow) !important;
                    font-size: 0.75rem !important;
                    margin-top: 4px;
                }

                /* Captcha custom row */
                .captcha-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 6px;
                }
                .captcha-image-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    padding: 4px;
                    flex-shrink: 0;
                }
                .captcha-image-wrapper img {
                    height: 38px;
                    width: auto;
                    border-radius: 6px;
                }
                .captcha-input {
                    flex: 1;
                    margin-top: 0 !important;
                }

                /* Form actions container */
                .auth-actions-container {
                    margin-top: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .auth-actions-container a {
                    order: 1;
                }
                .auth-actions-container button {
                    order: 2;
                    width: auto !important;
                }

                @media(max-width: 480px) {
                    .auth-card {
                        padding: 28px 20px;
                    }
                    .auth-brand {
                        margin-bottom: 20px;
                        gap: 12px;
                    }
                    .auth-logo-img {
                        height: 50px;
                    }
                    .auth-logo-divider {
                        height: 35px;
                    }
                    .auth-title-container h2 {
                        font-size: 1.4rem;
                    }
                    .captcha-row {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 10px;
                    }
                    .captcha-image-wrapper {
                        justify-content: space-between;
                        padding: 6px 10px;
                        background: rgba(255, 255, 255, 0.05);
                    }
                    .captcha-image-wrapper img {
                        height: 38px;
                        flex-grow: 1;
                        object-fit: contain;
                    }
                    .auth-actions-container {
                        flex-direction: column;
                        gap: 16px;
                        align-items: stretch;
                    }
                    .auth-actions-container button {
                        order: 1;
                        width: 100% !important;
                    }
                    .auth-actions-container a {
                        order: 2;
                        text-align: center;
                    }
                }
            `}</style>

            {/* Backgrounds */}
            <div className="bg-scene" />
            <div className="grid-overlay" />
            <div className="particles" ref={particlesRef} />

            <div className="auth-wrapper">
                <div className="auth-brand">
                    <Link href="/">
                        <img src="/images/logo-polri.png" alt="Logo Polri" className="auth-logo-img" />
                    </Link>
                    <div className="auth-logo-divider" />
                    <Link href="/">
                        <img src="/images/logo-divhumas.png" alt="Logo Divhumas Polri" className="auth-logo-img" />
                    </Link>
                </div>

                <div className="auth-card">
                    {children}
                </div>
            </div>
        </>
    );
}
