import React from 'react';
import { Terminal, Github, ExternalLink, Sparkles, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';

export default function Changelog() {
  const releases = [
    {
      version: 'v1.0.0',
      date: '2026-08-01',
      title: 'Initial Release & Full Feature Set',
      latest: true,
      changes: [
        'Initial public release of selenium-mcp server.',
        'Added Chrome DevTools Protocol (CDP) support via Selenium 4 DevTools API.',
        'Introduced NetworkTools category: startNetworkCapture, mockResponse, blockRequests, setNetworkConditions.',
        'Added startConsoleCapture and getConsoleLogs for JS browser console monitoring.',
        'Added standalone ApiTools HTTP client (httpGet, httpPost, httpPut, httpDelete, httpPatch).',
        'Added flagship getPageElementsFiltered tool with configurable depth capping and sibling indexing.',
        'Added automated WebDriverManager driver caching for Chrome, Edge, and Firefox.',
        'Enforced zero-stdout logging policy with rotating log file appender to guarantee stdio stream safety.',
        'Full support for stdio JSON-RPC protocol transport.',
        'Spring AI 1.0.0 MCP server starter integration.',
        'MIT open source license.'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <Tag className="w-3.5 h-3.5" /> Project Releases & Updates
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
              Changelog
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Semantic versioning release history for selenium-mcp.
            </p>
          </div>

          <a
            href="https://github.com/Volta-Jebaprashanth/selenium-mcp/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium transition-colors self-start sm:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Release Timeline */}
      <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
        {releases.map((rel) => (
          <div key={rel.version} className="relative pl-10 sm:pl-14 space-y-3">
            {/* Timeline Dot */}
            <div className={`absolute left-2.5 sm:left-4 top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white dark:bg-zinc-950 ${
              rel.latest ? 'border-brand-500 ring-4 ring-brand-500/20' : 'border-zinc-400 dark:border-zinc-600'
            }`} />

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-lg font-extrabold text-zinc-900 dark:text-white">
                {rel.version}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                Released {rel.date}
              </span>
              {rel.latest && (
                <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Latest Release
                </span>
              )}
            </div>

            <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-200">
              {rel.title}
            </h3>

            <ul className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {rel.changes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
