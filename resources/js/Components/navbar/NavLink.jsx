import { Link } from '@inertiajs/react';

/**
 * NavLink – desktop navigation link with active underline indicator.
 * Styled for the dark glassmorphic navbar (always dark background).
 *
 * @param {string}          href    - Target URL
 * @param {boolean}         active  - Whether this link is currently active
 * @param {React.ReactNode} children
 */
export default function NavLink({ href, active = false, children }) {
    return (
        <Link
            href={href}
            className={`relative px-3 py-2 text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                active
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
        >
            {children}
            {active && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C]" />
            )}
        </Link>
    );
}
