import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Init state from DOM status
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        setIsDark(isCurrentlyDark);
    }, []);

    const toggle = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggle}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-background transition text-muted hover:text-foreground cursor-pointer focus:outline-none"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? (
                <SunIcon className="h-5 w-5 text-gold" />
            ) : (
                <MoonIcon className="h-5 w-5" />
            )}
        </button>
    );
}
