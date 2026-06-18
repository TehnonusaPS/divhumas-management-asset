/**
 * HeaderBanner – the decorative hero banner shown at the top of authenticated pages.
 *
 * Overlaps behind the fixed Navbar using negative top margin (-mt-16).
 * Background image is aligned to perfectly match the Navbar's background.
 * Accepts an optional `header` slot (page title area) rendered as children.
 *
 * @param {React.ReactNode} children  - Page title content rendered inside the banner
 */
export default function HeaderBanner({ children }) {
    return (
        <div
            className="relative z-10 -mt-16 bg-no-repeat w-full"
            style={{
                backgroundImage: "url('/images/BG_Header.png')",
                backgroundPosition: '-110px -40px',
                backgroundSize: 'calc(100% + 120px) auto',
            }}
        >
            {/* Readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/10 dark:from-black/85 dark:via-black/50 dark:to-transparent" />

            {/* Bottom fade to blend into page background */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 dark:from-[#0A0A0A] to-transparent pointer-events-none" />

            {/* Page Title Area */}
            <header className="relative z-20 pt-20 pb-6 md:pt-24 md:pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </header>
        </div>
    );
}
