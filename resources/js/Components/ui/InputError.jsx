import React from 'react';
import { cn } from '@/lib/utils';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            className={cn('text-xs font-semibold text-primary dark:text-red-400 mt-1.5', className)}
            {...props}
        >
            {message}
        </p>
    ) : null;
}
