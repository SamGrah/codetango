// Shared Vega config merged into every chart at build time (see scripts/build-charts.mjs).
// Agents author only data + encoding in a *.vl.json spec; this supplies the codeTango
// look so charts stay on-brand without repeating styling in each spec. A spec's own
// `config` block overrides these defaults per-chart.
//
// Palette = the site's teal ramp (see visual-style-guide.md). Text is dark slate so it
// reads on white (light mode) and on the light panel the CSS gives chart images in dark
// mode — the same treatment the Mermaid diagrams get. Background is transparent.

export const chartTheme = {
  font: 'Open Sans, system-ui, sans-serif',
  background: null,
  view: { stroke: null },
  padding: 5,
  axis: {
    labelColor: '#1f2a27',
    titleColor: '#1f2a27',
    labelFontSize: 12,
    titleFontSize: 13,
    titleFontWeight: 600,
    titlePadding: 8,
    gridColor: '#e7ecea',
    domainColor: '#c9d6d2',
    tickColor: '#c9d6d2',
    labelPadding: 4,
  },
  legend: {
    labelColor: '#1f2a27',
    titleColor: '#1f2a27',
    labelFontSize: 12,
    titleFontSize: 12,
  },
  title: { color: '#1f2a27', fontSize: 15, fontWeight: 700, anchor: 'start', offset: 12 },
  range: {
    category: ['#00695C', '#009688', '#4DB6AC', '#80CBC4', '#26A69A', '#B2DFDB'],
    ramp: ['#B2DFDB', '#004D40'],
  },
  bar: { fill: '#009688' },
  line: { stroke: '#00897B', strokeWidth: 2.5 },
  point: { fill: '#00897B', size: 55 },
  area: { fill: '#4DB6AC', fillOpacity: 0.85 },
  arc: { fill: '#009688' },
  rule: { stroke: '#c9d6d2' },
};
