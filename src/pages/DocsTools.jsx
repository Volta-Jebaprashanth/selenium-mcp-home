import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Sparkles, Activity, Copy, Check, Filter, Code2, Globe, Shield, HelpCircle 
} from 'lucide-react';
import { ALL_TOOLS, TOOL_CATEGORIES, LOCATOR_STRATEGIES } from '../data/toolsData';

export default function DocsTools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [copiedTool, setCopiedTool] = useState(null);

  // Sync category state with search parameters
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (!val) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', val);
    }
    setSearchParams(searchParams);
  };

  const groupOf = (categoryId) => TOOL_CATEGORIES.find((c) => c.id === categoryId)?.group;

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesCategory = selectedCategory === 'ALL' || tool.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.signature.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const copySignature = (toolName, sig) => {
    navigator.clipboard.writeText(sig);
    setCopiedTool(toolName);
    setTimeout(() => setCopiedTool(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <Code2 className="w-3.5 h-3.5" /> Documentation / Tool Reference
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
              MCP Tools Reference ({ALL_TOOLS.length} Tools)
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Search, filter, and inspect the complete tool surface across 16 categories.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tools, params, or descriptions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-brand-500 transition-colors font-mono"
            />
          </div>
        </div>
      </div>

      {/* Locator Strategy Reference Card */}
      <section className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-500 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" /> Supported Locator Strategies (locatorType)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {LOCATOR_STRATEGIES.map((loc) => (
            <div key={loc.key} className="p-2 rounded-lg bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{loc.key}</span>
              {loc.recommended && (
                <span className="text-[9px] bg-brand-500/20 text-brand-500 px-1.5 py-0.5 rounded uppercase font-bold">
                  Rec
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <code className="font-mono">click</code>, <code className="font-mono">sendKeys</code>, <code className="font-mono">getText</code>, <code className="font-mono">getAttribute</code>, <code className="font-mono">hover</code>, <code className="font-mono">doubleClick</code>, <code className="font-mono">rightClick</code>, <code className="font-mono">scrollIntoView</code> and <code className="font-mono">takeElementScreenshot</code> also accept optional <code className="font-mono">index</code> (zero-based match to use) and <code className="font-mono">visibleOnly</code> (ignore hidden matches, applied before <code className="font-mono">index</code>).
        </p>
      </section>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar">
        <button
          onClick={() => handleCategorySelect('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'ALL'
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          All Categories ({ALL_TOOLS.length})
        </button>

        {TOOL_CATEGORIES.map((cat) => {
          const count = ALL_TOOLS.filter((t) => t.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white font-bold shadow-glow-orange-sm'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat.id === 'PageSourceTools' && <Sparkles className="w-3 h-3 text-amber-300" />}
              {cat.id === 'NetworkTools' && <Activity className="w-3 h-3 text-amber-300" />}
              <span>{cat.id}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Tools List Grid */}
      <div className="space-y-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div
              key={tool.name}
              className={`p-6 rounded-2xl border transition-all space-y-3 ${
                tool.flagship
                  ? 'border-brand-500/50 bg-brand-500/5 dark:bg-brand-500/10 shadow-glow-orange-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {/* Header bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-base font-bold text-zinc-900 dark:text-white">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {tool.category}
                  </span>
                  <span
                    title="Tool group name for --selenium.mcp.tool-groups / --selenium.mcp.exclude-tool-groups"
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                  >
                    {groupOf(tool.category) ? `group: ${groupOf(tool.category)}` : 'always loaded'}
                  </span>
                  {tool.flagship && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-500 text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Flagship Smart Discovery
                    </span>
                  )}
                  {tool.cdp && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Chrome / Edge CDP Only
                    </span>
                  )}
                </div>

                <button
                  onClick={() => copySignature(tool.name, tool.signature)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-brand-500 transition-colors self-start sm:self-auto"
                >
                  {copiedTool === tool.name ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy signature</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {tool.description}
              </p>

              {/* Signature block */}
              <div className="p-3 rounded-xl bg-zinc-950 text-brand-400 font-mono text-xs overflow-x-auto border border-zinc-800">
                <code>{tool.signature}</code>
              </div>

              {tool.example && (
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  Example: <code className="text-zinc-800 dark:text-zinc-200">{tool.example}</code>
                </div>
              )}

              {/* Parameters list if present */}
              {tool.params && tool.params.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                  <h4 className="font-mono text-[11px] uppercase text-zinc-400 font-bold tracking-wider">
                    Parameters ({tool.params.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {tool.params.map((p) => (
                      <div key={p.name} className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 font-mono space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">{p.name}</span>
                          <span className="text-[10px] text-brand-500 font-semibold">
                            {p.type}{p.required ? ' · required' : ''}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-zinc-400 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            No tools found matching your filter criteria. Try clearing search or selecting "All Categories".
          </div>
        )}
      </div>
    </div>
  );
}
