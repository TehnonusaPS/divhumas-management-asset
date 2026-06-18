import { Link } from '@inertiajs/react';

/**
 * AuthCard – shared container for all authentication form pages.
 *
 * Renders:
 *  - Dual logo header (Polri + Divhumas)
 *  - Glassmorphic card wrapping children (the form)
 *
 * Used by: Login, Register, ForgotPassword, ResetPassword,
 *          ConfirmPassword, VerifyEmail
 */
export default function AuthCard({ children }) {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow py-10 px-5 md:py-16 md:px-8 min-h-[calc(100svh-4rem)]">

            {/* Dual logo header */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <Link href="/">
                    <img
                        src="/images/logo-polri.png"
                        alt="Logo Polri"
                        className="h-[50px] md:h-[60px] w-auto filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                {/* Divider with red dot accent */}
                <div className="w-[1px] h-[35px] md:h-[45px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent relative after:content-[''] after:absolute after:w-[5px] after:h-[5px] after:bg-[#E8192C] after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:shadow-[0_0_8px_#E8192C]" />

                <Link href="/">
                    <img
                        src="/images/logo-divhumas.png"
                        alt="Logo Divhumas Polri"
                        className="h-[50px] md:h-[60px] w-auto filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            {/* Glassmorphic form card */}
            <div className="w-full max-w-[420px] bg-[#0A0A0A]/75 backdrop-blur-[20px] border border-red-500/20 rounded-xl p-7 md:p-9 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(232,25,44,0.08)] transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
