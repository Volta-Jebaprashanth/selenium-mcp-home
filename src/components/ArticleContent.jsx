import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { ExternalLink, Quote } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { resolveInternalArticleLink } from '../data/articlesData';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function headingText(children) {
  return React.Children.toArray(children).map((c) => (typeof c === 'string' ? c : '')).join('');
}

// The page hero already renders the article's H1 title, so strip the leading
// "# Title" line from the markdown body to avoid showing it twice.
function stripLeadingH1(markdown) {
  return markdown.replace(/^\s*#\s+.+?\n+/, '');
}

// Pulls "## Heading" lines out of the raw markdown for the sidebar table of contents,
// using the same slugify() as the h2 renderer so anchor links line up.
export function extractHeadings(markdown) {
  const lines = stripLeadingH1(markdown).split('\n');
  return lines
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, '').trim();
      return { text, id: slugify(text) };
    });
}

export default function ArticleContent({ markdown }) {
  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 id={slugify(headingText(children))} className="scroll-mt-28 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-12 mb-4 first:mt-0">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 id={slugify(headingText(children))} className="scroll-mt-28 text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-14 mb-5 pb-3 border-b border-zinc-200 dark:border-zinc-800 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={slugify(headingText(children))} className="scroll-mt-28 text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[15px] sm:text-base leading-[1.85] text-zinc-600 dark:text-zinc-300 mb-5">
              {children}
            </p>
          ),
          a: ({ href = '', children }) => {
            const internal = resolveInternalArticleLink(href);
            if (internal) {
              return (
                <Link to={internal} className="font-medium text-brand-600 dark:text-brand-400 underline decoration-brand-500/30 hover:decoration-brand-500 underline-offset-2 transition-colors">
                  {children}
                </Link>
              );
            }
            const isExternal = /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="font-medium text-brand-600 dark:text-brand-400 underline decoration-brand-500/30 hover:decoration-brand-500 underline-offset-2 transition-colors inline-flex items-center gap-0.5"
              >
                {children}
                {isExternal && <ExternalLink className="w-3 h-3 shrink-0 mb-2" />}
              </a>
            );
          },
          strong: ({ children }) => (
            <strong className="font-bold text-zinc-900 dark:text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="not-italic my-8 flex gap-3 rounded-2xl border border-brand-500/20 bg-brand-500/5 dark:bg-brand-500/10 px-5 py-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed [&_p]:mb-0 [&_a]:whitespace-normal">
              <Quote className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
              <div>{children}</div>
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 space-y-2.5 pl-1 marker:text-brand-500 list-disc list-inside text-[15px] sm:text-base text-zinc-600 dark:text-zinc-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 space-y-2.5 pl-1 marker:text-brand-500 marker:font-semibold list-decimal list-inside text-[15px] sm:text-base text-zinc-600 dark:text-zinc-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
          hr: () => <hr className="my-10 border-zinc-200 dark:border-zinc-800" />,
          img: ({ src, alt }) => (
            <img src={src} alt={alt} loading="lazy" className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 my-8" />
          ),
          code: ({ className, children }) => {
            // react-markdown (v9+) no longer passes an `inline` flag — a fenced block is the
            // only case that gets a `language-*` className, so that's what distinguishes it
            // from an inline `code` span (per react-markdown's own docs).
            const match = /language-(\w+)/.exec(className || '');
            const text = String(children).replace(/\n$/, '');
            if (!match) {
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-brand-600 dark:text-brand-400 font-mono text-[0.85em] break-words">
                  {text}
                </code>
              );
            }
            return <CodeBlock code={text} language={match[1]} />;
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm text-left border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-50 dark:bg-zinc-900 text-xs uppercase tracking-wider font-mono text-zinc-500 dark:text-zinc-400">
              {children}
            </thead>
          ),
          th: ({ children }) => <th className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 font-semibold">{children}</th>,
          td: ({ children }) => <td className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-300">{children}</td>,
        }}
      >
        {stripLeadingH1(markdown)}
      </ReactMarkdown>
    </div>
  );
}
