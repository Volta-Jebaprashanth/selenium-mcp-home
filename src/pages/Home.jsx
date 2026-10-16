import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, 
  CheckCircle2, XCircle, Code2, Globe, Cpu, Search, Check, Copy, Activity, MousePointer,
  FileCode, Play, RefreshCw, Server
} from 'lucide-react';
import { COMPARISON_MATRIX, ALL_TOOLS } from '../data/toolsData';

export default function Home() {
  const [activeDemoTab, setActiveDemoTab] = useState('agent-workflow');
  const [copiedConfig, setCopiedConfig] = useState(false);

  const sampleConfig = `{
  "mcpServers": {
    "selenium-mcp": {
      "command": "npx",
      "args": ["-y", "@xpathy/selenium-mcp"]
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
                <span>AI Agent Driven Test Automation for Java (UI + API)</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                  Generate Automated Test Cases in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500">Minutes, Not Hours.</span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  Build production-grade Java automation scripts with autonomous AI agents.
                </p>
              </div>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                By combining <strong className="text-zinc-900 dark:text-white font-semibold">selenium-mcp</strong> with AI coding agents, the system automatically explores your web applications, dynamically maps UI components, tracks API endpoints, and generates high-quality test automation code (UI + API) that is ready to ship within minutes.
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
                  <span>Browse {ALL_TOOLS.length} Tools</span>
                </Link>
              </div>

              {/* Quick stats pills */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> UI + API Java Automation</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> {ALL_TOOLS.length} Selenium + API Tools</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> TestNG & JUnit 5 POM</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-500" /> One npx command, no Java install</span>
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
                    <span className="ml-2 font-mono text-zinc-400">Agent Script Authoring Flow</span>
                  </div>
                  <div className="flex bg-zinc-800 p-0.5 rounded-lg text-[11px] font-mono">
                    <button
                      onClick={() => setActiveDemoTab('agent-workflow')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        activeDemoTab === 'agent-workflow' ? 'bg-brand-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      MCP Discovery
                    </button>
                    <button
                      onClick={() => setActiveDemoTab('java-code')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        activeDemoTab === 'java-code' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Generated Java
                    </button>
                    <button
                      onClick={() => setActiveDemoTab('self-heal')}
                      className={`px-2 py-1 rounded-md transition-all ${
                        activeDemoTab === 'self-heal' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Self-Healing
                    </button>
                  </div>
                </div>

                {/* Body code visualizer */}
                <div className="p-4 font-mono text-xs leading-relaxed min-h-[330px] flex flex-col justify-between">
                  {activeDemoTab === 'agent-workflow' && (
                    <div>
                      <div className="text-emerald-400 mb-2 flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Step 1: Agent Explores UI & Tracks API Contracts (CDP)</span>
                      </div>
                      <pre className="text-zinc-300 overflow-x-auto text-[11px]">
{`// 1. Discover resilient UI locators via getPageElementsFiltered
getPageElementsFiltered(locatorType: "css", locatorValue: "button[type='submit']", includeAncestors: true)
-> Selector Found: "form#login-form button#submit-login"

// 2. Track background HTTP traffic & API contracts in real-time
startNetworkCapture()
// Clicking 'Submit' triggers background API request:
-> POST https://api.app.com/v1/auth/login [Status: 200]
-> Schema: { "username": "string", "role": "string", "token": "JWT" }`}
                      </pre>
                      <div className="mt-4 p-2.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px] leading-relaxed">
                        ✓ <strong>Agent Discovery:</strong> Scans the DOM and passively tracks network calls. After exploration, it can automate a <strong>UI Flow</strong>, <strong>API Flow</strong>, or <strong>Hybrid Flow</strong> based on your prompt.
                      </div>
                    </div>
                  )}

                  {activeDemoTab === 'java-code' && (
                    <div>
                      <div className="text-emerald-400 mb-2 flex items-center gap-1.5 font-semibold">
                        <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Step 2: Generate UI, API, or Hybrid Java Scripts</span>
                      </div>
                      <pre className="text-zinc-300 overflow-x-auto text-[11px]">
{`@Test
public void testAdminCheckoutFlow() {
    // 1. API Flow: Fast user pre-seeding using RestAssured
    String token = RestAssured.given()
        .contentType(ContentType.JSON)
        .body(new UserPayload("qa_user", "ADMIN"))
        .post("/api/v1/auth").jsonPath().get("token");

    // 2. UI Flow: Web Browser automation using Page Objects
    loginPage.open();
    loginPage.loginWithToken(token);
    Assert.assertTrue(dashboardPage.isDisplayed());
}`}
                      </pre>
                      <div className="mt-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] leading-relaxed">
                        ✓ <strong>Automation Types:</strong> Generates clean Java POM code. Seamlessly supports pure UI (Selenium), pure API (RestAssured), or hybrid flows.
                      </div>
                    </div>
                  )}

                  {activeDemoTab === 'self-heal' && (
                    <div>
                      <div className="text-amber-400 mb-2 flex items-center gap-1.5 font-semibold">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        <span>Step 3: Agent Detects UI Drift & Self-Heals Java Code</span>
                      </div>
                      <pre className="text-zinc-300 overflow-x-auto text-[11px]">
{`// CDP Log Alert: NoSuchElementException for 'button#submit-login'
// Agent re-scans live DOM using getPageElementsFiltered:
// New element locator detected: 'button[data-testid="btn-login-submit"]'

// Agent automatically patches LoginPage.java:
- @FindBy(id = "submit-login")
+ @FindBy(css = "button[data-testid='btn-login-submit']")
  private WebElement submitButton;`}
                      </pre>
                      <div className="mt-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px]">
                        ⚡ <strong>Self-Healing:</strong> Zero broken builds when UI changes occur!
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 flex justify-between items-center">
                    <span>Protocol: stdio (JSON-RPC)</span>
                    <span className="text-brand-400">Target Ecosystem: Java (Selenium + RestAssured)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* IMPRESSIVE AGENT AUTOPILOT CAPABILITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-amber-500/5 dark:from-brand-500/10 dark:to-amber-500/10 blur-3xl rounded-3xl -z-10" />
        
        <div className="p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-mono font-semibold">
              State-of-the-Art AI Testing Autopilot
            </span>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              Watch the Agent Explore & Generate Code in Real-Time
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Unlike static code generators, our model context protocol server turns LLMs into active QA engineers that run a continuous exploration and feedback loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 border-l-2 border-brand-500 pl-4">
              <div className="font-mono text-xs text-brand-500 dark:text-brand-400 font-bold uppercase tracking-wider">01. Auto-Exploration</div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Semantic DOM Mapping</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The agent queries selenium-mcp to scan the active page's DOM. It identifies interactive elements, retrieves clean ancestor trees, and maps out user flows without sending large, expensive raw HTML payloads to the LLM.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-orange-500 pl-4">
              <div className="font-mono text-xs text-orange-500 dark:text-orange-400 font-bold uppercase tracking-wider">02. Hybrid E2E Synthesis</div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Synchronized UI + API Code</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                It inspects API payload structures using browser network intercepts, then writes unified Java automation scripts using RestAssured for fast background setups and Selenium WebDriver for frontend verification.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-amber-500 pl-4">
              <div className="font-mono text-xs text-amber-500 dark:text-amber-400 font-bold uppercase tracking-wider">03. Intelligent Self-Healing</div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Zero Broken Builds</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If a button ID changes or the structure drifts, the agent catches the error, auto-inspects the modified DOM, finds the updated element locator, patches the Page Object file directly, and verifies the build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES GRID (6 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-brand-500 font-bold">
            Key Capabilities
          </h2>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            Everything your agent needs to build Java automation scripts
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            A comprehensive MCP toolkit designed for Java QA automation engineers and AI coding assistants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Java Test Script Generation
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Empower agents to generate standard Java Page Object Model (POM) classes, `@FindBy` locators, TestNG, and JUnit 5 test suites.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              UI + API Unified Testing
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Combine REST API seeding (`ApiTools` / RestAssured) and browser UI actions in single unified agent execution turns.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Structured Element Discovery
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Token-efficient DOM inspection returning exact ancestor chains so agents discover resilient CSS & XPath locators on the first attempt.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Self-Healing Test Maintenance
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When UI layouts update, the agent inspects live DOM deltas and refactors failing Selenium Java locators automatically.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              CDP DevTools Superpowers
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Passive network capture, request mocking & blocking, network throttling emulation, and browser console log monitoring via Selenium 4 CDP.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-brand-500/50 transition-all group space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Java Ecosystem Native
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Spring Boot + Spring AI core, shipped on npm with its own Java runtime. Drivers are managed automatically by WebDriverManager, so there is nothing else to install.
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
            * Disclaimer: selenium-mcp is the premier Java-native MCP server providing structured element discovery, API testing, and automated Java script authoring for enterprise QA.
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
                Paste one npx entry into Claude Code, Cursor, VS Code, or Claude Desktop. The npm package bundles its own Java runtime, so all you need is Node.js and a browser. Prefer your own JDK? The standalone jar still works.
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
                  <span>.mcp.json · claude_desktop_config.json</span>
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

