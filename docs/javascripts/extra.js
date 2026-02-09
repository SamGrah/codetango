function getHomePath() {
  if (window.__md_scope && window.__md_scope.pathname) {
    return window.__md_scope.pathname.replace(/\/?$/, "/");
  }

  return new URL(".", window.location.href).pathname;
}

const MERMAID_MODULE_URL = "https://unpkg.com/mermaid@10.4.0/dist/mermaid.esm.min.mjs";
let mermaidModulePromise;
let mermaidInitialized = false;
let internalNavigationBound = false;
let internalNavigationInFlight = false;

// Style the site name: wrap "code" in a span for targeted styling
function styleSiteName() {
  // Target header site name only (sidebar text is hidden via CSS)
  const siteNameElements = document.querySelectorAll(".md-header__topic:first-child .md-ellipsis");
  siteNameElements.forEach(function (el) {
    const text = el.textContent.trim();
    if (text !== "codeTango" || el.querySelector(".site-name-code")) {
      return;
    }

    const parentLink = el.closest("a");
    if (parentLink) {
      parentLink.classList.add("site-name-link");
      el.innerHTML = '<span class="site-name-code">code</span><span class="site-name-tango">Tango</span>';
      return;
    }

    el.innerHTML =
      '<a href="' +
      getHomePath() +
      '" class="site-name-link"><span class="site-name-code">code</span><span class="site-name-tango">Tango</span></a>';
  });
}

function normalizeInternalLinks(root) {
  if (!root) {
    return;
  }

  const links = root.querySelectorAll("a[href^='http://'], a[href^='https://']");
  links.forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href || link.hasAttribute("target") || link.hasAttribute("download")) {
      return;
    }

    let url;
    try {
      url = new URL(href);
    } catch (_err) {
      return;
    }

    if (url.origin !== window.location.origin) {
      return;
    }

    const normalized = url.pathname + url.search + url.hash;
    if (href !== normalized) {
      link.setAttribute("href", normalized);
    }
  });
}

function syncTabsPlacement() {
  const isNarrow = window.matchMedia("(max-width: 59.984375em)").matches;
  const headerInner = document.querySelector(".md-header__inner");
  const header = document.querySelector(".md-header");
  const tabs = document.querySelector(".md-tabs");
  if (!headerInner) {
    return;
  }
  if (!header || !tabs) {
    return;
  }

  if (isNarrow) {
    if (tabs.parentElement !== headerInner) {
      tabs.classList.add("md-tabs--in-header");

      const search = headerInner.querySelector(".md-search");
      const palette = headerInner.querySelector("[data-md-component='palette']");
      if (search) {
        headerInner.insertBefore(tabs, search);
      } else if (palette) {
        headerInner.insertBefore(tabs, palette);
      } else {
        headerInner.appendChild(tabs);
      }
    }
    return;
  }

  tabs.classList.remove("md-tabs--in-header");
  if (tabs.parentElement === headerInner) {
    const parent = header.parentElement;
    if (parent) {
      parent.insertBefore(tabs, header.nextSibling);
    }
  }
}

function primeMermaidModule() {
  if (document.querySelector('link[rel="modulepreload"][href="' + MERMAID_MODULE_URL + '"]')) {
    return;
  }

  const preload = document.createElement("link");
  preload.rel = "modulepreload";
  preload.href = MERMAID_MODULE_URL;
  document.head.appendChild(preload);
}

function loadMermaidModule() {
  if (!mermaidModulePromise) {
    mermaidModulePromise = import(MERMAID_MODULE_URL).then(function (mod) {
      return mod.default || mod;
    });
  }

  return mermaidModulePromise;
}

async function renderMermaidBlocks(root) {
  const scope = root || document;
  const blocks = Array.from(scope.querySelectorAll("pre.mermaid")).filter(function (block) {
    return block.dataset.mermaidRendered !== "true";
  });

  if (!blocks.length) {
    return;
  }

  const mermaid = await loadMermaidModule();
  if (!mermaidInitialized) {
    mermaid.initialize({ startOnLoad: false });
    mermaidInitialized = true;
  }

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];
    block.classList.add("mermaid-pending");

    const source = block.querySelector("code") ? block.querySelector("code").textContent : block.textContent;
    const graph = (source || "").trim();

    if (!graph) {
      block.dataset.mermaidRendered = "true";
      block.classList.remove("mermaid-pending");
      block.classList.add("mermaid-ready");
      continue;
    }

    try {
      const id = "ct-mermaid-" + Date.now() + "-" + i;
      const rendered = await mermaid.render(id, graph);
      block.innerHTML = rendered.svg;
      block.setAttribute("data-processed", "true");
    } catch (_err) {
      // Keep original code block when rendering fails
    }

    block.dataset.mermaidRendered = "true";
    block.classList.remove("mermaid-pending");
    block.classList.add("mermaid-ready");
  }
}

function stabilizeMermaidBlocks() {
  const blocks = document.querySelectorAll("pre.mermaid");
  blocks.forEach(function (block) {
    if (block.dataset.mermaidStabilized === "true") {
      return;
    }

    block.dataset.mermaidStabilized = "true";
    block.classList.add("mermaid-pending");

    const markReady = function () {
      block.classList.remove("mermaid-pending");
      block.classList.add("mermaid-ready");
    };

    const isReady = function () {
      return block.getAttribute("data-processed") === "true" || block.querySelector("svg");
    };

    if (isReady()) {
      markReady();
      return;
    }

    const observer = new MutationObserver(function () {
      if (isReady()) {
        observer.disconnect();
        markReady();
      }
    });

    observer.observe(block, { attributes: true, childList: true, subtree: true });

    window.setTimeout(function () {
      observer.disconnect();
      markReady();
    }, 2000);
  });
}

function normalizePathname(pathname) {
  if (!pathname) {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : pathname + "/";
}

function updateTabsActiveState(url) {
  const currentPath = normalizePathname(url.pathname);
  const links = document.querySelectorAll(".md-tabs__link");

  links.forEach(function (link) {
    let linkUrl;
    try {
      linkUrl = new URL(link.getAttribute("href"), window.location.href);
    } catch (_err) {
      return;
    }

    const linkPath = normalizePathname(linkUrl.pathname);
    const isActive = currentPath === linkPath || (linkPath !== "/" && currentPath.startsWith(linkPath));
    const item = link.closest(".md-tabs__item");

    if (item) {
      item.classList.toggle("md-tabs__item--active", isActive);
    }

    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function replaceContainerFromDocument(doc) {
  const incomingContainer = doc.querySelector(".md-container");
  const currentContainer = document.querySelector(".md-container");
  const incomingTabs = doc.querySelector(".md-tabs");
  const currentTabs = document.querySelector(".md-tabs");

  if (!incomingContainer || !currentContainer) {
    return false;
  }

  if (incomingTabs && currentTabs) {
    currentTabs.replaceWith(incomingTabs);
  }

  currentContainer.replaceWith(incomingContainer);
  return true;
}

async function navigateInternal(url, pushState) {
  if (internalNavigationInFlight) {
    return;
  }

  internalNavigationInFlight = true;

  try {
    const response = await fetch(url.pathname + url.search, {
      credentials: "same-origin",
      headers: { "X-Requested-With": "codetango-nav" },
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("text/html")) {
      window.location.href = url.href;
      return;
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    if (!replaceContainerFromDocument(doc)) {
      window.location.href = url.href;
      return;
    }

    if (doc.title) {
      document.title = doc.title;
    }

    if (pushState) {
      window.history.pushState({}, "", url.pathname + url.search + url.hash);
    }

    normalizeInternalLinks(document.querySelector("main"));
    normalizeInternalLinks(document.querySelector(".md-footer"));
    updateTabsActiveState(url);
    syncTabsPlacement();
    await renderMermaidBlocks(document);
    stabilizeMermaidBlocks();

    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  } catch (_err) {
    window.location.href = url.href;
  } finally {
    internalNavigationInFlight = false;
  }
}

function shouldHandleAsInternalLink(link, event) {
  if (!link) {
    return false;
  }

  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  if ((link.hasAttribute("target") && link.getAttribute("target") !== "_self") || link.hasAttribute("download")) {
    return false;
  }

  const rawHref = link.getAttribute("href");
  if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:")) {
    return false;
  }

  let url;
  try {
    url = new URL(link.href, window.location.href);
  } catch (_err) {
    return false;
  }

  if (url.origin !== window.location.origin) {
    return false;
  }

  if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
    return false;
  }

  return true;
}

function bindInternalNavigation() {
  if (internalNavigationBound) {
    return;
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href]");
    if (!shouldHandleAsInternalLink(link, event)) {
      return;
    }

    const url = new URL(link.href, window.location.href);
    event.preventDefault();
    navigateInternal(url, true);
  });

  window.addEventListener("popstate", function () {
    navigateInternal(new URL(window.location.href), false);
  });

  internalNavigationBound = true;
}

let tabsPlacementResizeBound = false;
let tabsPlacementInitialized = false;

// document$ is exposed by MkDocs Material — emits on initial load
// and after each instant navigation, replacing the need for
// DOMContentLoaded, setTimeout hacks, and click listeners
document$.subscribe(function () {
  styleSiteName();

  normalizeInternalLinks(document.querySelector(".md-header"));
  normalizeInternalLinks(document.querySelector(".md-tabs"));
  normalizeInternalLinks(document.querySelector("main"));
  normalizeInternalLinks(document.querySelector(".md-footer"));
  bindInternalNavigation();
  primeMermaidModule();
  renderMermaidBlocks(document).then(function () {
    stabilizeMermaidBlocks();
  });

  if (!tabsPlacementInitialized) {
    syncTabsPlacement();
    tabsPlacementInitialized = true;
  }

  if (!tabsPlacementResizeBound) {
    window.addEventListener("resize", syncTabsPlacement);
    tabsPlacementResizeBound = true;
  }
});
