// Style the site name: wrap "code" in a span for targeted styling
function styleSiteName() {
  // Target header site name only (sidebar text is hidden via CSS)
  const siteNameElements = document.querySelectorAll(".md-header__topic .md-ellipsis");
  siteNameElements.forEach(function(el) {
    const text = el.textContent.trim();
    if (text === "codeTango" && !el.querySelector(".site-name-code")) {
      el.innerHTML = '<a href="/codetango/" class="site-name-link"><span class="site-name-code">code</span><span class="site-name-tango">Tango</span></a>';
    }
  });
}

// Run on DOMContentLoaded
document.addEventListener("DOMContentLoaded", styleSiteName);

// Run after delays for dynamic loading
setTimeout(styleSiteName, 100);
setTimeout(styleSiteName, 500);

// Run on navigation and drawer open (for instant loading)
document.addEventListener("click", function() {
  setTimeout(styleSiteName, 100);
  setTimeout(styleSiteName, 300);
});
