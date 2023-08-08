import React from 'react';

export interface TestingComponentsProps {
    className?: string;
}

export const TestingComponents: React.FC<TestingComponentsProps> = ({ className = '' }) => (
    <div className={className}>TestingComponents</div>
);