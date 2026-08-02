import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Heart, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#070709] transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-200 dark:border-zinc-800/60">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                selenium-mcp
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Token-efficient Selenium WebDriver MCP Server written in Java 21 & Spring AI for Claude, Cursor, and modern AI assistants.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> MIT License
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                <Cpu className="w-3 h-3" /> Java 21+
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold mb-4">
              Documentation
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link to="/docs/installation" className="hover:text-brand-500 transition-colors">Quickstart & Installation</Link></li>
              <li><Link to="/docs/installation#claude-desktop" className="hover:text-brand-500 transition-colors">Claude Desktop Setup</Link></li>
              <li><Link to="/docs/installation#cursor" className="hover:text-brand-500 transition-colors">Cursor IDE Config</Link></li>
              <li><Link to="/docs/architecture" className="hover:text-brand-500 transition-colors">Architecture Deep Dive</Link></li>
            </ul>
          </div>

          {/* Tools & Features */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold mb-4">
              Reference
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link to="/docs/tools" className="hover:text-brand-500 transition-colors">Full Tool Surface (112 Tools)</Link></li>
              <li><Link to="/docs/tools?category=PageSourceTools" className="hover:text-brand-500 transition-colors">getPageElementsFiltered</Link></li>
              <li><Link to="/docs/tools?category=NetworkTools" className="hover:text-brand-500 transition-colors">CDP Network Mocking</Link></li>
              <li><Link to="/use-cases" className="hover:text-brand-500 transition-colors">Example Prompts & Workflows</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-bold mb-4">
              Open Source
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <a href="https://github.com/xpathy/selenium-mcp" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-500 transition-colors">
                  <Github className="w-4 h-4" /> GitHub Repository
                </a>
              </li>
              <li><Link to="/changelog" className="hover:text-brand-500 transition-colors">Changelog & Releases</Link></li>
              <li><a href="https://github.com/xpathy/selenium-mcp/issues" target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors">Report Issue / Request Tool</a></li>
              <li><a href="https://github.com/xpathy/selenium-mcp/blob/main/LICENSE" target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors">License Agreement</a></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} selenium-mcp project. Hosted at selenium-mcp.xpathy.uk.</p>
          <p className="flex items-center gap-1">
            Built with Spring AI + Selenium WebDriver 4.46
          </p>
        </div>
      </div>
    </footer>
  );
}
