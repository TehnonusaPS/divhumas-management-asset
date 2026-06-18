import AppLayout from '@/Layouts/AppLayout';
import HeaderBanner from '@/Components/page-header/HeaderBanner';
import MobileBottomNav from '@/Components/navbar/MobileBottomNav';

/**
 * AuthenticatedLayout – shell for all authenticated pages.
 *
 * Extends AppLayout with:
 *  - Dark page gradient background
 *  - Optional HeaderBanner (page title / hero area)
 *  - Mobile PWA-style bottom navigation
 *  - Extra bottom padding on mobile (to clear the bottom nav bar)
 *
 * Theme is managed entirely by Navbar — no duplication needed here.
 *
 * @param {React.ReactNode} header   - Optional page title content
 * @param {React.ReactNode} children - Page body
 */
export default function AuthenticatedLayout({ header, children }) {
    return (
        <AppLayout simple={false} className="pb-16 md:pb-0">

            {/* Page background gradient */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#160306]" />
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage:
                        'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Optional page hero / title banner */}
            {header && (
                <div className="relative z-20">
                    <HeaderBanner>{header}</HeaderBanner>
                </div>
            )}

            {/* Page body */}
            <div className="relative z-20 flex-grow">
                {children}
            </div>

            {/* Mobile bottom navigation bar */}
            <MobileBottomNav />
        </AppLayout>
    );
}
