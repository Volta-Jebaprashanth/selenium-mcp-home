import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Clock, CalendarDays, Terminal, Github,
  Link2, Check, List, Download,
} from 'lucide-react';
import { getArticleBySlug, getAdjacentArticles } from '../data/articlesData';
import ArticleContent, { extractHeadings } from '../components/ArticleContent';

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function PagerCard({ article, direction }) {
  const isPrev = direction === 'prev';
  return (
    <Link
      to={`/articles/${article.slug}`}
      className={`group flex-1 flex items-center gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all ${isPrev ? '' : 'sm:flex-row-reverse sm:text-right'}`}
    >
      <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-brand-500/10 transition-colors">
        {isPrev
          ? <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors" />
          : <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors" />}
      </div>
      <div className="min-w-0">
        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-400">
          {isPrev ? 'Previous' : 'Next'}
        </span>
        <p className="text-sm font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
          {article.title}
        </p>
      </div>
    </Link>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (article) document.title = `${article.title} — selenium-mcp`;
    return () => { document.title = 'selenium-mcp — Structured Selenium MCP Server for AI Agents'; };
  }, [article]);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const { prev, next } = getAdjacentArticles(slug);
  const headings = extractHeadings(article.content);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Back link */}
      <Link
        to="/articles"
        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> All Articles
      </Link>

      {/* Header */}
      <div className="max-w-3xl space-y-5 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
            <CalendarDays className="w-3.5 h-3.5" /> {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
            <Clock className="w-3.5 h-3.5" /> {article.readTime} min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 p-[1px]">
              <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-brand-500" />
              </div>
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Volta Jebaprashanth</p>
              <p className="text-[11px] text-zinc-400">Creator, selenium-mcp</p>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-500 hover:border-brand-500/40 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content + TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
        <article className="min-w-0 max-w-2xl">
          {/* Cover image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-12 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
            <img src={article.cover} alt="" className="w-full h-full object-cover" />
          </div>

          <ArticleContent markdown={article.content} />

          {/* Try-it CTA */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent space-y-4">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
              Try selenium-mcp on your own Selenium suite
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              MIT-licensed, ships as a single jar, and drops into an MCP-capable client in minutes.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/docs/installation"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4" /> Quickstart & Installation
              </Link>
              <a
                href="https://github.com/Volta-Jebaprashanth/selenium-mcp"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-500/50 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
              >
                <Github className="w-4 h-4" /> View on GitHub
              </a>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            {prev ? <PagerCard article={prev} direction="prev" /> : <div className="flex-1" />}
            {next ? <PagerCard article={next} direction="next" /> : <div className="flex-1" />}
          </div>
        </article>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              <h4 className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                <List className="w-3.5 h-3.5" /> On this page
              </h4>
              <ul className="space-y-2.5 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="block text-xs text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 leading-snug transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
