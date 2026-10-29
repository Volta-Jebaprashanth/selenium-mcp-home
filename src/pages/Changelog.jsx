import React from 'react';
import { Terminal, Github, ExternalLink, Sparkles, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';

export default function Changelog() {
  const releases = [
    {
      version: 'v1.0.26',
      date: '2026-10-29',
      title: 'New npm Package & Domain: voltajeba',
      latest: true,
      changes: [
        'The docs site moved from selenium-mcp.xpathy.uk (the old address) to selenium-mcp.voltajeba.com.',
        'The npm package is now @voltajeba/selenium-mcp, with platform packages @voltajeba/selenium-mcp-<platform>-<arch>: npx -y @voltajeba/selenium-mcp.',
        '@xpathy/selenium-mcp is still released with every version as an alias that installs and runs it, so existing configs keep working.',
        'Java packages moved from uk.xpathy.selenium.mcp to com.voltajeba.selenium.mcp (Maven groupId too). Code that uses webdriver/Tools or http/ApiClient as a library needs its imports updated.',
        'CI retries npm publishes that hit a transparency-log 409.'
      ]
    },
    {
      version: 'v1.0.21',
      date: '2026-10-29',
      title: 'Wait Strategy for Generated Tests (Auto-Wait)',
      latest: false,
      changes: [
        'setAutoWait / getAutoWait tools, plus implicitWaitSeconds, networkIdleMillis and animationIdleMillis on openBrowser, connectToBrowser and launchDebugBrowser. Sessions still default to plain Selenium; the server recommends networkIdleMillis=500 and animationIdleMillis=300.',
        'With a wait strategy set, every action waits afterwards for fetch/XHR requests and then animations to settle, using an in-page tracker. Each action reports what it set off and which wait the generated test needs at that step.',
        'Failures that a missing wait causes (no-such-element, click-intercepted, not-interactable, stale element) come with a hint saying what the test needs before that step.',
        'getWaitReport: the steps whose generated code needs a wait. closeBrowser prints it before discarding it.',
        'getWaitCodeSnippets: usage rules, driver setup lines and a Waits helper class (Java 11+, Selenium 4) that runs the same page checks as the session.',
        'Server instructions sent to MCP clients on connect, describing the wait workflow.'
      ]
    },
    {
      version: 'v1.0.19',
      date: '2026-10-23',
      title: 'Multiple Browser Sessions & Agent-Friendly Element Tools',
      latest: false,
      changes: [
        'Multiple browser sessions: openBrowser, connectToBrowser and launchDebugBrowser take an optional session name to run several browsers at once (up to --selenium.mcp.max-sessions, default 5). New listSessions and switchSession tools; closeBrowser takes session and all.',
        'While several sessions are open, status messages and tool failures start with [session] so they say which browser they came from.',
        'text and partialText locator strategies: find an element by the words on screen, e.g. text=Create Put, without writing XPath.',
        'isClickable tool, and visible / enabled / clickable flags (plus coveredBy) on interactive elements in getPageElements and on every match in getPageElementsFiltered. Clickable means displayed, enabled and not covered by another element such as a loading overlay.',
        'click retries while another element intercepts the click, up to waitIfCoveredSeconds (default 5), and reports when its target was covered. waitForClickable also waits until nothing covers the target.',
        'index / visibleOnly on every remaining single-element tool (element state and geometry, waits, selects, uploadFile, switchToFrame, clickAndHold, dragAndDropByOffset), and visibleOnly on tools that act on every match.',
        'takeScreenshot and takeElementScreenshot return MCP image content instead of a base64 string, so clients can show the image to the model directly.',
        'Browsers are closed (attached ones disconnected) when the server shuts down. On Windows the npm launcher runs the server detached, so a client killing the launcher no longer orphans chromedriver and browser processes.',
        'A browser closed by hand or crashed no longer stays "open": tools say the browser is gone, and the dead session is dropped.',
        'Spring Boot bumped to 4.1.2. CI runs the headless Chrome integration tests on every build.'
      ]
    },
    {
      version: 'v1.0.16',
      date: '2026-10-16',
      title: 'npx Install (No Java Required) + Everything Since v1.0.2',
      latest: false,
      changes: [
        'npm distribution with a bundled Java runtime: npx -y @xpathy/selenium-mcp (the old package name; now @voltajeba/selenium-mcp), no JDK install needed (Windows x64, Linux x64, macOS Intel/Apple Silicon). Published via npm trusted publishing with provenance.',
        'The launcher repairs an npx cache that is missing its platform package.',
        'Tool groups: --selenium.mcp.tool-groups / --selenium.mcp.exclude-tool-groups launch arguments to load fewer tools.',
        'connectToBrowser and launchDebugBrowser: attach to a Chrome/Edge already running with remote debugging, e.g. to inspect the live page where a test failed.',
        'takeScreenshot fullPage option for capturing the whole scrollable page (Chrome/Edge via CDP, Firefox natively).',
        'addInitScript / removeInitScript: JavaScript that runs on every page load in the current tab (Chrome/Edge).',
        'executeScript timeoutMs option to override the 30-second script timeout per call; objects and arrays now come back as JSON.',
        'Optional index and visibleOnly parameters on click, sendKeys, getText, getAttribute, hover, doubleClick, rightClick, scrollIntoView and takeElementScreenshot to target the nth (visible) match.',
        "Tool error messages are now the driver's one-line message, without Selenium's build/system/session diagnostics.",
        'Selenium bumped to 4.51.0 (CDP for Chrome 153–155), fixing console and network capture on newer Chrome.',
        'Opt-in headless Chrome integration test (mvn test -Dselenium.it=true).'
      ]
    },
    {
      version: 'v1.0.2',
      date: '2026-08-01',
      title: 'Initial Release & Full Feature Set',
      latest: false,
      changes: [
        'Initial public release of selenium-mcp server.',
        'Added Chrome DevTools Protocol (CDP) support via Selenium 4 DevTools API.',
        'Introduced NetworkTools category: startNetworkCapture, mockResponse, blockRequests, setNetworkConditions.',
        'Added startConsoleCapture and getConsoleLogs for JS browser console monitoring.',
        'Added standalone ApiTools HTTP client (httpGet, httpPost, httpPut, httpDelete, httpPatch).',
        'Added flagship getPageElementsFiltered tool with configurable depth capping and sibling indexing.',
        'Added automated WebDriverManager driver caching for Chrome, Edge, and Firefox.',
        'Enforced zero-stdout logging policy with rotating log file appender to guarantee stdio stream safety.',
        'Full support for stdio JSON-RPC protocol transport.',
        'Spring AI MCP server starter integration.',
        'MIT open source license.'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <Tag className="w-3.5 h-3.5" /> Project Releases & Updates
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
              Changelog
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1">
              Semantic versioning release history for selenium-mcp.
            </p>
          </div>

          <a
            href="https://github.com/Volta-Jebaprashanth/selenium-mcp/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium transition-colors self-start sm:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Release Timeline */}
      <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
        {releases.map((rel) => (
          <div key={rel.version} className="relative pl-10 sm:pl-14 space-y-3">
            {/* Timeline Dot */}
            <div className={`absolute left-2.5 sm:left-4 top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white dark:bg-zinc-950 ${
              rel.latest ? 'border-brand-500 ring-4 ring-brand-500/20' : 'border-zinc-400 dark:border-zinc-600'
            }`} />

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-lg font-extrabold text-zinc-900 dark:text-white">
                {rel.version}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                Released {rel.date}
              </span>
              {rel.latest && (
                <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Latest Release
                </span>
              )}
            </div>

            <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-200">
              {rel.title}
            </h3>

            <ul className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {rel.changes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
