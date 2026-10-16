import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Code, Cpu } from 'lucide-react';
import { ALL_TOOLS } from '../data/toolsData';
import { useNavigate } from 'react-router-dom';

export default function QuickSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = ALL_TOOLS.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const handleSelectTool = (toolName) => {
    onClose();
    navigate(`/docs/tools?search=${encodeURIComponent(toolName)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-zinc-950/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-brand-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools (e.g. getPageElementsFiltered, openBrowser)..."
            className="w-full py-4 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none text-base"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-zinc-100 dark:divide-zinc-800/50">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => handleSelectTool(tool.name)}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors flex items-start justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-500 dark:group-hover:text-brand-400">
                      {tool.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {tool.category}
                    </span>
                    {tool.flagship && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Flagship
                      </span>
                    )}
                    {tool.cdp && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        Chrome/Edge CDP
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-400 text-sm">
              No matching tools found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span>Search across {ALL_TOOLS.length} MCP tools</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-[10px] font-mono">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
