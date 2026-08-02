import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({ code, language = 'json', title, showLineNumbers = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-lg font-mono text-sm my-4">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80 text-xs text-zinc-400">
          <span className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500/80 inline-block"></span>
            {title || language.toUpperCase()}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
