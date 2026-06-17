import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: false, // Disable default top progress bar in favor of the centered loading modal
});

// Global Page Loading Modal implementation for Inertia Page Transitions
let loadingTimeout = null;

const showLoading = () => {
    let loader = document.getElementById('global-loading-modal');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'global-loading-modal';
        loader.innerHTML = `
            <div class="loader-backdrop"></div>
            <div class="loader-card">
                <div class="loader-spinner-container">
                    <div class="loader-spinner"></div>
                    <div class="loader-center-dot"></div>
                </div>
                <h3>Memuat Data</h3>
                <p>Menghubungkan ke server...</p>
            </div>
        `;
        
        const style = document.createElement('style');
        style.id = 'global-loading-style';
        style.innerHTML = `
            #global-loading-modal {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.2s ease;
                font-family: 'Inter', sans-serif;
            }
            #global-loading-modal.active {
                opacity: 1;
                pointer-events: all;
            }
            .loader-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(10, 10, 10, 0.65);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            }
            .loader-card {
                position: relative;
                z-index: 1;
                width: 90%;
                max-width: 300px;
                background: rgba(18, 18, 18, 0.85);
                border: 1px solid rgba(232, 25, 44, 0.25);
                border-radius: 16px;
                padding: 30px 24px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(232, 25, 44, 0.12);
                transform: scale(0.9);
                transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            #global-loading-modal.active .loader-card {
                transform: scale(1);
            }
            .loader-spinner-container {
                position: relative;
                width: 56px;
                height: 56px;
                margin: 0 auto 16px;
            }
            .loader-spinner {
                width: 100%;
                height: 100%;
                border: 3px solid rgba(232, 25, 44, 0.12);
                border-top: 3px solid #E8192C;
                border-right: 3px solid #D4AF37;
                border-radius: 50%;
                animation: spinLoader 0.8s linear infinite;
            }
            .loader-center-dot {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #E8192C;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 8px #FF3347;
                animation: pulseDot 1.5s ease-in-out infinite;
            }
            .loader-card h3 {
                color: #FFFFFF;
                font-size: 1rem;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.05em;
                text-transform: uppercase;
            }
            .loader-card p {
                color: rgba(255, 255, 255, 0.5);
                font-size: 0.75rem;
                font-weight: 500;
            }
            @keyframes spinLoader {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes pulseDot {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(loader);
    }
    loader.offsetHeight; // Force layout reflow
    loader.classList.add('active');
};

const hideLoading = () => {
    const loader = document.getElementById('global-loading-modal');
    if (loader) {
        loader.classList.remove('active');
    }
};

router.on('start', () => {
    if (loadingTimeout) clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(() => {
        showLoading();
    }, 150); // Show loader after 150ms delay to prevent quick flickering on super fast transitions
});

router.on('finish', () => {
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
    }
    hideLoading();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered successfully!', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}
