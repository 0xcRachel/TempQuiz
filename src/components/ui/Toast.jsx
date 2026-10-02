import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    if (toastRef.current) {
      gsap.fromTo(toastRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
    }
    const timer = setTimeout(() => onClose?.(), 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-neutral-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div ref={toastRef} className="flex items-center gap-2.5 px-4 py-3 bg-white border border-neutral-200 rounded-lg shadow-md text-sm text-neutral-700 max-w-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
        {icons[toast.type] || icons.info}
        <span className="flex-1">{toast.message}</span>
        <button onClick={onClose} className="p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
