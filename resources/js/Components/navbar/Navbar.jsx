import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { usePWA } from '@/Hooks/usePWA';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import { NAV_LINKS, NAV_LINKS_PIMPINAN, NAV_LINKS_ADMIN } from '@/constants/navigation';

// =============================================================================
// Sub-components
// =============================================================================

// ─── Brand logo + name ───────────────────────────────────────────────────────

function Brand({ user }) {
    return (
        <Link href={user ? route('dashboard') : '/'} className="flex items-center gap-3 group">
            <img
                src="/images/logo-divhumas.png"
                alt="Logo Divhumas Polri"
                className="h-9 w-auto filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-white font-bold tracking-widest text-xl drop-shadow-sm group-hover:text-zinc-200 transition-colors hidden sm:block">
                SARANA
            </span>
        </Link>
    );
}

// ─── Desktop nav links (authenticated, role-aware) ────────────────────────────

function DesktopNav({ user }) {
    const isPimpinan =
        user?.roles?.includes('pimpinan') || user?.roles?.includes('super-admin');
    const isAdmin = user?.roles?.includes('super-admin');

    const links = [
        ...NAV_LINKS,
        ...(isPimpinan ? NAV_LINKS_PIMPINAN : []),
        ...(isAdmin ? NAV_LINKS_ADMIN : []),
    ];

    return (
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 font-medium">
            {links.map((link) => {
                const active = link.excludeRoutes?.length
                    ? route().current(link.routeName) &&
                      !link.excludeRoutes.some((r) => route().current(r))
                    : route().current(link.routeName);

                return (
                    <NavLink key={link.routeName} href={route(link.routeName)} active={active}>
                        {link.label}
                    </NavLink>
                );
            })}
        </nav>
    );
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function ThemeToggleButton({ theme, toggle }) {
    return (
        <button
            onClick={toggle}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all duration-200"
            aria-label="Toggle Tema"
        >
            {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
}

// ─── PWA Install Action (Home Page only) ──────────────────────────────────────

function PWAInstallButton() {
    const { isInstallable, isInstalled, installPWA } = usePWA();

    if (isInstalled) {
        return (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-lg px-4 py-2 text-green-400 text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="max-sm:hidden">Terinstal</span>
            </div>
        );
    }

    return (
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
            className="flex items-center gap-2 bg-gradient-to-r from-[#C0172A] to-[#8B0000] border border-red-500/30 rounded-lg px-4 py-2 hover:from-[#E8192C] hover:to-[#C0172A] hover:-translate-y-0.5 transition-all duration-200 text-white text-sm font-semibold group shadow-[0_4px_15px_rgba(232,25,44,0.15)]"
        >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Install App</span>
        </button>
    );
}

// ─── Right-side actions by auth state ────────────────────────────────────────

/** Not logged in → Masuk button */
function GuestActions() {
    return (
        <Link
            href={route('login')}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
        >
            Masuk
        </Link>
    );
}

/** Logged in, simple mode (Welcome/landing) → Dashboard button */
function SimpleDashboardAction() {
    return (
        <Link
            href={route('dashboard')}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
        >
            Dashboard
        </Link>
    );
}

/** Logged in, full app → theme toggle + bell + user menu */
function AuthenticatedActions({ user, theme, toggle }) {
    return (
        <div className="flex items-center gap-4">
            <ThemeToggleButton theme={theme} toggle={toggle} />
            <NotificationBell />
            <UserMenu user={user} />
        </div>
    );
}

// =============================================================================
// Root Navbar
// =============================================================================

/**
 * Navbar – unified navigation bar for ALL pages.
 *
 * Visual:  Always sticky, always shows BG_Header.png + dark overlay.
 * Content: Changes by auth state + role:
 *   - Not logged in            → Brand + "Masuk" button
 *   - Logged in + simple=true  → Brand + "Dashboard" button (Welcome page)
 *   - Logged in + simple=false → Brand + full nav links + user menu
 *
 * Theme state is managed here and applied to <html> so dark: classes work everywhere.
 *
 * @param {boolean} [simple=false] – simple mode: hides nav links, shows only action button
 */
export default function Navbar({ simple = false }) {
    const { auth } = usePage().props;
    const { component } = usePage();
    const isHomePage = component === 'Home/Welcome';
    const user = auth?.user ?? null;

    // Theme — managed here, synced to <html> so all dark: classes work
    const [theme, setTheme] = useState(() =>
        typeof window !== 'undefined' && localStorage.getItem('theme')
            ? localStorage.getItem('theme')
            : 'dark',
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return (
        <nav
            className={`${
                simple
                    ? 'fixed left-0 right-0 z-50 border-b border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md'
                    : 'sticky z-50 bg-no-repeat'
            } top-0 w-full transition-colors duration-300`}
            style={
                !simple
                    ? {
                          backgroundImage: "url('/images/BG_Header.png')",
                          backgroundSize: 'calc(100% + 120px) auto',
                          backgroundPosition: '-110px -40px',
                      }
                    : {}
            }
        >
            {/* Dark overlay — only for non-simple (authenticated) mode */}
            {!simple && <div className="absolute inset-0 bg-[#0A0A0A]/80 z-0" />}

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <Brand user={user} />

                    {/* Desktop nav: only when authenticated AND not simple mode */}
                    {user && !simple && <DesktopNav user={user} />}

                    {/* Right-side action: depends on auth state */}
                    <div className="flex items-center gap-3">
                        {isHomePage && <PWAInstallButton />}
                        {!user ? (
                            <GuestActions />
                        ) : simple ? (
                            <SimpleDashboardAction />
                        ) : (
                            <AuthenticatedActions user={user} theme={theme} toggle={toggleTheme} />
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
