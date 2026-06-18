import Navbar from '@/Components/navbar/Navbar';
import Footer from '@/Components/footer/Footer';

/**
 * AppLayout – the universal base shell for every page.
 *
 * Renders: Navbar → {children} → Footer.
 * Background (gradient, particles, etc.) is provided by each specific layout on top.
 *
 * @param {React.ReactNode} children
 * @param {boolean}  [simple=false]  Passed to Navbar: hides nav links, shows only action button
 * @param {string}   [className]     Extra classes on the root wrapper
 */
export default function AppLayout({ children, simple = false, className = '' }) {
    return (
        <div className={`dark min-h-screen flex flex-col ${className}`}>
            <Navbar simple={simple} />

            {/* Flex-grow content sits above any fixed bg layers (z-10) */}
            <div className="relative z-10 flex flex-col flex-grow">
                {children}
            </div>

            {/* Footer — plain (no bg image) when simple mode */}
            <div className="relative z-10">
                <Footer plain={simple} />
            </div>
        </div>
    );
}
