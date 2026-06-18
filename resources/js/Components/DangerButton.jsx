import React from 'react';
import Button from '@/Components/ui/Button';

export default function DangerButton({ children, ...props }) {
    return (
        <Button variant="danger" {...props}>
            {children}
        </Button>
    );
}
