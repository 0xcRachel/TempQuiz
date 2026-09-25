import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  className = ''
}) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-600',
    success: 'bg-emerald-50 text-emerald-700',
    error: 'bg-red-50 text-red-700',
    warning: 'bg-amber-50 text-amber-700'
  };

  return (
    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
