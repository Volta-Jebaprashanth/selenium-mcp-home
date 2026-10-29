// Article content (raw markdown) + cover images, statically imported so Vite can bundle/hash them.
import md01 from '../../medium-articles/01-why-i-built-a-java-selenium-mcp-server.md?raw';
import md02 from '../../medium-articles/02-stop-guessing-css-selectors-ai-agents.md?raw';
import md03 from '../../medium-articles/03-network-mocking-flaky-selenium-tests-cdp.md?raw';
import md04 from '../../medium-articles/04-rest-assured-ai-gap-api-ui-testing.md?raw';
import md05 from '../../medium-articles/05-architecture-tour-clean-selenium-layer.md?raw';
import md06 from '../../medium-articles/06-java-selenium-vs-playwright-mcp-enterprise-qa.md?raw';
import md07 from '../../medium-articles/07-getting-started-claude-code-maven-tutorial.md?raw';
import md08 from '../../medium-articles/08-legacy-enterprise-qa-ci-bridge.md?raw';
import md09 from '../../medium-articles/09-selenium-mcp-ecosystem-comparison-2026.md?raw';
import md10 from '../../medium-articles/10-waits-flakiness-ai-assisted-debugging.md?raw';
import md11 from '../../medium-articles/11-attach-ai-agent-to-failing-selenium-test-browser.md?raw';

import cover01 from '../../medium-articles/cover-images-for-articles/1.webp';
import cover02 from '../../medium-articles/cover-images-for-articles/2.webp';
import cover03 from '../../medium-articles/cover-images-for-articles/3.webp';
import cover04 from '../../medium-articles/cover-images-for-articles/4.webp';
import cover05 from '../../medium-articles/cover-images-for-articles/5.webp';
import cover06 from '../../medium-articles/cover-images-for-articles/6.webp';
import cover07 from '../../medium-articles/cover-images-for-articles/7.webp';
import cover08 from '../../medium-articles/cover-images-for-articles/8.webp';
import cover09 from '../../medium-articles/cover-images-for-articles/9.webp';
import cover10 from '../../medium-articles/cover-images-for-articles/10.webp';

export const ARTICLE_CATEGORIES = [
  { id: 'Announcement', label: 'Announcement' },
  { id: 'Deep Dive', label: 'Deep Dive' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'Comparison', label: 'Comparison' },
  { id: 'Tutorial', label: 'Tutorial' },
  { id: 'Enterprise', label: 'Enterprise' },
];

function readTime(markdown) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const RAW_ARTICLES = [
  {
    slug: 'why-i-built-a-java-selenium-mcp-server',
    order: 1,
    date: '2026-07-20',
    category: 'Announcement',
    title: 'Java and Selenium Test Engineers Have Been Left Out of the AI Coding Wave. Not Anymore.',
    excerpt: 'AI coding assistants can scaffold a TestNG class in seconds, then stall the moment they need a real locator. Here’s why I built a Java MCP server that gives them an actual Selenium session instead of a guess.',
    content: md01,
    cover: cover01,
  },
  {
    slug: 'stop-guessing-css-selectors-ai-agents',
    order: 2,
    date: '2026-07-22',
    category: 'Deep Dive',
    title: 'How to Get an AI Coding Assistant to Write a Correct Selenium Locator on the First Try',
    excerpt: 'A deep dive into getPageElementsFiltered — the flagship tool that returns every matching element’s ancestor chain and sibling position, so agents build locators that are unique by construction, not by luck.',
    content: md02,
    cover: cover02,
  },
  {
    slug: 'network-mocking-flaky-selenium-tests-cdp',
    order: 3,
    date: '2026-07-24',
    category: 'Deep Dive',
    title: 'Your Selenium Test Isn’t Flaky. Your Backend Is Just Slower Than Your Thread.sleep().',
    excerpt: 'Selenium 4 quietly shipped Chrome DevTools Protocol access. Here’s how NetworkTools puts it to work — network capture, mocking, throttling, and console logs — to kill flaky waits for good.',
    content: md03,
    cover: cover03,
  },
  {
    slug: 'rest-assured-ai-gap-api-ui-testing',
    order: 4,
    date: '2026-07-27',
    category: 'Deep Dive',
    title: 'REST Assured Doesn’t Have an Official AI Tool Yet. Here’s Why That Matters More Than It Sounds.',
    excerpt: 'Real end-to-end tests mix API seeding with UI flows. ApiTools gives an agent a standalone REST client in the same session as the browser tools, so it can write both halves of the test at once.',
    content: md04,
    cover: cover04,
  },
  {
    slug: 'architecture-tour-clean-selenium-layer',
    order: 5,
    date: '2026-07-29',
    category: 'Architecture',
    title: 'I Didn’t Want an AI Tool That Pollutes My Test Codebase. Here’s How the Architecture Prevents That.',
    excerpt: 'A tour of the three-layer split — tools/, webdriver/, http/ — that keeps the Selenium and REST layers usable as plain Java libraries, completely independent of MCP or Spring.',
    content: md05,
    cover: cover05,
  },
  {
    slug: 'java-selenium-vs-playwright-mcp-enterprise-qa',
    order: 6,
    date: '2026-07-31',
    category: 'Comparison',
    title: 'No, Your Team Doesn’t Need to Rewrite Its Selenium Suite in Playwright to Get AI-Assisted Testing',
    excerpt: 'Playwright MCP is genuinely good. It’s also not a realistic migration for most enterprise Selenium teams. An honest look at where the two overlap, and where they don’t.',
    content: md06,
    cover: cover06,
  },
  {
    slug: 'getting-started-claude-code-maven-tutorial',
    order: 7,
    date: '2026-08-01',
    category: 'Tutorial',
    title: 'From Zero to a Working Selenium Test, Written by an AI Agent That Can Actually See the Page',
    excerpt: 'A step-by-step walkthrough — grab the jar, wire it into Claude Code or Cursor, point it at a real Maven project, and get a passing Selenium test written against a page the agent actually inspected.',
    content: md07,
    cover: cover07,
  },
  {
    slug: 'legacy-enterprise-qa-ci-bridge',
    order: 8,
    date: '2026-08-03',
    category: 'Enterprise',
    title: 'Your Bank’s QA Team Isn’t Rewriting Ten Years of Selenium Tests for Anything. Here’s What They Can Actually Adopt.',
    excerpt: 'A development-time tool that changes nothing about your CI pipeline, your Grid, or your audit trail — and exactly how a cautious enterprise QA org should roll it out.',
    content: md08,
    cover: cover08,
  },
  {
    slug: 'selenium-mcp-ecosystem-comparison-2026',
    order: 9,
    date: '2026-08-05',
    category: 'Comparison',
    title: 'I Looked at Every Selenium MCP Server I Could Find Before Building My Own. Here’s the Actual Landscape.',
    excerpt: 'A survey of the existing Node, Python, and Grid-backed Selenium MCP servers — and the same three gaps missing across nearly all of them.',
    content: md09,
    cover: cover09,
  },
  {
    slug: 'waits-flakiness-ai-assisted-debugging',
    order: 10,
    date: '2026-08-07',
    category: 'Deep Dive',
    title: 'The Wait Condition You Actually Need Almost Never Matches the One You Wrote',
    excerpt: 'The full WaitTools surface, and how pairing it with CDP-backed network tools lets an agent diagnose the exact race condition behind a flaky test instead of you guessing at sleep values.',
    content: md10,
    cover: cover10,
  },
  {
    slug: 'attach-ai-agent-to-failing-selenium-test-browser',
    order: 11,
    date: '2026-10-21',
    category: 'Tutorial',
    title: 'I Stopped Reproducing Failed Selenium Tests. Now the AI Debugs Them in the Browser They Failed In',
    excerpt: 'One small change to your test base keeps the browser alive when a test fails. With launchDebugBrowser, the agent attaches to that exact page and debugs it, instead of you clicking back to step twelve by hand.',
    content: md11,
    // No cover image yet; the article pages fall back to a placeholder.
    cover: null,
  },
];

export const ARTICLES = RAW_ARTICLES
  .map((a) => ({ ...a, readTime: readTime(a.content) }))
  .sort((a, b) => a.order - b.order);

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAdjacentArticles(slug) {
  const byOrder = [...ARTICLES].sort((a, b) => a.order - b.order);
  const idx = byOrder.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? byOrder[idx - 1] : null,
    next: idx >= 0 && idx < byOrder.length - 1 ? byOrder[idx + 1] : null,
  };
}

// Maps the relative .md links used inside article bodies (e.g. "05-architecture-tour-....md")
// back to an in-site /articles/:slug route.
export function resolveInternalArticleLink(href) {
  const match = href.match(/(\d{2})-([a-z0-9-]+)\.md$/i);
  if (!match) return null;
  const order = parseInt(match[1], 10);
  const found = RAW_ARTICLES.find((a) => a.order === order);
  return found ? `/articles/${found.slug}` : null;
}
