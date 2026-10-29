import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Sparkles, CalendarDays } from 'lucide-react';
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articlesData';
import ArticleCover from '../components/ArticleCover';

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function CategoryBadge({ category, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 ${className}`}>
      {category}
    </span>
  );
}

function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden hover:border-brand-500/50 hover:-translate-y-1 hover:shadow-glow-orange-sm transition-all duration-200"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <ArticleCover
          src={article.cover}
          loading="lazy"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={article.category} />
          <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono shrink-0">
            <Clock className="w-3 h-3" /> {article.readTime} min read
          </span>
        </div>
        <h3 className="font-bold text-base text-zinc-900 dark:text-white leading-snug group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
            <CalendarDays className="w-3 h-3" /> {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [featured, ...rest] = ARTICLES;

  const filtered = useMemo(() => {
    if (selectedCategory === 'ALL') return rest;
    return rest.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, rest]);

  const showFeatured = selectedCategory === 'ALL';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <BookOpen className="w-3.5 h-3.5" /> Field Notes & Deep Dives
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
              Articles
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Notes on why selenium-mcp exists, how its tools actually work, and how Java/Selenium teams are putting it to use — written by the person building it.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'ALL'
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          All Articles ({ARTICLES.length})
        </button>
        {ARTICLE_CATEGORIES.map((cat) => {
          const count = ARTICLES.filter((a) => a.category === cat.id).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white font-bold shadow-glow-orange-sm'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat.label} <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Featured Article */}
      {showFeatured && (
        <Link
          to={`/articles/${featured.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden hover:border-brand-500/50 transition-all duration-200"
        >
          <div className="aspect-[16/9] lg:aspect-auto overflow-hidden bg-zinc-100 dark:bg-zinc-900 order-1 lg:order-2">
            <ArticleCover
              src={featured.cover}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-center space-y-4 order-2 lg:order-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Start Here
              </span>
              <CategoryBadge category={featured.category} />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white leading-snug group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono pt-1">
              <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {formatDate(featured.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime} min read</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 pt-2">
              Read the full article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((article) => <ArticleCard key={article.slug} article={article} />)
        ) : (
          <div className="col-span-full p-12 text-center text-zinc-400 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            No articles found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
