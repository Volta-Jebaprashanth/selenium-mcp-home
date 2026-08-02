export const TOOL_CATEGORIES = [
  { id: 'PageSourceTools', name: 'PageSourceTools (Flagship)', description: 'Token-efficient page inspection & smart element discovery', icon: 'Sparkles', color: 'orange' },
  { id: 'BrowserTools', name: 'BrowserTools', description: 'Browser lifecycle, navigation & core interactions', icon: 'Compass', color: 'zinc' },
  { id: 'ElementQueryTools', name: 'ElementQueryTools', description: 'Element attributes, state checks & size metrics', icon: 'Search', color: 'zinc' },
  { id: 'WaitTools', name: 'WaitTools', description: 'Explicit synchronization waits for dynamic DOM states', icon: 'Clock', color: 'zinc' },
  { id: 'NetworkTools', name: 'NetworkTools (CDP)', description: 'Passive network capture, request mocking & console logs (Chrome/Edge)', icon: 'Activity', color: 'orange' },
  { id: 'ApiTools', name: 'ApiTools', description: 'Standalone REST client for combined UI + API testing', icon: 'Globe', color: 'orange' },
  { id: 'ActionsTools', name: 'ActionsTools', description: 'Advanced mouse hovering, drag & drop, keyboard events', icon: 'MousePointer', color: 'zinc' },
  { id: 'AlertTools', name: 'AlertTools', description: 'Handling browser dialogs, confirms, and prompts', icon: 'AlertTriangle', color: 'zinc' },
  { id: 'FrameTools', name: 'FrameTools', description: 'Switching context between main page and iframes', icon: 'Layers', color: 'zinc' },
  { id: 'WindowTools', name: 'WindowTools', description: 'Managing tabs, popups, and window sizing', icon: 'Maximize2', color: 'zinc' },
  { id: 'SelectTools', name: 'SelectTools', description: 'Manipulating HTML <select> dropdowns', icon: 'ChevronDown', color: 'zinc' },
  { id: 'CookieTools', name: 'CookieTools', description: 'Reading, injecting & clearing session cookies', icon: 'Cookie', color: 'zinc' },
  { id: 'ScreenshotTools', name: 'ScreenshotTools', description: 'Viewport & full element screenshot capture', icon: 'Camera', color: 'zinc' },
  { id: 'ScriptTools', name: 'ScriptTools', description: 'Executing custom JavaScript & scroll manipulation', icon: 'Code', color: 'zinc' },
  { id: 'FileTools', name: 'FileTools', description: 'Uploading local files & generating PDFs', icon: 'FileUp', color: 'zinc' },
  { id: 'SystemTools', name: 'SystemTools', description: 'Server health checks & driver status', icon: 'Cpu', color: 'zinc' },
];

export const ALL_TOOLS = [
  // PageSourceTools
  {
    name: 'getPageElementsFiltered',
    category: 'PageSourceTools',
    flagship: true,
    signature: 'getPageElementsFiltered(locatorStrategy, locatorValue, maxResults, maxDepth, includeAncestorChain)',
    description: 'Finds every matching element in a single call and returns its exact ancestor chain and sibling position (e.g. div.container > form#login > input:nth-of-type(2)) so the AI agent writes locators that succeed on the first try.',
    params: [
      { name: 'locatorStrategy', type: 'string', required: true, desc: 'id, css, xpath, name, className, linkText, partialLinkText, tagName' },
      { name: 'locatorValue', type: 'string', required: true, desc: 'Selector expression string' },
      { name: 'maxResults', type: 'integer', required: false, desc: 'Limit returned elements count (default: 20)' },
      { name: 'maxDepth', type: 'integer', required: false, desc: 'Maximum ancestor tree depth (default: 5)' },
      { name: 'includeAncestorChain', type: 'boolean', required: false, desc: 'Whether to include full parent hierarchy (default: true)' }
    ],
    example: 'getPageElementsFiltered("css", "button[type=\'submit\']", 5, 4, true)'
  },
  {
    name: 'getPageElements',
    category: 'PageSourceTools',
    flagship: false,
    signature: 'getPageElements(maxDepth, capLength)',
    description: 'Returns the entire visible page structured as a compact, depth-capped JSON element tree, eliminating raw HTML noise.',
    params: [
      { name: 'maxDepth', type: 'integer', required: false, desc: 'Maximum DOM traversal depth' },
      { name: 'capLength', type: 'integer', required: false, desc: 'Truncate text content over N characters' }
    ]
  },
  {
    name: 'getPageScripts',
    category: 'PageSourceTools',
    signature: 'getPageScripts()',
    description: 'Scans and returns all inline and external <script> tags on the page as structured JSON.'
  },
  {
    name: 'getPageStyles',
    category: 'PageSourceTools',
    signature: 'getPageStyles()',
    description: 'Scans and returns all active stylesheets and inline <style> blocks.'
  },

  // BrowserTools
  {
    name: 'openBrowser',
    category: 'BrowserTools',
    signature: 'openBrowser(browserType, headless, arguments)',
    description: 'Launches a new Chrome, Edge, or Firefox browser instance managed auto-magically by WebDriverManager.',
    params: [
      { name: 'browserType', type: 'string', required: false, desc: '"chrome" (default), "firefox", or "edge"' },
      { name: 'headless', type: 'boolean', required: false, desc: 'Run browser in headless background mode' },
      { name: 'arguments', type: 'array[string]', required: false, desc: 'Custom browser startup flags e.g. ["--incognito"]' }
    ]
  },
  {
    name: 'closeBrowser',
    category: 'BrowserTools',
    signature: 'closeBrowser()',
    description: 'Gracefully closes the active browser session and frees all underlying system driver processes.'
  },
  {
    name: 'navigate',
    category: 'BrowserTools',
    signature: 'navigate(url)',
    description: 'Navigates the browser to the specified HTTP/HTTPS web address.',
    params: [{ name: 'url', type: 'string', required: true, desc: 'Target URL to load' }]
  },
  {
    name: 'back',
    category: 'BrowserTools',
    signature: 'back()',
    description: 'Navigates back one step in browser history.'
  },
  {
    name: 'forward',
    category: 'BrowserTools',
    signature: 'forward()',
    description: 'Navigates forward one step in browser history.'
  },
  {
    name: 'refresh',
    category: 'BrowserTools',
    signature: 'refresh()',
    description: 'Reloads the current page context.'
  },
  {
    name: 'getCurrentUrl',
    category: 'BrowserTools',
    signature: 'getCurrentUrl()',
    description: 'Returns the exact active URL string from the address bar.'
  },
  {
    name: 'getTitle',
    category: 'BrowserTools',
    signature: 'getTitle()',
    description: 'Returns the HTML document title string.'
  },
  {
    name: 'getPageSource',
    category: 'BrowserTools',
    signature: 'getPageSource()',
    description: 'Returns raw HTML page source (use PageSourceTools for token-efficient JSON alternative).'
  },
  {
    name: 'click',
    category: 'BrowserTools',
    signature: 'click(locatorStrategy, locatorValue)',
    description: 'Clicks the specified DOM element after verifying clickability.',
    params: [
      { name: 'locatorStrategy', type: 'string', required: true, desc: 'id, css, xpath, name, linkText, etc.' },
      { name: 'locatorValue', type: 'string', required: true, desc: 'Locator target' }
    ]
  },
  {
    name: 'sendKeys',
    category: 'BrowserTools',
    signature: 'sendKeys(locatorStrategy, locatorValue, text, clearFirst)',
    description: 'Types keystrokes into input field with option to clear existing value first.',
    params: [
      { name: 'locatorStrategy', type: 'string', required: true, desc: 'Locator type' },
      { name: 'locatorValue', type: 'string', required: true, desc: 'Target element' },
      { name: 'text', type: 'string', required: true, desc: 'Text content to type' },
      { name: 'clearFirst', type: 'boolean', required: false, desc: 'Clear existing text before typing (default: true)' }
    ]
  },

  // ElementQueryTools
  { name: 'getText', category: 'ElementQueryTools', signature: 'getText(strategy, value)', description: 'Returns visible inner text of matching element.' },
  { name: 'getAttribute', category: 'ElementQueryTools', signature: 'getAttribute(strategy, value, attributeName)', description: 'Retrieves specific HTML attribute value.' },
  { name: 'getCssValue', category: 'ElementQueryTools', signature: 'getCssValue(strategy, value, cssProperty)', description: 'Retrieves computed CSS style property.' },
  { name: 'getTagName', category: 'ElementQueryTools', signature: 'getTagName(strategy, value)', description: 'Returns lower-case HTML tag name of element.' },
  { name: 'isDisplayed', category: 'ElementQueryTools', signature: 'isDisplayed(strategy, value)', description: 'Checks if element is visible on rendering tree.' },
  { name: 'isEnabled', category: 'ElementQueryTools', signature: 'isEnabled(strategy, value)', description: 'Checks if form control or button is enabled.' },
  { name: 'isSelected', category: 'ElementQueryTools', signature: 'isSelected(strategy, value)', description: 'Checks if checkbox/radio input is checked.' },
  { name: 'getElementSize', category: 'ElementQueryTools', signature: 'getElementSize(strategy, value)', description: 'Returns object with width and height in pixels.' },
  { name: 'getElementLocation', category: 'ElementQueryTools', signature: 'getElementLocation(strategy, value)', description: 'Returns x,y coordinates relative to document top-left.' },
  { name: 'elementExists', category: 'ElementQueryTools', signature: 'elementExists(strategy, value)', description: 'Quick check if element is present in DOM.' },
  { name: 'countElements', category: 'ElementQueryTools', signature: 'countElements(strategy, value)', description: 'Returns integer count of matching elements.' },
  { name: 'getElementsText', category: 'ElementQueryTools', signature: 'getElementsText(strategy, value)', description: 'Returns array of text strings for all matching elements.' },

  // WaitTools
  { name: 'waitForVisible', category: 'WaitTools', signature: 'waitForVisible(strategy, value, timeoutSeconds)', description: 'Waits until element becomes visible.' },
  { name: 'waitForClickable', category: 'WaitTools', signature: 'waitForClickable(strategy, value, timeoutSeconds)', description: 'Waits until element is enabled and clickable.' },
  { name: 'waitForPresent', category: 'WaitTools', signature: 'waitForPresent(strategy, value, timeoutSeconds)', description: 'Waits until element exists in DOM tree.' },
  { name: 'waitForInvisible', category: 'WaitTools', signature: 'waitForInvisible(strategy, value, timeoutSeconds)', description: 'Waits until element disappears or becomes hidden.' },
  { name: 'waitForTextPresent', category: 'WaitTools', signature: 'waitForTextPresent(strategy, value, text, timeoutSeconds)', description: 'Waits until target text appears inside element.' },
  { name: 'waitForTitleContains', category: 'WaitTools', signature: 'waitForTitleContains(titleSubstring, timeoutSeconds)', description: 'Waits for window title to contain substring.' },
  { name: 'waitForUrlContains', category: 'WaitTools', signature: 'waitForUrlContains(urlSubstring, timeoutSeconds)', description: 'Waits for current URL to match substring.' },
  { name: 'waitForPageLoad', category: 'WaitTools', signature: 'waitForPageLoad(timeoutSeconds)', description: 'Waits until document.readyState equals "complete".' },
  { name: 'waitForJsCondition', category: 'WaitTools', signature: 'waitForJsCondition(script, timeoutSeconds)', description: 'Evaluates JavaScript until expression returns true.' },
  { name: 'waitForElementCount', category: 'WaitTools', signature: 'waitForElementCount(strategy, value, count, timeoutSeconds)', description: 'Waits until matching elements equal count.' },
  { name: 'waitForAttributeToBe', category: 'WaitTools', signature: 'waitForAttributeToBe(strategy, value, attribute, expectedValue, timeoutSeconds)', description: 'Waits until HTML attribute matches value.' },
  { name: 'waitForNumberOfWindowsToBe', category: 'WaitTools', signature: 'waitForNumberOfWindowsToBe(count, timeoutSeconds)', description: 'Waits for active tab/window count to reach expected N.' },

  // AlertTools
  { name: 'acceptAlert', category: 'AlertTools', signature: 'acceptAlert()', description: 'Clicks "OK" or accepts JavaScript alert/confirm popup.' },
  { name: 'dismissAlert', category: 'AlertTools', signature: 'dismissAlert()', description: 'Clicks "Cancel" or dismisses JavaScript confirm/prompt.' },
  { name: 'getAlertText', category: 'AlertTools', signature: 'getAlertText()', description: 'Returns text content displayed in active modal dialog.' },
  { name: 'sendKeysToAlert', category: 'AlertTools', signature: 'sendKeysToAlert(text)', description: 'Types text into interactive prompt popup before accepting.' },
  { name: 'isAlertPresent', category: 'AlertTools', signature: 'isAlertPresent()', description: 'Checks if an alert dialog is currently active.' },

  // FrameTools
  { name: 'switchToFrameByIndex', category: 'FrameTools', signature: 'switchToFrameByIndex(index)', description: 'Switches focus to iframe by zero-based index.' },
  { name: 'switchToFrameByNameOrId', category: 'FrameTools', signature: 'switchToFrameByNameOrId(nameOrId)', description: 'Switches focus to iframe matching name or id.' },
  { name: 'switchToFrame', category: 'FrameTools', signature: 'switchToFrame(strategy, value)', description: 'Switches focus to iframe target locator.' },
  { name: 'switchToDefaultContent', category: 'FrameTools', signature: 'switchToDefaultContent()', description: 'Returns context to main top-level document.' },
  { name: 'switchToParentFrame', category: 'FrameTools', signature: 'switchToParentFrame()', description: 'Switches context to immediate parent iframe container.' },

  // WindowTools
  { name: 'maximizeWindow', category: 'WindowTools', signature: 'maximizeWindow()', description: 'Maximizes browser window.' },
  { name: 'minimizeWindow', category: 'WindowTools', signature: 'minimizeWindow()', description: 'Minimizes browser window to taskbar.' },
  { name: 'fullscreenWindow', category: 'WindowTools', signature: 'fullscreenWindow()', description: 'Sets browser into OS full-screen mode.' },
  { name: 'setWindowSize', category: 'WindowTools', signature: 'setWindowSize(width, height)', description: 'Resizes browser viewport dimensions in pixels.' },
  { name: 'getWindowSize', category: 'WindowTools', signature: 'getWindowSize()', description: 'Returns width and height of browser window.' },
  { name: 'setWindowPosition', category: 'WindowTools', signature: 'setWindowPosition(x, y)', description: 'Moves browser window on desktop screen coordinates.' },
  { name: 'getWindowHandle', category: 'WindowTools', signature: 'getWindowHandle()', description: 'Returns unique identifier string for active window/tab.' },
  { name: 'getWindowHandles', category: 'WindowTools', signature: 'getWindowHandles()', description: 'Returns array of all open window handle tokens.' },
  { name: 'switchToWindow', category: 'WindowTools', signature: 'switchToWindow(handleOrTitle)', description: 'Switches driver focus to specified tab or window.' },
  { name: 'openNewTab', category: 'WindowTools', signature: 'openNewTab(url)', description: 'Opens new browser tab and optionally navigates to URL.' },
  { name: 'closeCurrentWindow', category: 'WindowTools', signature: 'closeCurrentWindow()', description: 'Closes active tab/window.' },

  // CookieTools
  { name: 'addCookie', category: 'CookieTools', signature: 'addCookie(name, value, domain, path, isSecure, isHttpOnly)', description: 'Injects cookie into active browser domain context.' },
  { name: 'getCookie', category: 'CookieTools', signature: 'getCookie(name)', description: 'Retrieves cookie object by name.' },
  { name: 'getAllCookies', category: 'CookieTools', signature: 'getAllCookies()', description: 'Returns array of all cookies for active domain.' },
  { name: 'deleteCookie', category: 'CookieTools', signature: 'deleteCookie(name)', description: 'Deletes cookie by name.' },
  { name: 'deleteAllCookies', category: 'CookieTools', signature: 'deleteAllCookies()', description: 'Clears all cookies for active session.' },

  // ScreenshotTools
  { name: 'takeScreenshot', category: 'ScreenshotTools', signature: 'takeScreenshot(outputFormat)', description: 'Captures full viewport screenshot (base64 or file path).' },
  { name: 'takeElementScreenshot', category: 'ScreenshotTools', signature: 'takeElementScreenshot(strategy, value)', description: 'Captures cropped screenshot of specific element.' },

  // ScriptTools
  { name: 'executeScript', category: 'ScriptTools', signature: 'executeScript(script, args)', description: 'Executes synchronous JavaScript snippet inside browser.' },
  { name: 'scrollIntoView', category: 'ScriptTools', signature: 'scrollIntoView(strategy, value)', description: 'Scrolls viewport until element is aligned in view.' },
  { name: 'scrollBy', category: 'ScriptTools', signature: 'scrollBy(xPixels, yPixels)', description: 'Scrolls viewport by x,y relative distance.' },
  { name: 'scrollToTop', category: 'ScriptTools', signature: 'scrollToTop()', description: 'Scrolls page back to top (0,0).' },
  { name: 'scrollToBottom', category: 'ScriptTools', signature: 'scrollToBottom()', description: 'Scrolls page to bottom of scroll height.' },

  // ActionsTools
  { name: 'hover', category: 'ActionsTools', signature: 'hover(strategy, value)', description: 'Moves cursor over target element triggering hover effects.' },
  { name: 'doubleClick', category: 'ActionsTools', signature: 'doubleClick(strategy, value)', description: 'Performs mouse double-click.' },
  { name: 'rightClick', category: 'ActionsTools', signature: 'rightClick(strategy, value)', description: 'Performs right click opening context menu.' },
  { name: 'clickAndHold', category: 'ActionsTools', signature: 'clickAndHold(strategy, value)', description: 'Holds left mouse button down on element.' },
  { name: 'releaseClick', category: 'ActionsTools', signature: 'releaseClick()', description: 'Releases held mouse button.' },
  { name: 'dragAndDrop', category: 'ActionsTools', signature: 'dragAndDrop(sourceStrategy, sourceVal, targetStrategy, targetVal)', description: 'Drags source element and drops onto target element.' },
  { name: 'dragAndDropByOffset', category: 'ActionsTools', signature: 'dragAndDropByOffset(strategy, value, xOffset, yOffset)', description: 'Drags element by relative pixel distance.' },
  { name: 'pressKey', category: 'ActionsTools', signature: 'pressKey(keyName)', description: 'Simulates special key stroke (e.g. ENTER, TAB, ESCAPE, BACK_SPACE).' },

  // SelectTools
  { name: 'selectByVisibleText', category: 'SelectTools', signature: 'selectByVisibleText(strategy, value, visibleText)', description: 'Selects dropdown option matching visible text.' },
  { name: 'selectByValue', category: 'SelectTools', signature: 'selectByValue(strategy, value, optionValue)', description: 'Selects dropdown option matching value attribute.' },
  { name: 'selectByIndex', category: 'SelectTools', signature: 'selectByIndex(strategy, value, index)', description: 'Selects dropdown option by index.' },
  { name: 'deselectAllOptions', category: 'SelectTools', signature: 'deselectAllOptions(strategy, value)', description: 'Deselects all options in multi-select element.' },
  { name: 'getSelectedOptionsText', category: 'SelectTools', signature: 'getSelectedOptionsText(strategy, value)', description: 'Returns array of selected option labels.' },
  { name: 'isMultipleSelect', category: 'SelectTools', signature: 'isMultipleSelect(strategy, value)', description: 'Checks if select tag allows multiple selections.' },

  // FileTools
  { name: 'uploadFile', category: 'FileTools', signature: 'uploadFile(strategy, value, absoluteFilePath)', description: 'Sets file path directly onto <input type="file"> element.' },
  { name: 'printToPdf', category: 'FileTools', signature: 'printToPdf(savePath, pageOrientation)', description: 'Exports current page view to PDF file (Chrome/Edge).' },

  // NetworkTools (CDP Superpowers)
  { name: 'startNetworkCapture', category: 'NetworkTools', cdp: true, signature: 'startNetworkCapture()', description: 'Activates passive network monitoring via Selenium 4 DevTools Protocol.' },
  { name: 'stopNetworkCapture', category: 'NetworkTools', cdp: true, signature: 'stopNetworkCapture()', description: 'Stops network traffic capture.' },
  { name: 'getNetworkLog', category: 'NetworkTools', cdp: true, signature: 'getNetworkLog(filterUrlPattern)', description: 'Returns captured HTTP requests and responses matching optional pattern filter.' },
  { name: 'clearNetworkLog', category: 'NetworkTools', cdp: true, signature: 'clearNetworkLog()', description: 'Flushes stored network log buffer.' },
  { name: 'waitForNetworkIdle', category: 'NetworkTools', cdp: true, signature: 'waitForNetworkIdle(idleTimeMs, timeoutSeconds)', description: 'Waits until zero in-flight HTTP requests remain active.' },
  { name: 'getPendingRequestCount', category: 'NetworkTools', cdp: true, signature: 'getPendingRequestCount()', description: 'Returns count of active pending network requests.' },
  { name: 'mockResponse', category: 'NetworkTools', cdp: true, signature: 'mockResponse(urlPattern, statusCode, responseBodyJson, headers)', description: 'Intercepts matching API requests and returns mocked HTTP response.' },
  { name: 'clearMockResponses', category: 'NetworkTools', cdp: true, signature: 'clearMockResponses()', description: 'Removes all active API mocks.' },
  { name: 'blockRequests', category: 'NetworkTools', cdp: true, signature: 'blockRequests(urlPatterns)', description: 'Blocks requests matching patterns (e.g. ad servers, analytics tracking).' },
  { name: 'clearBlockedRequests', category: 'NetworkTools', cdp: true, signature: 'clearBlockedRequests()', description: 'Clears all request block rules.' },
  { name: 'setNetworkConditions', category: 'NetworkTools', cdp: true, signature: 'setNetworkConditions(offline, latencyMs, downloadThroughput, uploadThroughput)', description: 'Emulates network throttling (3G, slow connection, offline).' },
  { name: 'getNetworkConditions', category: 'NetworkTools', cdp: true, signature: 'getNetworkConditions()', description: 'Returns active network throttling configuration.' },
  { name: 'clearNetworkConditions', category: 'NetworkTools', cdp: true, signature: 'clearNetworkConditions()', description: 'Resets network emulation back to unthrottled.' },
  { name: 'setBasicAuthCredentials', category: 'NetworkTools', cdp: true, signature: 'setBasicAuthCredentials(username, password)', description: 'Automatically injects HTTP Basic Auth headers.' },
  { name: 'startConsoleCapture', category: 'NetworkTools', cdp: true, signature: 'startConsoleCapture()', description: 'Starts capturing console.log, info, warn, and error events.' },
  { name: 'getConsoleLogs', category: 'NetworkTools', cdp: true, signature: 'getConsoleLogs(minLevel)', description: 'Retrieves captured browser console messages filtered by severity.' },
  { name: 'clearConsoleLogs', category: 'NetworkTools', cdp: true, signature: 'clearConsoleLogs()', description: 'Flushes console buffer.' },

  // ApiTools
  { name: 'httpGet', category: 'ApiTools', signature: 'httpGet(url, headers, queryParams)', description: 'Executes standalone HTTP GET request without opening a browser window.' },
  { name: 'httpPost', category: 'ApiTools', signature: 'httpPost(url, bodyJson, headers)', description: 'Executes HTTP POST request for API seeding or integration checks.' },
  { name: 'httpPut', category: 'ApiTools', signature: 'httpPut(url, bodyJson, headers)', description: 'Executes HTTP PUT request.' },
  { name: 'httpPatch', category: 'ApiTools', signature: 'httpPatch(url, bodyJson, headers)', description: 'Executes HTTP PATCH request.' },
  { name: 'httpDelete', category: 'ApiTools', signature: 'httpDelete(url, headers)', description: 'Executes HTTP DELETE request.' },
  { name: 'httpRequest', category: 'ApiTools', signature: 'httpRequest(method, url, body, headers)', description: 'Executes custom HTTP request with full control over payload and verb.' },

  // SystemTools
  { name: 'getStatus', category: 'SystemTools', signature: 'getStatus()', description: 'Returns MCP server version, JVM uptime, active browser status, and active drivers.' }
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
    feature: 'Driver Setup',
    seleniumMcp: 'Zero setup (WebDriverManager auto-downloads & manages drivers)',
    otherSelenium: 'Manual PATH setup required',
    playwrightMcp: 'npx playwright install'
  }
];
