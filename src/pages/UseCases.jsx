import React, { useState } from 'react';
import { 
  Sparkles, Check, Copy, ArrowRight, Activity, Terminal, Globe, MousePointer, ShieldCheck, Zap 
} from 'lucide-react';

export default function UseCases() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const useCasesList = [
    {
      title: 'Reliable Element Discovery & Locator Generation',
      prompt: 'Open Chrome, navigate to https://app.example.com/login, and find every <input> field on the page with a CSS locator I can use reliably in my tests.',
      explanation: 'Instead of dumping 50,000 characters of raw HTML, selenium-mcp inspects DOM hierarchy and returns compact element objects with exact ancestor chains and sibling indexes.',
      toolsUsed: ['openBrowser', 'navigate', 'getPageElementsFiltered'],
      badge: 'Flagship Tool'
    },
    {
      title: 'Automated Login, Page Load Verification & Visual Screenshot',
      prompt: 'Log into the staging environment using username "qa_admin" and password "secret123", wait for the dashboard page load, and capture a full viewport screenshot.',
      explanation: 'Performs form fill, clicks submit button, waits explicitly for document ready state, and saves a high-res screenshot artifact.',
      toolsUsed: ['sendKeys', 'click', 'waitForPageLoad', 'takeScreenshot'],
      badge: 'Core UI Automation'
    },
    {
      title: 'Network Idle Synchronization & JS Error Console Auditing',
      prompt: 'Fill out the multi-step checkout form, wait until all background HTTP network requests go idle, and check the browser console for any uncaught JS errors.',
      explanation: 'Uses Selenium 4 DevTools Protocol (CDP) to monitor pending in-flight requests and audit console log errors.',
      toolsUsed: ['sendKeys', 'click', 'waitForNetworkIdle', 'startConsoleCapture', 'getConsoleLogs'],
      badge: 'CDP Superpowers'
    },
    {
      title: 'API Request Mocking & Edge-Case UI Verification',
      prompt: 'Mock the /api/v1/cart endpoint to return a 200 OK response with an empty items array [], then reload the page and verify the UI displays the empty cart state.',
      explanation: 'Intercepts HTTP traffic at the DevTools network layer to test UI edge cases without modifying backend database state.',
      toolsUsed: ['mockResponse', 'refresh', 'getText'],
      badge: 'CDP Traffic Intercept'
    },
    {
      title: 'Combined UI + API Test Workflow (Database Seeding)',
      prompt: 'Send a POST request to /api/users to seed a new test user account, then open Chrome and log in with those newly created credentials.',
      explanation: 'Demonstrates combined API seeding and browser UI testing in a single unified AI conversation turn.',
      toolsUsed: ['ApiTools.httpPost', 'openBrowser', 'navigate', 'sendKeys', 'click'],
      badge: 'UI + API Combined'
    },
    {
      title: 'Ad & Tracking Network Blocking for Flake-Free Tests',
      prompt: 'Block all network requests to third-party ad and tracking domains (*google-analytics.com*, *doubleclick.net*) before navigating through the checkout workflow.',
      explanation: 'Prevents slow external ad scripts or analytics trackers from causing test timeouts or unexpected DOM shifts.',
      toolsUsed: ['blockRequests', 'navigate', 'click'],
      badge: 'CDP Network Blocking'
    }
  ];

  const handleCopyPrompt = (promptText, idx) => {
    navigator.clipboard.writeText(promptText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" /> Example Prompts & Workflows
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Real-World AI Agent Workflows
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          See how AI coding assistants like Claude Desktop, Cursor, and Windsurf leverage selenium-mcp to automate complex browser and API testing tasks.
        </p>
      </div>

      {/* Grid of 6 Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCasesList.map((uc, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  {uc.badge}
                </span>
                <span className="text-xs text-zinc-400 font-mono">Use Case #{idx + 1}</span>
              </div>

              <h3 className="font-bold text-lg text-zinc-900 dark:text-white leading-snug">
                {uc.title}
              </h3>

              {/* Prompt snippet box */}
              <div className="p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 space-y-2 relative group font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800/80 pb-2">
                  <span className="flex items-center gap-1.5 text-brand-400 font-semibold">
                    <Terminal className="w-3.5 h-3.5" /> Sample Prompt
                  </span>
                  <button
                    onClick={() => handleCopyPrompt(uc.prompt, idx)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-zinc-200 text-xs italic font-sans leading-relaxed">
                  "{uc.prompt}"
                </p>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {uc.explanation}
              </p>
            </div>

            {/* Executed Tools tags */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-zinc-400 font-bold block">
                Tools Executed Under Hood:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {uc.toolsUsed.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
