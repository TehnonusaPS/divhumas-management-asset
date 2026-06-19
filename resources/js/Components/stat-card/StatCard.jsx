import React from 'react';
import { cn } from '@/lib/utils';

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendType = 'neutral', // 'positive' | 'negative' | 'neutral'
    className = '',
}) {
    const trendColors = {
        positive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/15',
        negative: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/15',
        neutral: 'text-muted bg-card border-border',
    };

    return (
        <div className={cn('bg-card border border-border rounded-2xl p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 flex items-center justify-between gap-4 relative overflow-hidden', className)}>
            <div className="space-y-2.5 z-10">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider block">
                    {title}
                </span>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                        {value}
                    </span>
                    {trend && (
                        <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border', trendColors[trendType])}>
                            {trend}
                        </span>
                    )}
                </div>
            </div>
            {Icon && (
                <div className="bg-primary/5 border border-primary/10 p-3 rounded-2xl text-primary transition-all duration-300">
                    <Icon className="h-6 w-6" />
                </div>
            )}
        </div>
    );
}
