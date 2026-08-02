import React, { useState } from 'react';
import { 
  Download, Terminal, Check, Copy, AlertTriangle, Cpu, Globe, Sparkles, Folder, CheckCircle2 
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function DocsInstallation() {
  const [jarPath, setJarPath] = useState('/absolute/path/to/selenium-mcp.jar');
  const [activeClient, setActiveClient] = useState('claude-desktop-mac');

  const getClientConfig = () => {
    switch (activeClient) {
      case 'claude-desktop-mac':
        return {
          title: 'Claude Desktop (macOS)',
          path: '~/Library/Application Support/Claude/claude_desktop_config.json',
          code: `{
  "mcpServers": {
    "selenium-mcp": {
      "command": "java",
      "args": [
        "-jar",
        "${jarPath}"
      ]
    }
  }
}`
        };
      case 'claude-desktop-win':
        return {
          title: 'Claude Desktop (Windows)',
          path: '%APPDATA%\\Claude\\claude_desktop_config.json',
          code: `{
  "mcpServers": {
    "selenium-mcp": {
      "command": "java",
      "args": [
        "-jar",
        "${jarPath.replace(/\//g, '\\\\')}"
      ]
    }
  }
}`
        };
      case 'cursor':
        return {
          title: 'Cursor IDE',
          path: 'Cursor Settings > Features > MCP Servers > Add new MCP server',
          code: `{
  "name": "selenium-mcp",
  "type": "stdio",
  "command": "java",
  "args": ["-jar", "${jarPath}"]
}`
        };
      case 'claude-code':
        return {
          title: 'Claude Code CLI',
          path: 'Run command in terminal to register server',
          code: `claude mcp add selenium-mcp -- java -jar ${jarPath}`
        };
      default:
        return {
          title: 'Standard stdio JSON',
          path: 'General MCP client configuration',
          code: `{
  "mcpServers": {
    "selenium-mcp": {
      "command": "java",
      "args": ["-jar", "${jarPath}"]
    }
  }
}`
        };
    }
  };

  const currentConfig = getClientConfig();

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
          Get selenium-mcp running locally and connected to your AI assistant in under two minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-brand-500" /> Prerequisites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <span className="font-mono text-xs text-brand-500 font-bold block mb-1">01. JVM</span>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Java 21 or newer</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Verify with <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">java -version</code></p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <span className="font-mono text-xs text-brand-500 font-bold block mb-1">02. Browser</span>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Chrome, Edge or Firefox</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Drivers auto-managed by WebDriverManager</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
            <span className="font-mono text-xs text-brand-500 font-bold block mb-1">03. Maven (Optional)</span>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Maven 3.9+</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Only required if compiling from source</p>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Step 1: Obtain the Executable JAR
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A */}
          <div className="p-6 rounded-2xl border border-brand-500/30 bg-brand-500/5 dark:bg-brand-500/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-brand-500 text-white font-mono text-xs font-bold">
                Option A (Recommended)
              </span>
              <Download className="w-5 h-5 text-brand-500" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
              Download Prebuilt JAR
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Download the standalone executable JAR from the GitHub releases page.
            </p>
            <a
              href="https://github.com/xpathy/selenium-mcp/releases/latest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download selenium-mcp.jar</span>
            </a>
          </div>

          {/* Option B */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs font-bold">
                Option B
              </span>
              <Terminal className="w-5 h-5 text-zinc-400" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
              Build from Source with Maven
            </h3>
            <CodeBlock
              language="bash"
              code={`git clone https://github.com/xpathy/selenium-mcp.git
cd selenium-mcp
mvn clean package
# Artifact generated at: target/selenium-mcp.jar`}
            />
          </div>
        </div>
      </section>

      {/* CRITICAL STDIO WARNING BOX */}
      <div className="p-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/10 text-zinc-800 dark:text-amber-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>IMPORTANT: Protocol Transport is stdio-only</span>
        </div>
        <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          selenium-mcp communicates with your AI client over standard input/output (stdio) using JSON-RPC. <strong>Do NOT run it directly in a regular interactive shell</strong>. It must be spawned automatically by an MCP client (such as Claude Desktop or Cursor). All internal logs are written to a rotating log file (<code className="bg-amber-200/50 dark:bg-amber-900/50 px-1 rounded">logs/selenium-mcp.log</code>) to keep stdout clean.
        </p>
      </div>

      {/* Interactive Configurator */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Step 2: MCP Client Configuration
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Select your client and customize your local JAR path to generate ready-to-use JSON config.
            </p>
          </div>

          {/* Path Customizer */}
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl">
            <Folder className="w-4 h-4 text-brand-500 shrink-0" />
            <input
              type="text"
              value={jarPath}
              onChange={(e) => setJarPath(e.target.value)}
              placeholder="Absolute path to jar..."
              className="bg-transparent text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none w-48 sm:w-64 font-mono"
            />
          </div>
        </div>

        {/* Client selector tabs */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          {[
            { id: 'claude-desktop-mac', name: 'Claude Desktop (macOS)' },
            { id: 'claude-desktop-win', name: 'Claude Desktop (Windows)' },
            { id: 'cursor', name: 'Cursor IDE' },
            { id: 'claude-code', name: 'Claude Code CLI' },
            { id: 'custom', name: 'Generic MCP Client' },
          ].map((tab) => (
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

        {/* Generated Config Block */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Config File Path: <strong className="text-zinc-800 dark:text-zinc-300">{currentConfig.path}</strong></span>
          </div>
          <CodeBlock
            language={activeClient === 'claude-code' ? 'bash' : 'json'}
            title={currentConfig.title}
            code={currentConfig.code}
          />
        </div>
      </section>

      {/* Step 3: Verification */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Step 3: Verify Connection
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Restart your MCP client (e.g. Claude Desktop). In a new conversation prompt, ask your assistant:
        </p>

        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 font-mono text-xs space-y-2">
          <p className="text-brand-600 dark:text-brand-400 font-semibold">
            &gt; "What tools are available from selenium-mcp?"
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
            Or request the healthcheck: <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-800 dark:text-zinc-200">Call getStatus tool</code> to verify JVM uptime and driver status.
          </p>
        </div>
      </section>
    </div>
  );
}
