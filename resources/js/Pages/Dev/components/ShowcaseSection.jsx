import React, { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

export function ShowcaseItem({ label, children }) {
    const [animationKey, setAnimationKey] = useState(0);

    const replayAnimation = () => {
        setAnimationKey(prev => prev + 1);
    };

    return (
        <div className="py-6 first:pt-0 last:pb-0 space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold text-muted uppercase tracking-wider">
                    {label}
                </div>
                <button
                    onClick={replayAnimation}
                    className="text-[10px] font-semibold text-muted hover:text-foreground flex items-center gap-1.5 border border-border/50 bg-card hover:bg-background px-2.5 py-1.5 rounded-lg transition"
                >
                    <ArrowPathIcon className="h-3 w-3" />
                    Play Animasi
                </button>
            </div>
            <div key={animationKey} className="w-full">
                {children}
            </div>
        </div>
    );
}

export default function ShowcaseSection({ title, description, match = true, children }) {
    if (!match) return null;

    return (
        <section className="space-y-6 bg-card/45 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8">
            {/* Section Header */}
            <div className="border-b border-border/60 pb-4">
                <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="text-xs text-muted mt-1.5 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Section list wrapper with divider line between each item */}
            <div className="divide-y divide-border/60">
                {children}
            </div>
        </section>
    );
}
