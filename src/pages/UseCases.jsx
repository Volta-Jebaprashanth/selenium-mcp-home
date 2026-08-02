import React, { useState } from 'react';
import { 
  Sparkles, Check, Copy, ArrowRight, Activity, Terminal, Globe, MousePointer, ShieldCheck, Zap, FileCode, RefreshCw
} from 'lucide-react';

export default function UseCases() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const useCasesList = [
    {
      title: 'Authoring Java Page Object Model (POM) & TestNG Suites',
      prompt: 'Inspect https://app.example.com/checkout, extract all form input locators using getPageElementsFiltered, and generate a modular Java Page Object class with @FindBy annotations and a TestNG @Test execution method.',
      explanation: 'The agent uses selenium-mcp to discover precise DOM hierarchy, then authors production-grade Java Page Object Model classes directly in your Maven or Gradle repository.',
      toolsUsed: ['openBrowser', 'navigate', 'getPageElementsFiltered', 'FileTools'],
      badge: 'Java Script Generation'
    },
    {
      title: 'Combined UI + API Test Automation (RestAssured Seeding)',
      prompt: 'Send a POST request via ApiTools to /api/v1/users to seed a test admin account, then launch Chrome, fill the UI login form with those credentials, and verify dashboard authorization in Java.',
      explanation: 'Demonstrates end-to-end hybrid UI + API testing. The agent seeds backend state via REST API and executes browser UI validation in a single continuous workflow.',
      toolsUsed: ['httpPost', 'openBrowser', 'navigate', 'sendKeys', 'click', 'waitForPageLoad'],
      badge: 'UI + API Combined'
    },
    {
      title: 'Self-Healing Broken Selenium Java Locators',
      prompt: 'Run our existing CheckoutTest.java class. If an element locator fails due to a recent DOM redesign, inspect the live browser state, discover the updated CSS/XPath selector, and refactor the Java test file.',
      explanation: 'Empowers agents to automatically detect broken Selenium locators, analyze live page changes via depth-capped JSON trees, and patch existing Java test code without human intervention.',
      toolsUsed: ['getPageElementsFiltered', 'startConsoleCapture', 'getConsoleLogs'],
      badge: 'Self-Healing Test Suite'
    },
    {
      title: 'CDP Network Intercept & Mocking for Edge-Case Automation',
      prompt: 'Mock the /api/v1/payment-status endpoint to return a 500 Internal Error, click the checkout submit button, and generate a Java test method that asserts error handling UI behavior.',
      explanation: 'Intercepts HTTP traffic at the Chrome DevTools Protocol (CDP) layer to generate robust Java test cases for hard-to-reproduce backend failure modes.',
      toolsUsed: ['mockResponse', 'click', 'getText', 'clearMockResponses'],
      badge: 'CDP Network Mocking'
    },
    {
      title: 'Ad & Analytics Blocking for Flake-Free Java Execution',
      prompt: 'Block third-party tracker requests (*analytics.google.com*, *facebook.net*) during browser execution, then record network idle timings to output robust WebDriverWait timeouts in Java.',
      explanation: 'Filters out slow external scripts to ensure generated Java Selenium tests run fast, deterministically, and without unexpected dynamic element shifts.',
      toolsUsed: ['blockRequests', 'waitForNetworkIdle', 'navigate'],
      badge: 'CDP Flake Reduction'
    },
    {
      title: 'Multi-Tab & Popup Verification Script Generation',
      prompt: 'Click the "Export Report PDF" button, switch context to the newly opened popup window, verify its URL and heading, and output a clean Java Selenium WindowHandle helper method.',
      explanation: 'Navigates multi-window workflows and generates clean Java helper utilities for managing browser tabs and alert dialogs.',
      toolsUsed: ['click', 'getWindowHandles', 'switchToWindow', 'getTitle'],
      badge: 'Multi-Window Java Utility'
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
          <Sparkles className="w-3.5 h-3.5" /> Example Agent Prompts & Java Automation Workflows
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Real-World AI Agent Workflows for Java QA
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          See how AI coding assistants like Claude Desktop, Cursor, and Windsurf leverage <strong className="text-zinc-900 dark:text-white">selenium-mcp</strong> to inspect live applications, call REST APIs, and author production-grade Java automation scripts (Selenium, RestAssured, TestNG, JUnit 5).
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
                    <Terminal className="w-3.5 h-3.5" /> Sample Agent Prompt
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

