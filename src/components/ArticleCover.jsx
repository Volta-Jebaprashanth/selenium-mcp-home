import React from 'react';
import { BookOpen } from 'lucide-react';

// Article cover image, or a branded placeholder for articles that don't have one yet.
export default function ArticleCover({ src, className = '', loading }) {
  if (src) {
    return <img src={src} alt="" loading={loading} className={`w-full h-full object-cover ${className}`} />;
  }
  return (
    <div className={`w-full h-full min-h-[12rem] flex items-center justify-center bg-gradient-to-br from-brand-500/20 via-zinc-100 to-zinc-200 dark:via-zinc-900 dark:to-zinc-950 ${className}`}>
      <BookOpen className="w-12 h-12 text-brand-500/60" />
    </div>
  );
}
