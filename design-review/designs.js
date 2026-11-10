window.DESIGNS = [
  {
    id: 'conservative-plus',
    file: '01-conservative-plus.html',
    name: 'Conservative+',
    boundary: 'asymmetric grid and painted colour fields; ochre as a second accent alongside teal',
    revised: true,
    idea: 'Modular Poster, conservative refinement, with Moderate\'s palette, a solid teal quote field and the footer strip (teal rectangle, ink circle, ochre circle). Revised: ochre is now a real accent alongside teal and ink. It\'s used for the home quarter-disc, the post disc, the hanging H2 squares, the active nav underline, an edge on the quote field, and the text-selection highlight. It is never used for text.',
    palette: [
      { name: 'Paper (light page)', hex: '#FFFFFF' },
      { name: 'Ink (text and ink field)', hex: '#172A2F' },
      { name: 'Teal field and quote field (light)', hex: '#0E7C70' },
      { name: 'Ochre accent (light)', hex: '#C9962B' },
      { name: 'Night (dark page)', hex: '#0B1B20' },
      { name: 'Ochre accent (dark)', hex: '#D6A440' },
    ],
    type: 'Familjen Grotesk only. Post body 19/1.7 on a 44rem measure (18/1.65 below 46rem). System mono for code.',
    tradeoffs: [
      'Ochre is too light for text on white (about 2.6:1), so it stays on shapes, rules and highlights. Links remain teal.',
      'Ochre becomes part of the brand, so the visual style guide\'s palette and "no non-teal hues" rule need updating.',
      'On wide screens the quote field extends 3rem into the margins, which breaks the column edge on purpose.',
      'In Astro this is CSS tokens plus a few decorative spans in the layouts, so it\'s cheap to build.',
    ],
  },
];
