import React from 'react';

export default function Footer({ onOpenSchema }) {
  return (
    <footer className="mt-auto border-t border-neutral-100 py-6 px-4 text-xs text-neutral-400 text-center dark:border-neutral-800 dark:text-neutral-500">
      <span>Toàn bộ dữ liệu xử lý trong trình duyệt</span>
      <span className="mx-2">·</span>
      <button onClick={onOpenSchema} className="hover:text-neutral-600 underline underline-offset-2 transition dark:hover:text-neutral-300">
        JSON Schema
      </button>
    </footer>
  );
}
