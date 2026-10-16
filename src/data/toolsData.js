export const TOOL_CATEGORIES = [
  { id: 'PageSourceTools', group: 'page-source', name: 'PageSourceTools (Flagship)', description: 'Token-efficient page inspection & smart element discovery', icon: 'Sparkles', color: 'orange' },
  { id: 'BrowserTools', group: null, name: 'BrowserTools', description: 'Browser lifecycle, attaching to a running browser, navigation, click & sendKeys (always loaded)', icon: 'Compass', color: 'zinc' },
  { id: 'ElementQueryTools', group: 'elements', name: 'ElementQueryTools', description: 'Element attributes, state checks & size metrics', icon: 'Search', color: 'zinc' },
  { id: 'WaitTools', group: 'wait', name: 'WaitTools', description: 'Explicit synchronization waits for dynamic DOM states', icon: 'Clock', color: 'zinc' },
  { id: 'NetworkTools', group: 'network', name: 'NetworkTools (CDP)', description: 'Passive network capture, request mocking & console logs (Chrome/Edge)', icon: 'Activity', color: 'orange' },
  { id: 'ApiTools', group: 'api', name: 'ApiTools', description: 'Standalone REST client for combined UI + API testing', icon: 'Globe', color: 'orange' },
  { id: 'ActionsTools', group: 'actions', name: 'ActionsTools', description: 'Advanced mouse hovering, drag & drop, keyboard events', icon: 'MousePointer', color: 'zinc' },
  { id: 'AlertTools', group: 'alerts', name: 'AlertTools', description: 'Handling browser dialogs, confirms, and prompts', icon: 'AlertTriangle', color: 'zinc' },
  { id: 'FrameTools', group: 'frames', name: 'FrameTools', description: 'Switching context between main page and iframes', icon: 'Layers', color: 'zinc' },
  { id: 'WindowTools', group: 'window', name: 'WindowTools', description: 'Managing tabs, popups, and window sizing', icon: 'Maximize2', color: 'zinc' },
  { id: 'SelectTools', group: 'select', name: 'SelectTools', description: 'Manipulating HTML <select> dropdowns', icon: 'ChevronDown', color: 'zinc' },
  { id: 'CookieTools', group: 'cookies', name: 'CookieTools', description: 'Reading, injecting & clearing session cookies', icon: 'Cookie', color: 'zinc' },
  { id: 'ScreenshotTools', group: 'screenshots', name: 'ScreenshotTools', description: 'Viewport, full-page & single-element screenshots', icon: 'Camera', color: 'zinc' },
  { id: 'ScriptTools', group: 'script', name: 'ScriptTools', description: 'JavaScript execution, per-page init scripts & scrolling', icon: 'Code', color: 'zinc' },
  { id: 'FileTools', group: 'files', name: 'FileTools', description: 'Uploading local files & generating PDFs', icon: 'FileUp', color: 'zinc' },
  { id: 'SystemTools', group: 'system', name: 'SystemTools', description: 'Basic server health check', icon: 'Cpu', color: 'zinc' },
];

export const ALL_TOOLS = [
  // PageSourceTools
  {
    name: "getPageElementsFiltered",
    category: "PageSourceTools",
    flagship: true,
    signature: "getPageElementsFiltered(locatorType, locatorValue, includeAncestors?, includeDescendants?, includeSiblings?, maxDepth?, limit?)",
    description: "Find every element matching a locator (not just the first) and describe each one as JSON, optionally with surrounding context - the tool to reach for when you want a specific kind of element (e.g. every <input>, every element with class 'card') rather than the whole page tree. \n\nExample: locatorType=xpath, locatorValue=//input returns one entry per <input> on the page, each with tag/id/class/name/type/etc. and its own direct text. \n\nBy default only the matched elements themselves are returned. Turn on the extra context you need: \n- includeAncestors=true adds each match's parent chain, immediate parent first up through <html> last. Every node in the chain (and the match itself) gets siblingIndex/siblingCount, e.g. siblingIndex:2, siblingCount:5 means it's the 2nd <div> among 5 sibling <div>s under that same parent. Use this to build a locator that's actually unique, e.g. \"(//form[@id='login']//input)[2]\" or \"div.container > form#login > input:nth-of-type(2)\", instead of guessing and hitting 'multiple elements found'. \n- includeSiblings=true adds the other children of the match's immediate parent, so you can see what else is nearby (e.g. a <label> right before an <input>) without walking the whole ancestor chain. \n- includeDescendants=true expands each match's own children (respecting maxDepth) - only useful when the locator targets a container (e.g. a <form> or <div>) rather than a leaf element like <input>. \n\nResults are capped by limit (default 50); the response always reports totalMatches, returnedMatches, and truncated so you know if more matches exist than were returned.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to match elements against, e.g. //input for xpath or input for css." },
      { name: "includeAncestors", type: "boolean", required: false, desc: "Include each match's ancestor chain (immediate parent first, up to <html> last), with siblingIndex/siblingCount on every node to help build a unique locator. Defaults to false." },
      { name: "includeDescendants", type: "boolean", required: false, desc: "Include each match's own descendant elements (respecting maxDepth). Useful when the locator targets a container rather than a leaf element. Defaults to false." },
      { name: "includeSiblings", type: "boolean", required: false, desc: "Include the other children of each match's immediate parent, for nearby context (e.g. a neighboring <label>). Defaults to false." },
      { name: "maxDepth", type: "integer", required: false, desc: "Max depth to descend when includeDescendants is true. Ignored otherwise. Defaults to 20." },
      { name: "limit", type: "integer", required: false, desc: "Max number of matches to return. Defaults to 50." }
    ],
    example: 'getPageElementsFiltered(locatorType: "xpath", locatorValue: "//input", includeAncestors: true)'
  },
  {
    name: "getPageElements",
    category: "PageSourceTools",
    signature: "getPageElements(maxDepth?)",
    description: "Get the ENTIRE page as a compact JSON element tree rooted at <body>, without scripts, styles, or comments - far cheaper to read than the full HTML source. Each node has tag, any notable attributes present (id, class, name, type, href, src, value, placeholder, role, alt, title, for, target, data-testid, aria-label, aria-hidden, disabled, checked, selected, readonly), text (its own direct text, trimmed and truncated to 120 characters), and children. There is no locator filtering here - it always returns the whole page. If you already know roughly what you're looking for (e.g. all inputs, or one specific element among several), use getPageElementsFiltered instead - it targets matches directly and is much cheaper.",
    params: [
      { name: "maxDepth", type: "integer", required: false, desc: "Max tree depth to descend from <body>. Deeper subtrees are reported as childrenTruncated: <count> instead of being expanded. Defaults to 20." }
    ]
  },
  {
    name: "getPageScripts",
    category: "PageSourceTools",
    signature: "getPageScripts()",
    description: "Get every <script> on the current page as a JSON array, without the rest of the HTML. Each entry has type (external or inline), plus src for external scripts or content for inline scripts. Inline content over 10,000 characters is truncated with truncated: true."
  },
  {
    name: "getPageStyles",
    category: "PageSourceTools",
    signature: "getPageStyles()",
    description: "Get every stylesheet on the current page as a JSON array, without the rest of the HTML. Each entry has type (external or inline), plus href for external stylesheets or content for inline <style> tags. Inline content over 10,000 characters is truncated with truncated: true."
  },

  // BrowserTools
  {
    name: "openBrowser",
    category: "BrowserTools",
    signature: "openBrowser(browser?, headless?, incognito?, windowSize?, userAgent?)",
    description: "Open a browser window. Must be called before navigate. If a browser is already open, it is reused.",
    params: [
      { name: "browser", type: "string", required: false, desc: "Browser to launch: chrome, firefox, or edge. Defaults to chrome." },
      { name: "headless", type: "boolean", required: false, desc: "Launch the browser in headless mode. Defaults to false." },
      { name: "incognito", type: "boolean", required: false, desc: "Launch the browser in incognito/private mode. Defaults to false." },
      { name: "windowSize", type: "string", required: false, desc: "Initial window size as WIDTHxHEIGHT, e.g. 1920x1080." },
      { name: "userAgent", type: "string", required: false, desc: "Custom User-Agent string to launch the browser with." }
    ]
  },
  {
    name: "connectToBrowser",
    category: "BrowserTools",
    signature: "connectToBrowser(browser?, debuggerAddress?)",
    description: "Connect to a Chrome or Edge browser that is already running with remote debugging enabled (started with --remote-debugging-port=<port> and a non-default --user-data-dir), instead of launching a new one. Controls whichever tab is currently active; use the window tools to switch tabs. closeBrowser will disconnect and leave the browser running.",
    params: [
      { name: "browser", type: "string", required: false, desc: "Browser that is running: chrome or edge. Defaults to chrome." },
      { name: "debuggerAddress", type: "string", required: false, desc: "Remote-debugging address as host:port. Defaults to 127.0.0.1:9222." }
    ]
  },
  {
    name: "launchDebugBrowser",
    category: "BrowserTools",
    signature: "launchDebugBrowser(browser?, port?, userDataDir?)",
    description: "Launch Chrome or Edge with remote debugging enabled and connect to it. Unlike openBrowser, the browser keeps running after closeBrowser, so test code can attach to the same browser via ChromeOptions.setExperimentalOption(\"debuggerAddress\", \"127.0.0.1:<port>\") - e.g. run a failing test up to the failure, then inspect the live page here. The test and this server should take turns rather than drive the browser at the same time. If a browser is already listening on the port, connects to it instead.",
    params: [
      { name: "browser", type: "string", required: false, desc: "Browser to launch: chrome or edge. Defaults to chrome." },
      { name: "port", type: "integer", required: false, desc: "Remote-debugging port. Defaults to 9222." },
      { name: "userDataDir", type: "string", required: false, desc: "Profile directory for the browser. Defaults to a dedicated folder under the system temp dir; Chrome refuses remote debugging on your everyday profile." }
    ]
  },
  {
    name: "closeBrowser",
    category: "BrowserTools",
    signature: "closeBrowser()",
    description: "Close the currently open browser and release the driver. A browser attached via connectToBrowser or launchDebugBrowser is only disconnected and keeps running."
  },
  {
    name: "navigate",
    category: "BrowserTools",
    signature: "navigate(url)",
    description: "Navigate the currently open browser to the given URL.",
    params: [
      { name: "url", type: "string", required: true, desc: "The URL to navigate to" }
    ]
  },
  {
    name: "back",
    category: "BrowserTools",
    signature: "back()",
    description: "Navigate back to the previous page in browser history."
  },
  {
    name: "forward",
    category: "BrowserTools",
    signature: "forward()",
    description: "Navigate forward to the next page in browser history."
  },
  {
    name: "refresh",
    category: "BrowserTools",
    signature: "refresh()",
    description: "Reload the current page in the open browser, equivalent to pressing the browser refresh button. Page state such as form input and scroll position may be lost."
  },
  {
    name: "getCurrentUrl",
    category: "BrowserTools",
    signature: "getCurrentUrl()",
    description: "Get the URL of the current page."
  },
  {
    name: "getTitle",
    category: "BrowserTools",
    signature: "getTitle()",
    description: "Get the title of the current page."
  },
  {
    name: "getPageSource",
    category: "BrowserTools",
    signature: "getPageSource()",
    description: "Get the full HTML page source of the currently open browser."
  },
  {
    name: "click",
    category: "BrowserTools",
    signature: "click(locatorType, locatorValue, index?, visibleOnly?)",
    description: "Click an element on the current page, located by a strategy and value.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "sendKeys",
    category: "BrowserTools",
    signature: "sendKeys(locatorType, locatorValue, text, clearFirst?, index?, visibleOnly?)",
    description: "Send keys (type text) into an element on the current page, located by a strategy and value.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "text", type: "string", required: true, desc: "The text to type into the element" },
      { name: "clearFirst", type: "boolean", required: false, desc: "If true, clears the element's existing content before typing. Defaults to false." },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },

  // ElementQueryTools
  {
    name: "getText",
    category: "ElementQueryTools",
    signature: "getText(locatorType, locatorValue, index?, visibleOnly?)",
    description: "Get the visible text of an element.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "getAttribute",
    category: "ElementQueryTools",
    signature: "getAttribute(locatorType, locatorValue, attributeName, index?, visibleOnly?)",
    description: "Get the value of an HTML attribute (or DOM property) of an element.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "attributeName", type: "string", required: true, desc: "The attribute name to read, e.g. href, value, class" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "getCssValue",
    category: "ElementQueryTools",
    signature: "getCssValue(locatorType, locatorValue, propertyName)",
    description: "Get the computed CSS value of a property of an element.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "propertyName", type: "string", required: true, desc: "The CSS property name, e.g. color, font-size" }
    ]
  },
  {
    name: "getTagName",
    category: "ElementQueryTools",
    signature: "getTagName(locatorType, locatorValue)",
    description: "Get the HTML tag name of an element.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "isDisplayed",
    category: "ElementQueryTools",
    signature: "isDisplayed(locatorType, locatorValue)",
    description: "Check whether an element is displayed (visible) on the page.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "isEnabled",
    category: "ElementQueryTools",
    signature: "isEnabled(locatorType, locatorValue)",
    description: "Check whether an element is enabled (not disabled).",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "isSelected",
    category: "ElementQueryTools",
    signature: "isSelected(locatorType, locatorValue)",
    description: "Check whether a checkbox, radio button, or option element is selected.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "getElementSize",
    category: "ElementQueryTools",
    signature: "getElementSize(locatorType, locatorValue)",
    description: "Get the rendered width and height of an element in pixels.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "getElementLocation",
    category: "ElementQueryTools",
    signature: "getElementLocation(locatorType, locatorValue)",
    description: "Get the top-left (x, y) position of an element relative to the page.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "elementExists",
    category: "ElementQueryTools",
    signature: "elementExists(locatorType, locatorValue)",
    description: "Check whether at least one element matching the locator exists on the page, without throwing if it doesn't.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "countElements",
    category: "ElementQueryTools",
    signature: "countElements(locatorType, locatorValue)",
    description: "Count how many elements on the page match the locator.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the elements" }
    ]
  },
  {
    name: "getElementsText",
    category: "ElementQueryTools",
    signature: "getElementsText(locatorType, locatorValue)",
    description: "Get the visible text of every element matching the locator, newline-separated.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the elements" }
    ]
  },

  // WaitTools
  {
    name: "waitForVisible",
    category: "WaitTools",
    signature: "waitForVisible(locatorType, locatorValue, timeoutSeconds?)",
    description: "Wait until an element is visible on the page, up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForClickable",
    category: "WaitTools",
    signature: "waitForClickable(locatorType, locatorValue, timeoutSeconds?)",
    description: "Wait until an element is visible and enabled, ready to be clicked, up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForPresent",
    category: "WaitTools",
    signature: "waitForPresent(locatorType, locatorValue, timeoutSeconds?)",
    description: "Wait until an element is present in the DOM (not necessarily visible), up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForInvisible",
    category: "WaitTools",
    signature: "waitForInvisible(locatorType, locatorValue, timeoutSeconds?)",
    description: "Wait until an element is invisible or removed from the DOM, up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForTextPresent",
    category: "WaitTools",
    signature: "waitForTextPresent(locatorType, locatorValue, text, timeoutSeconds?)",
    description: "Wait until an element contains the given text, up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "text", type: "string", required: true, desc: "The text expected to appear in the element" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForTitleContains",
    category: "WaitTools",
    signature: "waitForTitleContains(text, timeoutSeconds?)",
    description: "Wait until the page title contains the given text, up to the given timeout.",
    params: [
      { name: "text", type: "string", required: true, desc: "The text expected to appear in the page title" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForUrlContains",
    category: "WaitTools",
    signature: "waitForUrlContains(text, timeoutSeconds?)",
    description: "Wait until the current URL contains the given text, up to the given timeout.",
    params: [
      { name: "text", type: "string", required: true, desc: "The text expected to appear in the URL" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForPageLoad",
    category: "WaitTools",
    signature: "waitForPageLoad(timeoutSeconds?)",
    description: "Wait until the page has finished loading (document.readyState is \"complete\"), up to the given timeout.",
    params: [
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForJsCondition",
    category: "WaitTools",
    signature: "waitForJsCondition(script, timeoutSeconds?)",
    description: "Wait until a custom JavaScript expression evaluates truthy, up to the given timeout. Use \"return\" for a full function body (e.g. \"return document.title === 'Done'\"), or a bare boolean expression (e.g. \"!!document.querySelector('.ready')\").",
    params: [
      { name: "script", type: "string", required: true, desc: "JavaScript expression or \"return ...\" statement that should evaluate truthy" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForElementCount",
    category: "WaitTools",
    signature: "waitForElementCount(locatorType, locatorValue, expectedCount, timeoutSeconds?)",
    description: "Wait until the number of elements matching a locator equals an expected count, up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the elements" },
      { name: "expectedCount", type: "integer", required: true, desc: "The expected number of matching elements" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForAttributeToBe",
    category: "WaitTools",
    signature: "waitForAttributeToBe(locatorType, locatorValue, attribute, expectedValue, timeoutSeconds?)",
    description: "Wait until an element's attribute or DOM property equals an expected value, up to the given timeout.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "attribute", type: "string", required: true, desc: "The attribute or DOM property name to check" },
      { name: "expectedValue", type: "string", required: true, desc: "The expected value of the attribute" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },
  {
    name: "waitForNumberOfWindowsToBe",
    category: "WaitTools",
    signature: "waitForNumberOfWindowsToBe(expectedCount, timeoutSeconds?)",
    description: "Wait until the number of open windows/tabs equals an expected count, up to the given timeout. Useful after an action expected to open or close a tab.",
    params: [
      { name: "expectedCount", type: "integer", required: true, desc: "The expected number of open windows/tabs" },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait. Defaults to 10." }
    ]
  },

  // NetworkTools
  {
    name: "startNetworkCapture",
    category: "NetworkTools",
    cdp: true,
    signature: "startNetworkCapture(urlPattern?)",
    description: "Start capturing network traffic (method, URL, headers, bodies, status, timing) for the current page. Requires Chrome or Edge. Call getNetworkLog to read captured entries.",
    params: [
      { name: "urlPattern", type: "string", required: false, desc: "Only capture requests whose URL matches this regex. Omit to capture everything." }
    ]
  },
  {
    name: "stopNetworkCapture",
    category: "NetworkTools",
    cdp: true,
    signature: "stopNetworkCapture()",
    description: "Stop capturing new network traffic. Already-captured entries remain available via getNetworkLog."
  },
  {
    name: "getNetworkLog",
    category: "NetworkTools",
    cdp: true,
    signature: "getNetworkLog(urlPattern?, method?, limit?)",
    description: "Get captured network requests/responses as a JSON array, most recent last. Each entry has method, url, requestHeaders, requestBody, status, responseHeaders, responseBody, durationMillis, and mocked. Bodies over ~20,000 characters are truncated.",
    params: [
      { name: "urlPattern", type: "string", required: false, desc: "Only return entries whose URL matches this regex. Omit for all." },
      { name: "method", type: "string", required: false, desc: "Only return entries with this HTTP method (e.g. GET, POST). Omit for all." },
      { name: "limit", type: "integer", required: false, desc: "Max number of entries to return, most recent. Defaults to 100." }
    ]
  },
  {
    name: "clearNetworkLog",
    category: "NetworkTools",
    cdp: true,
    signature: "clearNetworkLog()",
    description: "Clear the captured network log without stopping capture."
  },
  {
    name: "waitForNetworkIdle",
    category: "NetworkTools",
    cdp: true,
    signature: "waitForNetworkIdle(idleMillis?, timeoutSeconds?)",
    description: "Wait until there have been no in-flight HTTP requests for a continuous idle period, e.g. after clicking a button that triggers one or more XHR/fetch calls. Requires Chrome or Edge. Useful in place of a fixed sleep before asserting on the resulting DOM state.",
    params: [
      { name: "idleMillis", type: "integer", required: false, desc: "How many milliseconds of continuous silence count as idle. Defaults to 500." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Max seconds to wait overall. Defaults to 30." }
    ]
  },
  {
    name: "getPendingRequestCount",
    category: "NetworkTools",
    cdp: true,
    signature: "getPendingRequestCount()",
    description: "Get the number of HTTP requests currently in flight. Requires Chrome or Edge; arms passive network tracking as a side effect if it wasn't already active."
  },
  {
    name: "mockResponse",
    category: "NetworkTools",
    cdp: true,
    signature: "mockResponse(urlPattern, method?, status, contentType?, body?, headersJson?)",
    description: "Stub out responses for requests whose URL matches a regex, e.g. to fake a backend response in a UI test without a real server. Requires Chrome or Edge. Matching requests never hit the network. Rules are checked in the order added; the first match wins.",
    params: [
      { name: "urlPattern", type: "string", required: true, desc: "Regex matched against the full request URL." },
      { name: "method", type: "string", required: false, desc: "Only mock this HTTP method (e.g. GET, POST). Omit to match any method." },
      { name: "status", type: "integer", required: true, desc: "HTTP status code to return, e.g. 200 or 404." },
      { name: "contentType", type: "string", required: false, desc: "Content-Type header of the mocked response, e.g. application/json." },
      { name: "body", type: "string", required: false, desc: "Response body to return." },
      { name: "headersJson", type: "string", required: false, desc: "Extra response headers as a JSON object, e.g. {\"X-Test\": \"1\"}. Omit for none." }
    ]
  },
  {
    name: "clearMockResponses",
    category: "NetworkTools",
    cdp: true,
    signature: "clearMockResponses()",
    description: "Remove all registered response mocks."
  },
  {
    name: "blockRequests",
    category: "NetworkTools",
    cdp: true,
    signature: "blockRequests(urlPattern)",
    description: "Block requests whose URL matches a regex; matching requests get an immediate 403 response instead of reaching the network. Requires Chrome or Edge. Useful for blocking ads, trackers, or third-party calls that would otherwise slow down or flake a test.",
    params: [
      { name: "urlPattern", type: "string", required: true, desc: "Regex matched against the full request URL." }
    ]
  },
  {
    name: "clearBlockedRequests",
    category: "NetworkTools",
    cdp: true,
    signature: "clearBlockedRequests()",
    description: "Remove all URL blocking rules."
  },
  {
    name: "setNetworkConditions",
    category: "NetworkTools",
    cdp: true,
    signature: "setNetworkConditions(offline?, latencyMillis?, downloadThroughputKbps?, uploadThroughputKbps?)",
    description: "Simulate network conditions (offline mode, latency, throughput) via Chrome DevTools Protocol. Requires Chrome or Edge.",
    params: [
      { name: "offline", type: "boolean", required: false, desc: "Simulate the browser being offline. Defaults to false." },
      { name: "latencyMillis", type: "integer", required: false, desc: "Simulated round-trip latency in milliseconds. Defaults to 0." },
      { name: "downloadThroughputKbps", type: "integer", required: false, desc: "Simulated download throughput in kb/s. Use -1 for no limit. Defaults to -1." },
      { name: "uploadThroughputKbps", type: "integer", required: false, desc: "Simulated upload throughput in kb/s. Use -1 for no limit. Defaults to -1." }
    ]
  },
  {
    name: "getNetworkConditions",
    category: "NetworkTools",
    cdp: true,
    signature: "getNetworkConditions()",
    description: "Get the currently simulated network conditions."
  },
  {
    name: "clearNetworkConditions",
    category: "NetworkTools",
    cdp: true,
    signature: "clearNetworkConditions()",
    description: "Reset simulated network conditions back to normal (no throttling, online)."
  },
  {
    name: "setBasicAuthCredentials",
    category: "NetworkTools",
    cdp: true,
    signature: "setBasicAuthCredentials(username, password)",
    description: "Register HTTP Basic auth credentials so any auth challenge (a browser login popup) is answered automatically instead of blocking navigation. Requires Chrome or Edge.",
    params: [
      { name: "username", type: "string", required: true, desc: "Username to supply for HTTP Basic auth challenges." },
      { name: "password", type: "string", required: true, desc: "Password to supply for HTTP Basic auth challenges." }
    ]
  },
  {
    name: "startConsoleCapture",
    category: "NetworkTools",
    cdp: true,
    signature: "startConsoleCapture()",
    description: "Start capturing browser console output (console.log/warn/error and similar). Requires Chrome or Edge. Call getConsoleLogs to read captured entries."
  },
  {
    name: "getConsoleLogs",
    category: "NetworkTools",
    cdp: true,
    signature: "getConsoleLogs(type?, limit?)",
    description: "Get captured browser console log entries as a JSON array, most recent last. Each entry has timestamp, type (e.g. log, warning, error), and message.",
    params: [
      { name: "type", type: "string", required: false, desc: "Only return entries of this console message type (e.g. error, warning, log). Omit for all." },
      { name: "limit", type: "integer", required: false, desc: "Max number of entries to return, most recent. Defaults to 100." }
    ]
  },
  {
    name: "clearConsoleLogs",
    category: "NetworkTools",
    cdp: true,
    signature: "clearConsoleLogs()",
    description: "Clear captured console log entries without stopping capture."
  },

  // ApiTools
  {
    name: "httpGet",
    category: "ApiTools",
    signature: "httpGet(url, headersJson?, timeoutSeconds?)",
    description: "Send an HTTP GET request and return the response as JSON (status, headers, body, durationMillis).",
    params: [
      { name: "url", type: "string", required: true, desc: "The URL to request" },
      { name: "headersJson", type: "string", required: false, desc: "Request headers as a JSON object, e.g. {\"Authorization\": \"Bearer xyz\", \"Content-Type\": \"application/json\"}. Omit for none." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Request timeout in seconds. Defaults to 30." }
    ]
  },
  {
    name: "httpDelete",
    category: "ApiTools",
    signature: "httpDelete(url, headersJson?, timeoutSeconds?)",
    description: "Send an HTTP DELETE request and return the response as JSON (status, headers, body, durationMillis).",
    params: [
      { name: "url", type: "string", required: true, desc: "The URL to request" },
      { name: "headersJson", type: "string", required: false, desc: "Request headers as a JSON object, e.g. {\"Authorization\": \"Bearer xyz\", \"Content-Type\": \"application/json\"}. Omit for none." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Request timeout in seconds. Defaults to 30." }
    ]
  },
  {
    name: "httpPost",
    category: "ApiTools",
    signature: "httpPost(url, body?, headersJson?, timeoutSeconds?)",
    description: "Send an HTTP POST request with a body and return the response as JSON (status, headers, body, durationMillis).",
    params: [
      { name: "url", type: "string", required: true, desc: "The URL to request" },
      { name: "body", type: "string", required: false, desc: "The request body to send, e.g. a JSON string" },
      { name: "headersJson", type: "string", required: false, desc: "Request headers as a JSON object, e.g. {\"Authorization\": \"Bearer xyz\", \"Content-Type\": \"application/json\"}. Omit for none." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Request timeout in seconds. Defaults to 30." }
    ]
  },
  {
    name: "httpPut",
    category: "ApiTools",
    signature: "httpPut(url, body?, headersJson?, timeoutSeconds?)",
    description: "Send an HTTP PUT request with a body and return the response as JSON (status, headers, body, durationMillis).",
    params: [
      { name: "url", type: "string", required: true, desc: "The URL to request" },
      { name: "body", type: "string", required: false, desc: "The request body to send, e.g. a JSON string" },
      { name: "headersJson", type: "string", required: false, desc: "Request headers as a JSON object, e.g. {\"Authorization\": \"Bearer xyz\", \"Content-Type\": \"application/json\"}. Omit for none." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Request timeout in seconds. Defaults to 30." }
    ]
  },
  {
    name: "httpPatch",
    category: "ApiTools",
    signature: "httpPatch(url, body?, headersJson?, timeoutSeconds?)",
    description: "Send an HTTP PATCH request with a body and return the response as JSON (status, headers, body, durationMillis).",
    params: [
      { name: "url", type: "string", required: true, desc: "The URL to request" },
      { name: "body", type: "string", required: false, desc: "The request body to send, e.g. a JSON string" },
      { name: "headersJson", type: "string", required: false, desc: "Request headers as a JSON object, e.g. {\"Authorization\": \"Bearer xyz\", \"Content-Type\": \"application/json\"}. Omit for none." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Request timeout in seconds. Defaults to 30." }
    ]
  },
  {
    name: "httpRequest",
    category: "ApiTools",
    signature: "httpRequest(method, url, body?, headersJson?, timeoutSeconds?)",
    description: "Send an HTTP request with an arbitrary method (e.g. HEAD, OPTIONS) and return the response as JSON (status, headers, body, durationMillis). Prefer httpGet/httpPost/httpPut/httpPatch/httpDelete for the common verbs.",
    params: [
      { name: "method", type: "string", required: true, desc: "The HTTP method, e.g. GET, POST, HEAD, OPTIONS" },
      { name: "url", type: "string", required: true, desc: "The URL to request" },
      { name: "body", type: "string", required: false, desc: "The request body to send. Omit for none." },
      { name: "headersJson", type: "string", required: false, desc: "Request headers as a JSON object, e.g. {\"Authorization\": \"Bearer xyz\", \"Content-Type\": \"application/json\"}. Omit for none." },
      { name: "timeoutSeconds", type: "integer", required: false, desc: "Request timeout in seconds. Defaults to 30." }
    ]
  },

  // ActionsTools
  {
    name: "hover",
    category: "ActionsTools",
    signature: "hover(locatorType, locatorValue, index?, visibleOnly?)",
    description: "Move the mouse over an element (hover), e.g. to reveal a dropdown menu.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "doubleClick",
    category: "ActionsTools",
    signature: "doubleClick(locatorType, locatorValue, index?, visibleOnly?)",
    description: "Double-click the element identified by the given locator in the open browser. Use for controls that react to dblclick, such as editable cells or list items that open on double-click.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "rightClick",
    category: "ActionsTools",
    signature: "rightClick(locatorType, locatorValue, index?, visibleOnly?)",
    description: "Right-click (context click) an element.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "clickAndHold",
    category: "ActionsTools",
    signature: "clickAndHold(locatorType, locatorValue)",
    description: "Press and hold the left mouse button down on an element. Pair with releaseClick.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" }
    ]
  },
  {
    name: "releaseClick",
    category: "ActionsTools",
    signature: "releaseClick()",
    description: "Release a previously held left mouse button (see clickAndHold)."
  },
  {
    name: "dragAndDrop",
    category: "ActionsTools",
    signature: "dragAndDrop(sourceLocatorType, sourceLocatorValue, targetLocatorType, targetLocatorValue)",
    description: "Drag an element from source and drop it onto target.",
    params: [
      { name: "sourceLocatorType", type: "string", required: true, desc: "Locator strategy for the source element" },
      { name: "sourceLocatorValue", type: "string", required: true, desc: "Locator value for the source element" },
      { name: "targetLocatorType", type: "string", required: true, desc: "Locator strategy for the target element" },
      { name: "targetLocatorValue", type: "string", required: true, desc: "Locator value for the target element" }
    ]
  },
  {
    name: "dragAndDropByOffset",
    category: "ActionsTools",
    signature: "dragAndDropByOffset(locatorType, locatorValue, xOffset, yOffset)",
    description: "Drag an element by a pixel offset instead of onto another element.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "xOffset", type: "integer", required: true, desc: "Horizontal pixels to drag by" },
      { name: "yOffset", type: "integer", required: true, desc: "Vertical pixels to drag by" }
    ]
  },
  {
    name: "pressKey",
    category: "ActionsTools",
    signature: "pressKey(keyName)",
    description: "Send a single named key (e.g. ENTER, TAB, ESCAPE, ARROW_DOWN) to whichever element currently has focus.",
    params: [
      { name: "keyName", type: "string", required: true, desc: "Key name matching a Selenium Keys constant, e.g. ENTER, TAB, ESCAPE" }
    ]
  },

  // AlertTools
  {
    name: "acceptAlert",
    category: "AlertTools",
    signature: "acceptAlert()",
    description: "Accept (click OK on) the currently open alert/confirm/prompt dialog."
  },
  {
    name: "dismissAlert",
    category: "AlertTools",
    signature: "dismissAlert()",
    description: "Dismiss (click Cancel on) the currently open alert/confirm/prompt dialog."
  },
  {
    name: "getAlertText",
    category: "AlertTools",
    signature: "getAlertText()",
    description: "Get the text of the currently open alert/confirm/prompt dialog."
  },
  {
    name: "sendKeysToAlert",
    category: "AlertTools",
    signature: "sendKeysToAlert(text)",
    description: "Type text into a JavaScript prompt dialog.",
    params: [
      { name: "text", type: "string", required: true, desc: "The text to type into the prompt" }
    ]
  },
  {
    name: "isAlertPresent",
    category: "AlertTools",
    signature: "isAlertPresent()",
    description: "Check whether a JavaScript alert/confirm/prompt dialog is currently open."
  },

  // FrameTools
  {
    name: "switchToFrameByIndex",
    category: "FrameTools",
    signature: "switchToFrameByIndex(index)",
    description: "Switch the driver's focus to a frame/iframe by its zero-based index on the page.",
    params: [
      { name: "index", type: "integer", required: true, desc: "Zero-based index of the frame" }
    ]
  },
  {
    name: "switchToFrameByNameOrId",
    category: "FrameTools",
    signature: "switchToFrameByNameOrId(nameOrId)",
    description: "Switch the driver's focus to a frame/iframe by its name or id attribute.",
    params: [
      { name: "nameOrId", type: "string", required: true, desc: "The name or id attribute of the frame" }
    ]
  },
  {
    name: "switchToFrame",
    category: "FrameTools",
    signature: "switchToFrame(locatorType, locatorValue)",
    description: "Switch the driver's focus to a frame/iframe located by a strategy and value.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the frame element" }
    ]
  },
  {
    name: "switchToDefaultContent",
    category: "FrameTools",
    signature: "switchToDefaultContent()",
    description: "Switch the driver's focus back to the main document, out of any frames."
  },
  {
    name: "switchToParentFrame",
    category: "FrameTools",
    signature: "switchToParentFrame()",
    description: "Switch the driver's focus to the parent frame of the current frame."
  },

  // WindowTools
  {
    name: "maximizeWindow",
    category: "WindowTools",
    signature: "maximizeWindow()",
    description: "Maximize the current browser window."
  },
  {
    name: "minimizeWindow",
    category: "WindowTools",
    signature: "minimizeWindow()",
    description: "Minimize the current browser window."
  },
  {
    name: "fullscreenWindow",
    category: "WindowTools",
    signature: "fullscreenWindow()",
    description: "Make the current browser window fullscreen."
  },
  {
    name: "setWindowSize",
    category: "WindowTools",
    signature: "setWindowSize(width, height)",
    description: "Resize the current browser window.",
    params: [
      { name: "width", type: "integer", required: true, desc: "Window width in pixels" },
      { name: "height", type: "integer", required: true, desc: "Window height in pixels" }
    ]
  },
  {
    name: "getWindowSize",
    category: "WindowTools",
    signature: "getWindowSize()",
    description: "Get the current browser window's size."
  },
  {
    name: "setWindowPosition",
    category: "WindowTools",
    signature: "setWindowPosition(x, y)",
    description: "Move the current browser window to the given screen position.",
    params: [
      { name: "x", type: "integer", required: true, desc: "X coordinate in pixels" },
      { name: "y", type: "integer", required: true, desc: "Y coordinate in pixels" }
    ]
  },
  {
    name: "getWindowHandle",
    category: "WindowTools",
    signature: "getWindowHandle()",
    description: "Get the handle of the currently focused window/tab."
  },
  {
    name: "getWindowHandles",
    category: "WindowTools",
    signature: "getWindowHandles()",
    description: "Get the handles of all open windows/tabs."
  },
  {
    name: "switchToWindow",
    category: "WindowTools",
    signature: "switchToWindow(handle)",
    description: "Switch the driver's focus to the window/tab with the given handle. Use getWindowHandles to list handles.",
    params: [
      { name: "handle", type: "string", required: true, desc: "The window handle to switch to" }
    ]
  },
  {
    name: "openNewTab",
    category: "WindowTools",
    signature: "openNewTab()",
    description: "Open a new browser tab and switch focus to it."
  },
  {
    name: "closeCurrentWindow",
    category: "WindowTools",
    signature: "closeCurrentWindow()",
    description: "Close the currently focused window/tab. Does not release the driver — use closeBrowser for that."
  },

  // SelectTools
  {
    name: "selectByVisibleText",
    category: "SelectTools",
    signature: "selectByVisibleText(locatorType, locatorValue, text)",
    description: "Select an option from a dropdown by its visible text.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the <select> element" },
      { name: "text", type: "string", required: true, desc: "The visible text of the option to select" }
    ]
  },
  {
    name: "selectByValue",
    category: "SelectTools",
    signature: "selectByValue(locatorType, locatorValue, optionValue)",
    description: "Select an option from a dropdown by its value attribute.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the <select> element" },
      { name: "optionValue", type: "string", required: true, desc: "The value attribute of the option to select" }
    ]
  },
  {
    name: "selectByIndex",
    category: "SelectTools",
    signature: "selectByIndex(locatorType, locatorValue, index)",
    description: "Select an option from a dropdown by its zero-based index.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the <select> element" },
      { name: "index", type: "integer", required: true, desc: "Zero-based index of the option to select" }
    ]
  },
  {
    name: "deselectAllOptions",
    category: "SelectTools",
    signature: "deselectAllOptions(locatorType, locatorValue)",
    description: "Deselect all selected options in a multi-select dropdown.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the <select> element" }
    ]
  },
  {
    name: "getSelectedOptionsText",
    category: "SelectTools",
    signature: "getSelectedOptionsText(locatorType, locatorValue)",
    description: "Get the visible text of the currently selected option(s) in a dropdown.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the <select> element" }
    ]
  },
  {
    name: "isMultipleSelect",
    category: "SelectTools",
    signature: "isMultipleSelect(locatorType, locatorValue)",
    description: "Check whether a dropdown allows selecting multiple options.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the <select> element" }
    ]
  },

  // CookieTools
  {
    name: "addCookie",
    category: "CookieTools",
    signature: "addCookie(name, value, domain?, path?)",
    description: "Add a cookie on the current domain.",
    params: [
      { name: "name", type: "string", required: true, desc: "Cookie name" },
      { name: "value", type: "string", required: true, desc: "Cookie value" },
      { name: "domain", type: "string", required: false, desc: "Cookie domain. Defaults to the current domain." },
      { name: "path", type: "string", required: false, desc: "Cookie path. Defaults to /." }
    ]
  },
  {
    name: "getCookie",
    category: "CookieTools",
    signature: "getCookie(name)",
    description: "Get a single cookie by name from the current domain.",
    params: [
      { name: "name", type: "string", required: true, desc: "Cookie name" }
    ]
  },
  {
    name: "getAllCookies",
    category: "CookieTools",
    signature: "getAllCookies()",
    description: "Get all cookies visible to the current page."
  },
  {
    name: "deleteCookie",
    category: "CookieTools",
    signature: "deleteCookie(name)",
    description: "Delete a single cookie by name.",
    params: [
      { name: "name", type: "string", required: true, desc: "Cookie name" }
    ]
  },
  {
    name: "deleteAllCookies",
    category: "CookieTools",
    signature: "deleteAllCookies()",
    description: "Delete all cookies visible to the current page."
  },

  // ScreenshotTools
  {
    name: "takeScreenshot",
    category: "ScreenshotTools",
    signature: "takeScreenshot(filePath?, fullPage?)",
    description: "Take a screenshot of the current page. By default captures only the visible viewport; set fullPage=true to capture the whole scrollable page (Chrome, Edge, Firefox). Content that scrolls inside its own container (not the page) is only captured as far as it is visible. Saves to filePath if given, otherwise returns the image as base64 PNG.",
    params: [
      { name: "filePath", type: "string", required: false, desc: "Absolute file path to save the PNG to. If omitted, the image is returned as base64." },
      { name: "fullPage", type: "boolean", required: false, desc: "Capture the entire scrollable page instead of just the viewport. Defaults to false." }
    ]
  },
  {
    name: "takeElementScreenshot",
    category: "ScreenshotTools",
    signature: "takeElementScreenshot(locatorType, locatorValue, filePath?, index?, visibleOnly?)",
    description: "Take a screenshot of a single element. Saves to filePath if given, otherwise returns the image as base64 PNG.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "filePath", type: "string", required: false, desc: "Absolute file path to save the PNG to. If omitted, the image is returned as base64." },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },

  // ScriptTools
  {
    name: "executeScript",
    category: "ScriptTools",
    signature: "executeScript(script, timeoutMs?)",
    description: "Execute JavaScript in the current page as the body of a function and return its result. Use 'return' to produce a result; a returned Promise is awaited, so 'return (async () => {...})()' works. Objects and arrays come back as JSON. Each call is a fresh function scope: for helpers that should survive reloads, use addInitScript.",
    params: [
      { name: "script", type: "string", required: true, desc: "JavaScript source to execute. Use 'return' to produce a result." },
      { name: "timeoutMs", type: "integer", required: false, desc: "Script timeout in milliseconds, for long-running or awaited scripts. Defaults to the session's setting (30000 unless changed)." }
    ]
  },
  {
    name: "addInitScript",
    category: "ScriptTools",
    cdp: true,
    signature: "addInitScript(script, runNow?)",
    description: "Register JavaScript that runs at the start of every page load in the current tab, before the page's own scripts (e.g. to define helpers on window or hook console.error). Survives navigations and reloads. Returns an id for removeInitScript. Requires Chrome or Edge.",
    params: [
      { name: "script", type: "string", required: true, desc: "JavaScript source to run on each new document." },
      { name: "runNow", type: "boolean", required: false, desc: "Also run it on the current page immediately. Defaults to true." }
    ]
  },
  {
    name: "removeInitScript",
    category: "ScriptTools",
    cdp: true,
    signature: "removeInitScript(id?)",
    description: "Remove init scripts registered with addInitScript: one by id, or all when id is omitted. Already-loaded pages are unaffected until they reload.",
    params: [
      { name: "id", type: "string", required: false, desc: "Id returned by addInitScript. Omit to remove all." }
    ]
  },
  {
    name: "scrollIntoView",
    category: "ScriptTools",
    signature: "scrollIntoView(locatorType, locatorValue, index?, visibleOnly?)",
    description: "Scroll the page so that an element is in view, located by a strategy and value.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the element" },
      { name: "index", type: "integer", required: false, desc: "Zero-based index of the match to use when the locator matches several elements. Defaults to the first match." },
      { name: "visibleOnly", type: "boolean", required: false, desc: "Only consider elements that are currently displayed (applied before index). Defaults to false." }
    ]
  },
  {
    name: "scrollBy",
    category: "ScriptTools",
    signature: "scrollBy(x, y)",
    description: "Scroll the page by the given horizontal and vertical pixel offsets.",
    params: [
      { name: "x", type: "integer", required: true, desc: "Horizontal pixels to scroll" },
      { name: "y", type: "integer", required: true, desc: "Vertical pixels to scroll" }
    ]
  },
  {
    name: "scrollToTop",
    category: "ScriptTools",
    signature: "scrollToTop()",
    description: "Scroll to the top of the page."
  },
  {
    name: "scrollToBottom",
    category: "ScriptTools",
    signature: "scrollToBottom()",
    description: "Scroll to the bottom of the page."
  },

  // FileTools
  {
    name: "uploadFile",
    category: "FileTools",
    signature: "uploadFile(locatorType, locatorValue, absoluteFilePath)",
    description: "Upload a local file by sending its absolute path to an <input type=\"file\"> element. The file must exist on the machine running the browser.",
    params: [
      { name: "locatorType", type: "string", required: true, desc: "Locator strategy: id, name, css, xpath, className, linkText, partialLinkText, or tagName" },
      { name: "locatorValue", type: "string", required: true, desc: "The locator value to find the file input element" },
      { name: "absoluteFilePath", type: "string", required: true, desc: "Absolute path of the local file to upload" }
    ]
  },
  {
    name: "printToPdf",
    category: "FileTools",
    signature: "printToPdf(filePath?)",
    description: "Print the current page to PDF. Saves to filePath if given, otherwise returns the PDF as base64.",
    params: [
      { name: "filePath", type: "string", required: false, desc: "Absolute file path to save the PDF to. If omitted, the PDF is returned as base64." }
    ]
  },

  // SystemTools
  {
    name: "getStatus",
    category: "SystemTools",
    signature: "getStatus()",
    description: "Check that the Selenium MCP server process is running and responsive. Returns a short health message; does not report browser state."
  }
];

export const LOCATOR_STRATEGIES = [
  { key: 'css / cssSelector', description: 'Standard CSS selector matching (e.g. "form#login > input.email")', recommended: true },
  { key: 'xpath', description: 'XPath 1.0 expression (e.g. "//button[text()=\'Submit\']")' },
  { key: 'id', description: 'Matches exact element id attribute value' },
  { key: 'name', description: 'Matches form field name attribute value' },
  { key: 'className / class', description: 'Matches element class attribute' },
  { key: 'linkText', description: 'Matches exact visible text of an <a> link tag' },
  { key: 'partialLinkText', description: 'Matches substring of visible text in an <a> link tag' },
  { key: 'tagName / tag', description: 'Matches HTML tag name (e.g. "button", "h1")' }
];

export const COMPARISON_MATRIX = [
  {
    feature: 'Language / Stack',
    seleniumMcp: 'Java 21 (Spring Boot + Spring AI)',
    otherSelenium: 'Mostly Python/Node wrappers',
    playwrightMcp: 'Node.js (TypeScript)'
  },
  {
    feature: 'Browser Engines',
    seleniumMcp: 'Selenium WebDriver (Chrome, Firefox, Edge)',
    otherSelenium: 'Selenium WebDriver (basic)',
    playwrightMcp: 'Playwright (Chromium, Firefox, WebKit)'
  },
  {
    feature: 'Structured Element Discovery',
    seleniumMcp: 'Yes — Filtered queries with exact ancestor/sibling tree context',
    otherSelenium: 'No — forces raw getPageSource dumps',
    playwrightMcp: 'Yes — accessibility-tree snapshot'
  },
  {
    feature: 'CDP Network Capture & Mocking',
    seleniumMcp: 'Yes (Selenium 4 DevTools: capture, mock, block, console logs)',
    otherSelenium: 'Rare / None',
    playwrightMcp: 'Yes'
  },
  {
    feature: 'Standalone REST / API Testing',
    seleniumMcp: 'Yes (built-in ApiTools for combined UI + API workflows)',
    otherSelenium: 'No',
    playwrightMcp: 'No'
  },
  {
    feature: 'Install',
    seleniumMcp: 'npx -y @xpathy/selenium-mcp (Java runtime bundled, drivers auto-managed by WebDriverManager)',
    otherSelenium: 'Manual PATH setup required',
    playwrightMcp: 'npx @playwright/mcp@latest'
  }
];
