// ─── Styles & Bootstrap ───────────────────────────────────────────────────────
import '../css/app.css';   // Global CSS: Tailwind, dark mode tokens, animations
import './bootstrap';       // Axios setup & CSRF token configuration

// ─── Core Dependencies ────────────────────────────────────────────────────────
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

// ─── App Name (from .env VITE_APP_NAME) ──────────────────────────────────────
const appName = import.meta.env.VITE_APP_NAME || 'SARANA';

// =============================================================================
// 1. INERTIA APP SETUP
//
// Inertia.js bridges Laravel (server-side) and React (client-side).
// Instead of full page reloads, Inertia intercepts navigation and swaps
// only the React component that matches the route — like an SPA but
// without building a separate API.
//
//  title    → sets the browser <title> for every page
//  resolve  → maps a page name (e.g. "Dashboard/Index") to the correct
//             JSX file inside resources/js/Pages/
//  setup    → mounts the React app inside the <div id="app"> in app.blade.php
//  progress → disabled here; we use our own centered loading modal instead
// =============================================================================
createInertiaApp({
    title: (title) => title ? `${title} — ${appName}` : appName,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    progress: false, // Custom loading modal handles transitions (see section 2)
});

// =============================================================================
// 2. GLOBAL PAGE TRANSITION LOADING MODAL
//
// Shows a centered spinner during Inertia navigations that take longer than
// 150ms — preventing UI from feeling stuck without showing a flicker on fast
// page transitions.
//
// The modal HTML is created once and reused; styles live in app.css.
// =============================================================================

let loadingTimeout = null;

/** Lazily create and show the loading modal overlay. */
function showLoading() {
    let modal = document.getElementById('global-loading-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'global-loading-modal';
        modal.innerHTML = `
            <div class="loader-backdrop"></div>
            <div class="loader-spinner-wrapper">
                <div class="loader-spinner"></div>
                <div class="loader-center-dot"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    modal.offsetHeight; // Force layout reflow so CSS transition plays
    modal.classList.add('active');
}

/** Hide the loading modal overlay. */
function hideLoading() {
    document.getElementById('global-loading-modal')?.classList.remove('active');
}

// Show modal only after 150ms to avoid flash on instant navigations
router.on('start', () => {
    if (loadingTimeout) clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(showLoading, 150);
});

router.on('finish', () => {
    clearTimeout(loadingTimeout);
    loadingTimeout = null;
    hideLoading();
});

// =============================================================================
// 3. SERVICE WORKER (PWA)
//
// Registers /sw.js so the app can be installed as a Progressive Web App (PWA).
// This enables offline caching, add-to-home-screen, and faster repeat loads.
// Only runs in browsers that support Service Workers.
// =============================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then((reg) => console.log('[PWA] Service Worker registered:', reg.scope))
            .catch((err) => console.warn('[PWA] Service Worker failed:', err));
    });
}
