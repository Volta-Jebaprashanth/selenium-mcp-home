import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Github, Star, Menu, X, Sparkles, Terminal, BookOpen, Layers, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import QuickSearchModal from './QuickSearchModal';
import { ALL_TOOLS } from '../data/toolsData';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const navLinks = [
    { label: 'Installation', path: '/docs/installation' },
    { label: 'Tool Reference', path: '/docs/tools' },
    { label: 'Architecture', path: '/docs/architecture' },
    { label: 'Use Cases', path: '/use-cases' },
    { label: 'Articles', path: '/articles' },
    { label: 'Changelog', path: '/changelog' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 p-[1px] shadow-glow-orange-sm group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[11px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-brand-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-base tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                selenium-mcp
              </span>
              <span className="text-[10px] text-zinc-400 font-mono -mt-1">
                .xpathy.uk
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-500/10 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action buttons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-xs"
            >
              <Search className="w-3.5 h-3.5 text-brand-500" />
              <span>Search tools...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-zinc-500 dark:text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/Volta-Jebaprashanth/selenium-mcp"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-medium text-xs transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Light/Dark Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-sm mb-3"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-500" />
                Search {ALL_TOOLS.length} MCP tools...
              </span>
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-[10px] rounded">⌘K</kbd>
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-500/10 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
