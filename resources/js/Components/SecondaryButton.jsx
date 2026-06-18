import React from 'react';
import Button from '@/Components/ui/Button';

export default function SecondaryButton({ children, ...props }) {
    return (
        <Button variant="secondary" {...props}>
            {children}
        </Button>
    );
}
