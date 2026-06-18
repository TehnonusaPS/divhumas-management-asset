import { useEffect, useRef } from 'react';

/**
 * GuestLayout – layout untuk halaman autentikasi (Login, Register, dll).
 *
 * Standalone — TIDAK ada Navbar dan Footer, fokus penuh ke form.
 * Menyediakan: dark bg-scene + grid overlay + partikel melayang.
 *
 * @param {React.ReactNode} children
 */
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
        <div className="dark min-h-screen flex flex-col">
            {/* Fixed background layers */}
            <div className="bg-scene" />
            <div className="grid-overlay" />
            <div className="particles" ref={particlesRef} />

            {/* Form content */}
            {children}
        </div>
    );
}
