import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, 
  CheckCircle2, XCircle, Code2, Globe, Cpu, Search, Check, Copy, Activity, MousePointer 
} from 'lucide-react';
import { COMPARISON_MATRIX } from '../data/toolsData';

export default function Home() {
  const [activeDemoTab, setActiveDemoTab] = useState('structured');
  const [copiedConfig, setCopiedConfig] = useState(false);

  const sampleConfig = `{
  "mcpServers": {
    "selenium-mcp": {
      "command": "java",
      "args": ["-jar", "/path/to/selenium-mcp.jar"]
    }
  }
}`;

  const copyConfig = () => {
    navigator.clipboard.writeText(sampleConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-solar-grid">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 dark:bg-brand-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Playwright-MCP-style structured discovery for Java & Selenium</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Give your AI agent eyes on the browser — <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500">without drowning it in HTML.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                <strong className="text-zinc-900 dark:text-white font-semibold">selenium-mcp</strong> is a Java-based Model Context Protocol server (Spring Boot + Spring AI) that enables Claude, Cursor, and AI coding assistants to drive Chrome, Firefox, and Edge through Selenium WebDriver — with token-efficient structured JSON element trees instead of raw page-source dumps.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/docs/installation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-glow-orange transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Get Started in 2 Mins</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/docs/tools"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-brand-500/50 font-semibold text-sm transition-all"
                >
                  <Search className="w-4 h-4 text-brand-500" />
                  <span>Browse 112 Tools</span>
                </Link>
              </div>

              {/* Quick stats pills */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> ~90 Selenium Tools</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Chrome, Edge, Firefox</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Selenium 4 CDP</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> MIT Open Source</span>
              </div>
            </div>

            {/* Right Interactive Mock Visualizer */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
                {/* Header tabs */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 font-mono text-zinc-400">selenium-mcp vs Raw HTML</span>
                  </div>
                  <div className="flex bg-zinc-800 p-0.5 rounded-lg text-[11px] font-mono">
                    <button
                      onClick={() => setActiveDemoTab('structured')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeDemoTab === 'structured' ? 'bg-brand-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      selenium-mcp (JSON)
                    </button>
                    <button
                      onClick={() => setActiveDemoTab('raw')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeDemoTab === 'raw' ? 'bg-rose-900/80 text-rose-200 font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Standard (Raw HTML)
                    </button>
                  </div>
                </div>

                {/* Body code visualizer */}
                <div className="p-4 font-mono text-xs leading-relaxed min-h-[310px] flex flex-col justify-between">
                  {activeDemoTab === 'structured' ? (
                    <div>
                      <div className="text-emerald-400 mb-2 flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>getPageElementsFiltered("css", "button.login-btn")</span>
                      </div>
                      <pre className="text-zinc-300 overflow-x-auto text-[11px]">
{`[
  {
    "tag": "button",
    "id": "submit-login",
    "class": "btn btn-primary login-btn",
    "text": "Sign In to Account",
    "isDisplayed": true,
    "isEnabled": true,
    "ancestorChain": "html > body > main.container > form#login-form > div.actions",
    "siblingIndex": 2,
    "siblingCount": 3,
    "exactLocator": "form#login-form > div.actions > button#submit-login"
  }
]`}
                      </pre>
                      <div className="mt-4 p-2.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px]">
                        ✓ <strong>Result:</strong> Agent writes locator correctly on first try! <strong>320 tokens used</strong>.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-rose-400 mb-2 flex items-center gap-1.5 font-semibold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>getPageSource() [Raw 180,000 char dump]</span>
                      </div>
                      <pre className="text-zinc-500 overflow-x-auto text-[10px] line-clamp-[10]">
{`<!DOCTYPE html><html lang="en"><head><script>...</script><style>...</style></head><body><div class="header">...</div><div class="wrapper"><div class="container"><div class="row"><div class="col-md-6"><form id="login-form"><div class="form-group"><label>Email</label><input type="text"/></div><div class="form-group"><label text-muted>Password</label><input type="password"/></div><button class="btn btn-primary login-btn">Sign In</button></form></div></div>... [12,000 lines truncated]`}
                      </pre>
                      <div className="mt-4 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
                        ❌ <strong>Error:</strong> "element not unique, multiple matches found." <strong>42,000 tokens wasted!</strong>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 flex justify-between items-center">
                    <span>Protocol: stdio (JSON-RPC)</span>
                    <span className="text-brand-400">Token Efficiency: +94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-brand-500 font-bold mb-2">
            Why We Built selenium-mcp
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            The problem with traditional Selenium MCP servers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="p-8 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              The Old Way: HTML Context Bloat
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Most Selenium MCP servers force an AI agent to dump the entire page's HTML into its context, guess at a locator, and hope for the best — then fail with <code className="bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 px-1.5 py-0.5 rounded">"element not unique, multiple matches found"</code>. That's slow, expensive in context tokens, and incredibly flaky.
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-8 rounded-2xl border border-brand-500/30 bg-brand-500/5 dark:bg-brand-500/10 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 rounded-full bg-brand-500 text-white font-mono text-[10px] font-bold uppercase">
                The selenium-mcp Way
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Structured Ancestor & Sibling Discovery
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              selenium-mcp's flagship tool, <code className="text-brand-600 dark:text-brand-400 font-mono font-semibold">getPageElementsFiltered</code>, finds matching elements in a single call and returns its exact ancestor chain and sibling index — e.g. <code className="text-zinc-800 dark:text-zinc-200 font-mono text-xs">div.container &gt; form#login &gt; input:nth-of-type(2)</code> — so the agent writes locators that succeed on the first try!
            </p>
          </div>
        </div>
      </section>

      {/* KEY FEATURES GRID (6 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-brand-500 font-bold">
            Capabilities
          </h2>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            Built for serious browser automation
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Everything your AI coding assistant needs to interact with web apps, mock traffic, and verify tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Structured Element Discovery
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Token-efficient JSON element trees with ancestor/sibling tree context instead of unparsed raw HTML dumps.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MousePointer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Full Browser Control (112 Tools)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Complete coverage across navigation, explicit waits, alerts, iframes, tabs, cookies, screenshots, dropdowns, and file upload.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              CDP Superpowers (Chrome/Edge)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Passive network capture, request mocking & blocking, network throttling emulation, and browser console log monitoring via Selenium 4 DevTools.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Standalone REST Client
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hit REST APIs directly (GET/POST/PUT/PATCH/DELETE) in the same AI workflow as browser UI automation for combined E2E testing.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Multi-Browser & Auto Drivers
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Chrome, Firefox, and Edge supported out of the box with zero manual driver downloads thanks to integrated WebDriverManager.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Clean 3-Layer Architecture
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The WebDriver automation layer has zero Spring/MCP dependency, making it reusable directly in standard hand-written Java test suites.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-brand-500 font-bold">
            Competitive Advantage
          </h2>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            How selenium-mcp compares
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg bg-white dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  <th className="p-4 sm:p-5">Capability / Feature</th>
                  <th className="p-4 sm:p-5 text-brand-600 dark:text-brand-400 bg-brand-500/10 font-bold border-x border-brand-500/20">
                    selenium-mcp
                  </th>
                  <th className="p-4 sm:p-5">Other Selenium MCPs</th>
                  <th className="p-4 sm:p-5">Playwright MCP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs sm:text-sm">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 bg-brand-500/5 font-medium text-brand-600 dark:text-brand-300 border-x border-brand-500/20">
                      {row.seleniumMcp}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-500 dark:text-zinc-400">
                      {row.otherSelenium}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-500 dark:text-zinc-400">
                      {row.playwrightMcp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center">
            * Disclaimer: selenium-mcp is the only Selenium-based MCP server providing Playwright-MCP-style structured element discovery with exact ancestor chains.
          </div>
        </div>
      </section>

      {/* QUICKSTART TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-mono font-bold">
                Quickstart
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Connect your AI assistant in under 2 minutes
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Add the JAR path to your Claude Desktop, Claude Code, or Cursor configuration JSON file. selenium-mcp handles stdio JSON-RPC transport automatically.
              </p>
              <div className="pt-2">
                <Link
                  to="/docs/installation"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 font-semibold text-xs text-white transition-all shadow-glow-orange-sm"
                >
                  <span>View Full Installation Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/90 overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/80 border-b border-zinc-700 text-zinc-400 text-[11px]">
                  <span>claude_desktop_config.json</span>
                  <button
                    onClick={copyConfig}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedConfig ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 text-brand-300 overflow-x-auto">
                  {sampleConfig}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
