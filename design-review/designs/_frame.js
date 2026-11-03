// Shared frame contract for every design file.
// Reads ?theme=light|dark and ?view=home|post, applies them as data attributes on <html>,
// and wires [data-goto] links and [data-theme-toggle] buttons. When embedded in the
// reviewer, it reports state changes to the parent so the reviewer stays in sync.
(() => {
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const state = {
    theme: params.get('theme') || (systemDark ? 'dark' : 'light'),
    view: params.get('view') || 'home',
  };

  const apply = () => {
    root.dataset.theme = state.theme;
    root.dataset.view = state.view;
    const url = new URL(location.href);
    url.searchParams.set('theme', state.theme);
    url.searchParams.set('view', state.view);
    history.replaceState(null, '', url);
    if (parent !== window) parent.postMessage({ type: 'design-state', ...state }, '*');
  };

  apply();

  document.addEventListener('click', (e) => {
    const goto = e.target.closest('[data-goto]');
    if (goto) {
      e.preventDefault();
      state.view = goto.dataset.goto;
      apply();
      scrollTo(0, 0);
      return;
    }
    if (e.target.closest('[data-theme-toggle]')) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      apply();
    }
  });

  addEventListener('message', (e) => {
    if (e.data?.type !== 'set-state') return;
    if (e.data.view && e.data.view !== state.view) scrollTo(0, 0);
    Object.assign(state, { theme: e.data.theme ?? state.theme, view: e.data.view ?? state.view });
    apply();
  });
})();
