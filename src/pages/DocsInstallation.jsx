import React, { useState } from 'react';
import {
  Download, Terminal, AlertTriangle, Cpu, Globe, Folder, CheckCircle2, Package, Layers, Coffee, Info
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../data/toolsData';

const NPM_PACKAGE = '@xpathy/selenium-mcp';
const JAR_URL = 'https://github.com/Volta-Jebaprashanth/selenium-mcp/releases/latest/download/selenium-mcp.jar';
const VSCODE_INSTALL_URL =
  'https://insiders.vscode.dev/redirect/mcp/install?name=selenium-mcp&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40xpathy%2Fselenium-mcp%22%5D%7D';
const CURSOR_INSTALL_URL =
  'https://cursor.com/en/install-mcp?name=selenium-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB4cGF0aHkvc2VsZW5pdW0tbWNwIl19';

const CLIENTS = [
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'vscode', name: 'VS Code' },
  { id: 'claude-desktop', name: 'Claude Desktop' },
];

const SWITCHABLE_GROUPS = TOOL_CATEGORIES.filter((c) => c.group);

// Renders a server entry under the given top-level key ("mcpServers" or VS Code's "servers").
const serverJson = (rootKey, command, args) => `{
  "${rootKey}": {
    "selenium-mcp": {
      "command": "${command}",
      "args": [${args.map((a) => JSON.stringify(a)).join(', ')}]
    }
  }
}`;

export default function DocsInstallation() {
  const [activeClient, setActiveClient] = useState('claude-code');
  const [os, setOs] = useState('unix');
  const [excludedGroups, setExcludedGroups] = useState([]);
  const [jarPath, setJarPath] = useState('/absolute/path/to/selenium-mcp.jar');

  const toggleGroup = (group) =>
    setExcludedGroups((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]));

  const excludeArgs = excludedGroups.length
    ? [`--selenium.mcp.exclude-tool-groups=${SWITCHABLE_GROUPS.map((c) => c.group).filter((g) => excludedGroups.includes(g)).join(',')}`]
    : [];
  const loadedToolCount = ALL_TOOLS.filter(
    (t) => !excludedGroups.includes(TOOL_CATEGORIES.find((c) => c.id === t.category)?.group)
  ).length;

  const npxArgs = ['-y', NPM_PACKAGE, ...excludeArgs];
  // Claude Code on native Windows can't spawn npx directly; it has to go through cmd /c.
  const wrapForWindows = activeClient === 'claude-code' && os === 'windows';
  const command = wrapForWindows ? 'cmd' : 'npx';
  const args = wrapForWindows ? ['/c', 'npx', ...npxArgs] : npxArgs;

  const getClientConfig = () => {
    switch (activeClient) {
      case 'cursor':
        return {
          path: '.cursor/mcp.json (project) or ~/.cursor/mcp.json (global)',
          code: serverJson('mcpServers', command, args),
        };
      case 'vscode':
        return {
          path: '.vscode/mcp.json (note: VS Code uses the top-level key "servers")',
          code: serverJson('servers', command, args),
        };
      case 'claude-desktop':
        return {
          path: os === 'windows'
            ? '%APPDATA%\\Claude\\claude_desktop_config.json'
            : '~/Library/Application Support/Claude/claude_desktop_config.json',
          code: serverJson('mcpServers', command, args),
        };
      case 'claude-code':
      default:
        return {
          path: '.mcp.json in your project root',
          code: serverJson('mcpServers', command, args),
        };
    }
  };

  const currentConfig = getClientConfig();
  const claudeCodeCli = `claude mcp add selenium-mcp -- ${os === 'windows' ? 'cmd /c ' : ''}npx ${npxArgs.join(' ')}`;
  const jarConfig = serverJson('mcpServers', 'java', ['-jar', jarPath, ...excludeArgs]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-mono font-medium">
          <Terminal className="w-3.5 h-3.5" /> Documentation / Installation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Installation & Client Configuration
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          One <code className="font-mono text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">npx</code> entry in your MCP client config and you're done. The npm package bundles its own Java runtime, so there's no JDK to install.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-500" /> Prerequisites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <span className="font-mono text-xs text-brand-500 font-bold block mb-1">01. Node.js</span>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Node.js 18+ (for npx)</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Verify with <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">npx --version</code></p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <span className="font-mono text-xs text-brand-500 font-bold block mb-1">02. Browser</span>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Chrome, Edge or Firefox</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Drivers auto-managed by WebDriverManager. Network/console tools need Chrome or Edge.</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <span className="font-mono text-xs text-zinc-400 font-bold block mb-1">03. Java (jar only)</span>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Not needed with npx</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Java 21+ only if you run the jar yourself; Maven 3.9+ only to build from source</p>
          </div>
        </div>
      </section>

      {/* Step 1: Client configuration */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-500" /> Step 1: Add selenium-mcp to your MCP client
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Pick your client and OS to generate a ready-to-paste config.
          </p>
        </div>

        {/* One-click installs */}
        <div className="flex flex-wrap gap-3">
          <a
            href={VSCODE_INSTALL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0098FF] hover:bg-[#007ACC] text-white font-semibold text-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Install in VS Code</span>
          </a>
          <a
            href={CURSOR_INSTALL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Add to Cursor</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          {/* Client selector tabs */}
          <div className="flex flex-wrap gap-2">
            {CLIENTS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveClient(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
                  activeClient === tab.id
                    ? 'bg-brand-500 text-white font-bold shadow-glow-orange-sm'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* OS selector */}
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg text-[11px] font-mono self-start">
            {[
              { id: 'unix', name: 'macOS / Linux' },
              { id: 'windows', name: 'Windows' },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setOs(o.id)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  os === o.id ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {o.name}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Config Block */}
        <div className="space-y-2">
          <div className="text-xs text-zinc-500 font-mono">
            Config file: <strong className="text-zinc-800 dark:text-zinc-300">{currentConfig.path}</strong>
          </div>
          <CodeBlock language="json" title={CLIENTS.find((c) => c.id === activeClient).name} code={currentConfig.code} />
          {wrapForWindows && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-500" />
              <span>
                On native Windows, Claude Code needs <code className="font-mono">npx</code> wrapped in <code className="font-mono">cmd /c</code>.
              </span>
            </p>
          )}
        </div>

        {activeClient === 'claude-code' && (
          <div className="space-y-1">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Or register it from a terminal:</p>
            <CodeBlock language="bash" title="Claude Code CLI" code={claudeCodeCli} />
          </div>
        )}

        {/* First-run note */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-zinc-900 dark:text-white">First start downloads about 90 MB</strong> (the Java runtime for your OS plus the server). If your client times out on that first start, restart the server once, or pre-download it in a terminal:
          </p>
          <code className="block font-mono bg-zinc-950 text-brand-300 px-3 py-2 rounded-lg overflow-x-auto">npx -y {NPM_PACKAGE} --version</code>
          <p>
            Supported platforms: Windows x64, Linux x64 (glibc), macOS Intel, macOS Apple Silicon. Logs go to{' '}
            <code className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1 rounded">~/.selenium-mcp/mcp-server.log</code>.
          </p>
        </div>
      </section>

      {/* CRITICAL STDIO WARNING BOX */}
      <div className="p-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/10 text-zinc-800 dark:text-amber-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>IMPORTANT: Protocol Transport is stdio-only</span>
        </div>
        <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          selenium-mcp communicates with your AI client over standard input/output (stdio) using JSON-RPC. <strong>Do NOT run it directly in a regular interactive shell</strong>. It must be spawned automatically by an MCP client (such as Claude Code, Cursor or Claude Desktop). All internal logs are written to a rotating log file (<code className="bg-amber-200/50 dark:bg-amber-900/50 px-1 rounded">mcp-server.log</code>) to keep stdout clean.
        </p>
      </div>

      {/* Step 2: Verification */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Step 2: Verify Connection
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Restart your MCP client (or reload its MCP servers). In a new conversation, ask your assistant:
        </p>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 font-mono text-xs space-y-2">
          <p className="text-brand-600 dark:text-brand-400 font-semibold">
            &gt; "What tools are available from selenium-mcp?"
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
            Or ask it to <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-800 dark:text-zinc-200">call the getStatus tool</code> for a basic health check.
          </p>
        </div>
      </section>

      {/* Optional: tool groups */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-500" /> Optional: Load Fewer Tools
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Every tool's schema costs your client tokens. Switch off the groups you don't need and the configs on this page update with the right <code className="font-mono">--selenium.mcp.exclude-tool-groups</code> argument. <code className="font-mono">BrowserTools</code> (lifecycle, navigation, click, sendKeys) is always on.
        </p>

        <div className="flex flex-wrap gap-2">
          {SWITCHABLE_GROUPS.map((c) => {
            const off = excludedGroups.includes(c.group);
            const count = ALL_TOOLS.filter((t) => t.category === c.id).length;
            return (
              <button
                key={c.group}
                onClick={() => toggleGroup(c.group)}
                aria-pressed={!off}
                title={c.description}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                  off
                    ? 'border-zinc-200 dark:border-zinc-800 text-zinc-400 line-through'
                    : 'border-brand-500/40 bg-brand-500/10 text-brand-700 dark:text-brand-300'
                }`}
              >
                {c.group} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Loaded: <strong className="text-zinc-900 dark:text-white">{loadedToolCount}</strong> of {ALL_TOOLS.length} tools
          {excludedGroups.length > 0 && (
            <button onClick={() => setExcludedGroups([])} className="ml-3 underline hover:text-brand-500">
              reset
            </button>
          )}
        </p>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          You can also allow-list instead, e.g. <code className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">--selenium.mcp.tool-groups=elements,page-source,wait,script,screenshots</code>. Any extra arguments after the package name are passed straight through to the server.
        </p>
      </section>

      {/* Alternative: jar */}
      <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Coffee className="w-5 h-5 text-brand-500" /> Alternative: Run the Jar on Your Own Java
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Prefer to manage the JVM yourself? Requires Java 21+ (<code className="font-mono">JAVA_HOME</code> pointing at a JDK 21 install).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-brand-500" /> Download the prebuilt jar
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every push to <code className="font-mono">main</code> publishes a GitHub Release with the jar attached.
            </p>
            <a
              href={JAR_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download selenium-mcp.jar</span>
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-2">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" /> Or build from source
            </h3>
            <CodeBlock
              language="bash"
              code={`git clone https://github.com/Volta-Jebaprashanth/selenium-mcp.git
cd selenium-mcp
mvn clean package`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Point your client at the jar:</p>
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl">
              <Folder className="w-4 h-4 text-brand-500 shrink-0" />
              <input
                type="text"
                value={jarPath}
                onChange={(e) => setJarPath(e.target.value)}
                placeholder="Absolute path to jar..."
                aria-label="Absolute path to selenium-mcp.jar"
                className="bg-transparent text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none w-48 sm:w-64 font-mono"
              />
            </div>
          </div>
          <CodeBlock language="json" title="mcpServers (jar)" code={jarConfig} />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
            <Globe className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-500" />
            <span>
              When running the jar directly, <code className="font-mono">mcp-server.log</code> is written to the working directory unless you pass <code className="font-mono">--logging.file.name=/path/to/mcp-server.log</code>.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
