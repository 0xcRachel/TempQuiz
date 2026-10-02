import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  className = ''
}) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    error: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
  };

  return (
    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
