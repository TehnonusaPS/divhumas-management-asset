import React from 'react';
import { cn } from '@/lib/utils';

const CheckCircleIcon = (props) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 mr-1 shrink-0" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);

export default function Badge({
    variant = 'default',
    className = '',
    showDot,
    icon,
    children,
    ...props
}) {
    const isOutline = variant.startsWith('outline-');
    
    const variants = {
        // Group 1: Solid soft background with dot
        default: 'bg-[#E3E3E3] text-[#5F5F5F] dark:bg-[#5F5F5F]/20 dark:text-[#E3E3E3] border-transparent',
        primary: 'bg-[#F6B0B7] text-[#A10010] dark:bg-[#A10010]/20 dark:text-[#F6B0B7] border-transparent',
        secondary: 'bg-[#FFEFB0] text-[#B59000] dark:bg-[#B59000]/20 dark:text-[#FFEFB0] border-transparent',
        success: 'bg-[#B0DDC0] text-[#006626] dark:bg-[#006626]/20 dark:text-[#B0DDC0] border-transparent',
        warning: 'bg-[#FFEFB0] text-[#B59000] dark:bg-[#B59000]/20 dark:text-[#FFEFB0] border-transparent',
        danger: 'bg-[#F6B0B7] text-[#A10010] dark:bg-[#A10010]/20 dark:text-[#F6B0B7] border-transparent',
        info: 'bg-[#B0CFF7] text-[#0046A3] dark:bg-[#0046A3]/20 dark:text-[#B0CFF7] border-transparent',
        purple: 'bg-[#E8B0F7] text-[#8000A3] dark:bg-[#8000A3]/20 dark:text-[#E8B0F7] border-transparent',
        pink: 'bg-[#F7B0D6] text-[#A30057] dark:bg-[#A30057]/20 dark:text-[#F7B0D6] border-transparent',

        // Group 2: Outline border with icon
        'outline-success': 'bg-transparent border border-[#006626] text-[#006626] dark:border-[#006626]/50 dark:text-[#B0DDC0] dark:bg-[#006626]/10',
        'outline-info': 'bg-transparent border border-[#0046A3] text-[#0046A3] dark:border-[#0046A3]/50 dark:text-[#B0CFF7] dark:bg-[#0046A3]/10',
        'outline-danger': 'bg-transparent border border-[#A10010] text-[#A10010] dark:border-[#A10010]/50 dark:text-[#F6B0B7] dark:bg-[#A10010]/10',
    };

    const dotColors = {
        default: 'bg-[#5F5F5F] dark:bg-[#E3E3E3]',
        primary: 'bg-[#A10010] dark:bg-[#F6B0B7]',
        secondary: 'bg-[#B59000] dark:bg-[#FFEFB0]',
        success: 'bg-[#006626] dark:bg-[#B0DDC0]',
        warning: 'bg-[#B59000] dark:bg-[#FFEFB0]',
        danger: 'bg-[#A10010] dark:bg-[#F6B0B7]',
        info: 'bg-[#0046A3] dark:bg-[#B0CFF7]',
        purple: 'bg-[#8000A3] dark:bg-[#E8B0F7]',
        pink: 'bg-[#A30057] dark:bg-[#F7B0D6]',
    };

    // By default, show dot for non-outline variants if not overridden
    const shouldShowDot = showDot !== undefined ? showDot : !isOutline;
    const activeDotColor = dotColors[variant] || 'bg-current';

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all',
                variants[variant] || variants.default,
                className
            )}
            {...props}
        >
            {/* Render check circle icon for outline variants by default, or if passed */}
            {icon ? icon : (isOutline && <CheckCircleIcon />)}
            
            {/* Render dot if requested */}
            {shouldShowDot && !icon && (
                <span className={cn('h-1.5 w-1.5 rounded-full mr-1.5 shrink-0', activeDotColor)} />
            )}
            
            {children}
        </span>
    );
}
