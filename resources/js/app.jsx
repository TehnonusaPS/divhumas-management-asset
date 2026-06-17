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
            <div class="loader-spinner-wrapper">
                <div class="loader-spinner"></div>
                <div class="loader-center-dot"></div>
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
            }
            #global-loading-modal.active {
                opacity: 1;
                pointer-events: all;
            }
            .loader-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(10, 10, 10, 0.45);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            }
            .loader-spinner-wrapper {
                position: relative;
                z-index: 1;
                width: 72px;
                height: 72px;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: scale(0.8);
                transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            #global-loading-modal.active .loader-spinner-wrapper {
                transform: scale(1);
            }
            .loader-spinner {
                width: 100%;
                height: 100%;
                border: 4px solid rgba(232, 25, 44, 0.12);
                border-top: 4px solid #E8192C;
                border-right: 4px solid #D4AF37;
                border-radius: 50%;
                animation: spinLoader 0.8s linear infinite;
                filter: drop-shadow(0 0 8px rgba(232, 25, 44, 0.4));
            }
            .loader-center-dot {
                position: absolute;
                width: 12px;
                height: 12px;
                background: #E8192C;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 12px #FF3347;
                animation: pulseDot 1.5s ease-in-out infinite;
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
