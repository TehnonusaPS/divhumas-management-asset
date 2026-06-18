import React from 'react';
import Button from '@/Components/ui/Button';

export default function PrimaryButton({ children, ...props }) {
    return (
        <Button variant="primary" {...props}>
            {children}
        </Button>
    );
}
