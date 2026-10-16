import React from 'react';
import { Layers, Terminal, Cpu, ShieldCheck, CheckCircle2, AlertTriangle, ArrowDown, FileCode, Globe, Sparkles } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function DocsArchitecture() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <Layers className="w-3.5 h-3.5" /> Documentation / Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          System Architecture & Internals
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          How selenium-mcp connects AI agents to the Java ecosystem for building production UI + API test automation scripts.
        </p>
      </div>

      {/* AGENT TEST SCRIPT GENERATION FLOW */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-brand-500" /> AI Agent Script Authoring Architecture (UI + API)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          selenium-mcp bridges the gap between LLM coding agents and Java test repositories. Rather than blind static code generation, agents execute live UI/API inspection tools to write verified, executable Java test suites.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="text-brand-500 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> 1. Live Inspection
            </div>
            <p className="font-sans text-zinc-600 dark:text-zinc-400 text-[11px]">
              Agent calls <code className="text-brand-500">getPageElementsFiltered</code> and <code className="text-brand-500">ApiTools</code> to capture live DOM locators with ancestor trees and test API endpoints.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="text-emerald-500 font-bold flex items-center gap-1.5">
              <FileCode className="w-4 h-4" /> 2. Java Code Generation
            </div>
            <p className="font-sans text-zinc-600 dark:text-zinc-400 text-[11px]">
              Agent outputs standard Java classes (Page Object Model + <code className="text-emerald-400">@FindBy</code> + RestAssured + TestNG/JUnit 5) directly into your Maven/Gradle repo.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
            <div className="text-amber-500 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 3. Verification & Healing
            </div>
            <p className="font-sans text-zinc-600 dark:text-zinc-400 text-[11px]">
              Agent monitors CDP logs and test run outputs to automatically repair broken locators and API payload changes.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Layer Visual Diagram */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          3-Layer Core Server Stack Architecture
        </h2>

        <div className="space-y-4 font-mono">
          {/* Layer 1 */}
          <div className="p-6 rounded-2xl border border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/10 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Layer 1: tools/ (MCP Protocol Layer)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500 text-white font-bold">
                Spring AI MCP Starter
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">
              @McpTool Annotated Controllers
            </h3>
            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400 mt-1">
              Handles JSON-RPC request parameter validation, type coercion, and precondition checks. Translates WebDriver exceptions into clean, readable text strings for the AI agent context. Contains <strong>zero Selenium automation code</strong>.
            </p>
          </div>

          <div className="flex justify-center text-brand-500 py-1">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Layer 2 */}
          <div className="p-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Layer 2: webdriver/ (Selenium Core Facade)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                Zero MCP/Spring Dependency
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">
              Tools.java & Automation Collaborators
            </h3>
            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400 mt-1 mb-3">
              Pure Java automation facade backed by specialized collaborators:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">BrowserFactory</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">BrowserSession</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">PageSourceInspector</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">NetworkMonitor</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">ConsoleLogMonitor</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">ElementInteractor</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">Locators</div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">Navigator</div>
            </div>
          </div>

          <div className="flex justify-center text-brand-500 py-1">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Layer 3 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Layer 3: http/ (Standalone REST Client)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                Independent HTTP Engine
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">
              ApiClient.java
            </h3>
            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400 mt-1">
              Decoupled REST client backing <code className="text-brand-500">ApiTools</code>. Allows executing API requests directly in the same conversation turn to seed database state or verify backends.
            </p>
          </div>
        </div>
      </section>

      {/* Stdio Transport & Zero-stdout Logging */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-500" /> Stdio Transport & Stream Integrity
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          selenium-mcp communicates with AI clients (Claude Desktop, Cursor, Claude Code) over <strong className="text-zinc-900 dark:text-white">stdio</strong> using standard JSON-RPC protocol frames.
        </p>

        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 space-y-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Why zero console logging is enforced:</h3>
          <p>
            Because the process's standard output stream (<code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">stdout</code>) <em>IS</em> the binary protocol transport channel, any unformatted log string (e.g. SLF4J, Logback, or Selenium driver noise) written to stdout will corrupt the JSON-RPC packet stream and crash the AI connection.
          </p>
          <p>
             selenium-mcp redirects all framework and driver logging to a size-rotated log file: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">~/.selenium-mcp/mcp-server.log</code> when launched via npx, or <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">mcp-server.log</code> in the working directory when running the jar directly (override with <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">--logging.file.name=...</code>). Standard error (<code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">stderr</code>) is reserved exclusively for unhandled fatal JVM errors.
          </p>
        </div>
      </section>

      {/* CDP Notes & Firefox fallback */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-500" /> Chrome DevTools Protocol & Browser Support
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-2">
            <h3 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Chrome & Edge Full Support
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Full access to CDP tools: network capture, request mocking/blocking, throttling emulation, and browser console log capture via Selenium 4 DevTools API.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 space-y-2">
            <h3 className="font-bold text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Firefox Graceful Fallback
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Standard WebDriver tools work 100% on Firefox. If a CDP tool is invoked on Firefox, selenium-mcp returns a clear explanatory message instead of throwing an unhandled exception.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
