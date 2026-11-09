window.DESIGNS = [
  {
    "id": "modular-poster",
    "file": "01-modular-poster.html",
    "name": "Modular Poster (round 3 original)",
    "boundary": "asymmetric grid and painted colour fields instead of one quiet column",
    "idea": "The round 3 version you starred, unchanged, as the baseline for the three refinements. Flat Bauhaus colour blocks (teal block, ink bar, quarter-circle) on a 12-column grid, big flush-left titles with small meta on distant grid lines, and a centred 38rem post body.",
    "palette": [
      {
        "name": "Paper (light page)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (text and second block)",
        "hex": "#172A2F"
      },
      {
        "name": "Teal block (light)",
        "hex": "#0E7C70"
      },
      {
        "name": "Night (dark page)",
        "hex": "#0B1B20"
      },
      {
        "name": "Mineral (second block, dark)",
        "hex": "#9DB5B0"
      },
      {
        "name": "Aqua (dark links)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "Familjen Grotesk only, with real italics. Titles at 650 with tight tracking. Body 18/1.65 in a 38rem column.",
    "tradeoffs": [
      "The post body at 38rem is the width you asked to widen.",
      "The post title starts on grid column 3 while the body is centred, so their left edges don't line up.",
      "Meta columns get narrow between about 46rem and 62rem wide.",
      "The blocks paint in over 520ms, which is longer than the guide's 300ms ceiling."
    ],
    "round": 4,
    "status": "current"
  },
  {
    "id": "modular-poster-conservative",
    "file": "02-modular-poster-conservative.html",
    "name": "Conservative",
    "boundary": "asymmetric grid and painted colour fields instead of one quiet column",
    "isNew": true,
    "idea": "Polished, not changed. The post body is 44rem and slightly larger (19/1.7, about 75–80 characters per line). The title, synopsis and meta now share the body's left edge, and the blocks line up with the H2 squares and the page centre. Between 46rem and 62rem the meta becomes an inline row instead of a cramped strip. The paint-in is 240ms, and the vertical spacing is evened out.",
    "palette": [
      {
        "name": "Paper (light page)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (light text and ink field)",
        "hex": "#172A2F"
      },
      {
        "name": "Teal (painted field)",
        "hex": "#0E7C70"
      },
      {
        "name": "Night (dark page)",
        "hex": "#0B1B20"
      },
      {
        "name": "Mineral (dark second field)",
        "hex": "#9DB5B0"
      },
      {
        "name": "Aqua (dark link)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "Familjen Grotesk only. Post body 19/1.7 on a 44rem measure (18/1.65 below 46rem). Listing and chrome stay at 18px. System mono for code.",
    "tradeoffs": [
      "The post header uses its own named-line grid, so there is one more grid definition to maintain.",
      "Between 46rem and 62rem the ink block shrinks to a thin strip in the margin.",
      "With the title held to the 44rem measure, long titles wrap to three lines at the largest size.",
      "CSS only, so it's cheap to port."
    ],
    "round": 4,
    "status": "current"
  },
  {
    "id": "conservative-plus",
    "file": "05-conservative-plus.html",
    "name": "Conservative+",
    "boundary": "asymmetric grid and painted colour fields; ochre as a block-only accent",
    "isNew": true,
    "idea": "Conservative with three changes from your notes: Moderate's palette (which adds ochre as a block-only accent), the blockquote on a solid teal field that extends into the margins on wide screens, and a footer accent strip of a teal rectangle followed by two circles (ink and ochre).",
    "palette": [
      {
        "name": "Paper (light page)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (text and ink field)",
        "hex": "#172A2F"
      },
      {
        "name": "Teal field and quote field (light)",
        "hex": "#0E7C70"
      },
      {
        "name": "Ochre (footer circle only)",
        "hex": "#C9962B"
      },
      {
        "name": "Night (dark page)",
        "hex": "#0B1B20"
      },
      {
        "name": "Quote field (dark)",
        "hex": "#136A60"
      }
    ],
    "type": "Familjen Grotesk only. Post body 19/1.7 on a 44rem measure (18/1.65 below 46rem). System mono for code.",
    "tradeoffs": [
      "Conservative and Moderate already shared most colours, so the palette change mainly adds ochre and the quote field.",
      "Ochre appears only in the footer circle. It still needs your approval as a non-teal hue.",
      "On wide screens the quote field extends 3rem into the margins, which breaks the column edge on purpose.",
      "In Astro, the footer strip is three spans in Base.astro and costs nothing."
    ],
    "round": 4,
    "status": "current"
  },
  {
    "id": "modular-poster-moderate",
    "file": "03-modular-poster-moderate.html",
    "name": "Moderate",
    "boundary": "adds an ochre block colour and a full-grid diagram plate in the post body",
    "isNew": true,
    "idea": "The system pushed one step further. Each category has a block signature: Agentic Development is an ink bar with a teal disc, and Testing is an ochre bar with a teal quarter-disc. It shows as a small mark in the listing and at full size in the post header. The 43rem post body gets hanging tracks: teal bars on H2s, a wider track for code, a blockquote on a teal field, and the Venn diagram on a full-grid plate. Type follows a perfect-fourth scale.",
    "palette": [
      {
        "name": "Paper (light page)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (text and ink field)",
        "hex": "#172A2F"
      },
      {
        "name": "Teal field (light)",
        "hex": "#0E7C70"
      },
      {
        "name": "Ochre (blocks only)",
        "hex": "#C9962B"
      },
      {
        "name": "Night (dark page)",
        "hex": "#0B1B20"
      },
      {
        "name": "Aqua (dark links)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "Familjen Grotesk only, on a perfect-fourth (4:3) scale from an 18px body: 13.5, 18, 24, 32, 42.7, 56.9 and 75.8px. Body 18/1.65 on a 43rem measure. System mono for code.",
    "tradeoffs": [
      "Category signatures need a category-to-class map, and any new category needs its own signature.",
      "Hanging tracks and full-width plates need a remark/rehype step (with a test) or a class on each diagram.",
      "Ochre widens the palette, so the brand reads a little less purely teal.",
      "The full-grid plate suits hero diagrams but is too much for small ones, so authors choose per diagram."
    ],
    "round": 4,
    "status": "current"
  },
  {
    "id": "modular-poster-bold",
    "file": "04-modular-poster-bold.html",
    "name": "Very creative",
    "boundary": "third block colour and a unique painted poster composition on every post",
    "isNew": true,
    "idea": "A series of posters by one designer. Each post opens with its own arrangement of bar, disc and rule: the category sets the colours and the post's position sets the layout, with a small thumbnail of it in the listing. The memorable part is the knockout title: a teal slab grows in behind the first part of the H1, and the letters turn white where they cross it. Home has a large slate quarter disc running off the edge. The post body is a centred 44rem column, with code and diagrams slightly wider.",
    "palette": [
      {
        "name": "Paper (light page)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (light text)",
        "hex": "#172A2F"
      },
      {
        "name": "Teal (lead block, knockout)",
        "hex": "#0E7C70"
      },
      {
        "name": "Slate (second block, dark)",
        "hex": "#3F6C72"
      },
      {
        "name": "Signal ochre (blocks only)",
        "hex": "#F0B323"
      },
      {
        "name": "Night (dark page)",
        "hex": "#0B1B20"
      }
    ],
    "type": "Familjen Grotesk only. Post H1 up to 4.6rem, listing titles up to 3.6rem, at 650 with tight tracking. Body 19/1.68 in a 44rem column. System mono for code.",
    "tradeoffs": [
      "The knockout title splits letters at the colour edge. That's the poster effect, but it can look busy on long titles.",
      "Per-post compositions are a lot of CSS: 4 variants with about 20 properties each, shared by the header and the thumbnail.",
      "A third colour and painted blocks on every post go well beyond the current guide.",
      "The entrance replays on every navigation under ClientRouter unless it's limited to the first load."
    ],
    "round": 4,
    "status": "current"
  },
  {
    "id": "quiet-evolution",
    "file": "r3-quiet-evolution.html",
    "name": "Quiet Evolution",
    "boundary": null,
    "idea": "The current site, fully inside the style guide, made the best version of itself: a Bringhurst type scale on a 28px baseline, a listing grouped by year with a date column, and a centred 42rem column. Revised: the footer now uses the live icon links (including Pied Piper), and the header uses the live search icon and sun/moon toggle.",
    "palette": [
      {
        "name": "Paper (light bg)",
        "hex": "#ffffff"
      },
      {
        "name": "Ink text (light)",
        "hex": "#1f2a27"
      },
      {
        "name": "Teal 700 accent",
        "hex": "#00796b"
      },
      {
        "name": "Muted chrome and meta",
        "hex": "#5f6f6b"
      },
      {
        "name": "Teal ink (dark bg)",
        "hex": "#0a1a1e"
      },
      {
        "name": "Aqua accent (dark)",
        "hex": "#5ed4c5"
      }
    ],
    "type": "Open Sans throughout (800 wordmark, 650–700 headings, 400 body). JetBrains Mono for code. Body 18/28.",
    "tradeoffs": [
      "Cheapest to ship: the header and footer markup now match the live site, so it's mostly token and spacing work.",
      "The visible ⌘K hint is gone, because search is icon-only. The shortcut only shows in the tooltip.",
      "As a refinement of the current look, it's the least distinctive option.",
      "Grouping by year needs bucketing in index.astro, and figure captions need a rehype transform."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "lab-notebook",
    "file": "r3-lab-notebook.html",
    "name": "Lab Notebook",
    "boundary": null,
    "idea": "Posts are entries in an engineer's lab notebook on cool quadrille paper, with a ruled entry header and a table of entries on home. Revised: the grid is about a third as strong and fades to clean paper under the reading column, so it only shows as texture in the margins. The footer and header use the live icons.",
    "palette": [
      {
        "name": "Paper (light)",
        "hex": "#f2f6f6"
      },
      {
        "name": "Ink (light)",
        "hex": "#172726"
      },
      {
        "name": "Notebook teal (light accent)",
        "hex": "#00695c"
      },
      {
        "name": "Margin rule (light)",
        "hex": "#86b9b1"
      },
      {
        "name": "Night paper (dark)",
        "hex": "#0a1d20"
      },
      {
        "name": "Lamp teal (dark accent)",
        "hex": "#5ed4c5"
      }
    ],
    "type": "Source Serif 4 for body (18/1.75) and the wordmark. Narrowed Archivo for headings, meta and nav. System mono for code.",
    "tradeoffs": [
      "On phones the grid is mostly gone, and the notebook feel comes from the ruled header and double rules.",
      "The ruled entry header is still a bordered grid of meta cells, close to your \"no boxed metadata\" note. Say if it should go.",
      "The fade under the column relies on overflow-x: clip on body, which needs care with ClientRouter swaps.",
      "Two web fonts add weight compared with the current site."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "cyanotype",
    "file": "r3-cyanotype.html",
    "name": "Cyanotype",
    "boundary": null,
    "idea": "A technical drawing sheet: white with teal linework in light mode, a deep teal cyanotype print in dark, with a trim line, a heavier frame and teal rules between sections. The reading-time bars and title block stay removed. Revised: the header and footer use the live icons, and the post column is properly centred.",
    "palette": [
      {
        "name": "Drawing sheet (light)",
        "hex": "#ffffff"
      },
      {
        "name": "Ink (light)",
        "hex": "#0f2e2e"
      },
      {
        "name": "Teal linework (light)",
        "hex": "#0a6a6f"
      },
      {
        "name": "Link teal (light)",
        "hex": "#00796b"
      },
      {
        "name": "Cyanotype sheet (dark)",
        "hex": "#0b4650"
      },
      {
        "name": "Pale line and link (dark)",
        "hex": "#8ee3d5"
      }
    ],
    "type": "Chivo for the wordmark (heavy italic \"code\"), headings and body (18/1.65). Chivo Mono for small meta. System mono for code blocks.",
    "tradeoffs": [
      "The sheet frame adds wrapper markup and costs a few pixels at every edge.",
      "The deep teal dark theme moves furthest from the current dark ink, so every dark token needs a new contrast check.",
      "The footer uses a different centring pattern from the header.",
      "Two Google font families mean one more request than today."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "risograph",
    "file": "r3-risograph.html",
    "name": "Risograph",
    "boundary": "second ink colour and textured, loud chrome",
    "idea": "Still a two-drum teal and rose zine, but every word is now printed once in clean ink. Revised: the offset text copies are gone. The boldness moved onto grainy ink shapes (a teal bar with an overprinted rose disc above the listing and post title, bar-and-dot marks above H2s, and misregistered rules). The pink is softened to rose, and the wordmark is smaller.",
    "palette": [
      {
        "name": "Stock (light)",
        "hex": "#EEF0ED"
      },
      {
        "name": "Teal ink, text (light)",
        "hex": "#00767C"
      },
      {
        "name": "Teal drum, shapes (light)",
        "hex": "#3AA3A0"
      },
      {
        "name": "Rose drum, shapes only (light)",
        "hex": "#EE7BAC"
      },
      {
        "name": "Stock (dark)",
        "hex": "#081A1D"
      },
      {
        "name": "Rose drum, shapes only (dark)",
        "hex": "#A9507E"
      }
    ],
    "type": "Dela Gothic One for the wordmark, titles and H2s, printed clean in teal. Atkinson Hyperlegible for body (18/1.7). System mono for code.",
    "tradeoffs": [
      "With shapes beside the type rather than on it, it reads more \"designed poster\" than \"happy printing accident\".",
      "Overprint multiplies in light and screens in dark, so each theme needs its own tuning of the shape colours.",
      "The ink shapes add aria-hidden markup to the layout and post template.",
      "Dela Gothic One is a heavy second web font that needs checking against long titles."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "split-duet",
    "file": "r3-split-duet.html",
    "name": "Split Duet",
    "boundary": "painted teal partner surface: a fixed left panel on home, a full-width title band on posts",
    "idea": "A painted teal partner and a calm reading floor. On home, the teal partner is a fixed left panel opposite the list. On a post, it becomes a full-width teal band holding the header and title, with the article in one centred column below. Revised: \"code\" is italic everywhere, the header and footer use the live icons and toggle, and post content is centred.",
    "palette": [
      {
        "name": "Partner teal (panel, light)",
        "hex": "#0B4F49"
      },
      {
        "name": "Night partner (panel, dark)",
        "hex": "#06302C"
      },
      {
        "name": "Floor light",
        "hex": "#F5F8F7"
      },
      {
        "name": "Floor dark",
        "hex": "#0F1718"
      },
      {
        "name": "Foam (panel text)",
        "hex": "#EAF6F3"
      },
      {
        "name": "Spark (Tango and accent)",
        "hex": "#8EE6D9"
      }
    ],
    "type": "Bricolage Grotesque for \"Tango\", nav, titles and headings. Source Serif 4 for body (19/1.72 in a 38rem column), synopses and the italic \"code\". System mono for code.",
    "tradeoffs": [
      "Home (side panel) and post (top band) now use different layouts, which is a bigger jump between pages than today.",
      "Needs separate home and post layouts in Astro, with care around ClientRouter swaps.",
      "If the home tagline grows on short screens, the panel scrolls on its own.",
      "Two web fonts with variable axes cost more than the current setup."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "oscilloscope",
    "file": "r3-oscilloscope.html",
    "name": "Oscilloscope",
    "boundary": "glowing instrument-screen chrome instead of quiet chrome",
    "idea": "The page is a lab instrument. In dark mode it's the screen: teal-black glass, a faint graticule in the margins, a header scope window where a phosphor-teal wave sweeps once on load, and a soft glow on headings. In light mode it's the pale enamel front panel with teal legends. Posts sit centred on a calm reading plate with no glow.",
    "palette": [
      {
        "name": "Phosphor P31 (dark accent)",
        "hex": "#4FE3C1"
      },
      {
        "name": "Teal-black glass (dark page)",
        "hex": "#061412"
      },
      {
        "name": "Reading surface (dark)",
        "hex": "#0B1E1C"
      },
      {
        "name": "Enamel panel (light page)",
        "hex": "#DCE3E3"
      },
      {
        "name": "Reading plate (light)",
        "hex": "#F6F8F8"
      },
      {
        "name": "Screen-print teal (light legends)",
        "hex": "#005B50"
      }
    ],
    "type": "Chakra Petch for the wordmark, nav, headings and titles. IBM Plex Sans for prose and meta (17.5/1.7). System mono for code.",
    "tradeoffs": [
      "The heading glow can soften edges on low-DPI screens and may feel gimmicky over long sessions.",
      "The reading plate and margin graticule add a frame the current borderless column avoids.",
      "On phones the margin grid disappears, so only the header scope carries the idea.",
      "It needs a small SVG sprite plus a step to insert the trace divider before each H2."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "ma",
    "file": "r3-ma.html",
    "name": "Ma",
    "boundary": "vertical text and asymmetric whitespace instead of one uniform column",
    "idea": "Japanese editorial quiet on cool washi paper. Dates, categories and section headings run vertically as slim margin captions. On home, the space above each post grows with the time since the previous one, so the two-year gap between 2026 and 2024 is visible as real space. The single mark is a small rough-edged teal hanko square beside the wordmark.",
    "palette": [
      {
        "name": "Washi (light bg)",
        "hex": "#EDF0F2"
      },
      {
        "name": "Sumi ink (light text)",
        "hex": "#1B2125"
      },
      {
        "name": "Usuzumi, thinned ink (muted)",
        "hex": "#586269"
      },
      {
        "name": "Teal (light links)",
        "hex": "#00695F"
      },
      {
        "name": "Deep sumi (dark bg)",
        "hex": "#14181B"
      },
      {
        "name": "Soft teal (dark links)",
        "hex": "#6DC6B9"
      }
    ],
    "type": "Shippori Mincho for the wordmark, titles, headings and synopsis. Zen Kaku Gothic New for body (17/1.85 in a 38rem column). System mono for code.",
    "tradeoffs": [
      "Neither font has a real italic, so the mandatory italic \"code\" is a browser slant, which looks a little crude.",
      "Vertical Latin text makes readers tilt their heads, so it's limited to short meta and H2s on wide screens.",
      "Date-based spacing is built at compile time (cheap), but it could feel sparse with many posts.",
      "H2s need wrapping in sections (a rehype step) to hang in the margin."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "gallery-hang",
    "file": "r3-gallery-hang.html",
    "name": "Gallery Hang",
    "boundary": "horizontally scrolling home listing instead of a vertical list",
    "idea": "Home is an exhibition wall. Posts are flat pieces of different sizes hung from a picture rail by thin wires and centred on one eye-line. You scroll sideways with native scroll-snap, with the next piece peeking in. The newest post is the one deep-teal piece. A post is a centred paper sheet opened by gallery-style wall text.",
    "palette": [
      {
        "name": "Gallery wall (light)",
        "hex": "#E3ECEA"
      },
      {
        "name": "Hung paper (light)",
        "hex": "#F6F9F8"
      },
      {
        "name": "Ink (light)",
        "hex": "#172E2A"
      },
      {
        "name": "Feature piece teal",
        "hex": "#0F4A43"
      },
      {
        "name": "Dimmed gallery wall (dark)",
        "hex": "#0E2124"
      },
      {
        "name": "Aqua accent (dark)",
        "hex": "#67D3C4"
      }
    ],
    "type": "Instrument Serif for the wordmark, titles and H2s. Instrument Sans for body (17/1.75), labels and H3s. System mono for code.",
    "tradeoffs": [
      "Sideways scrolling hides older posts, which gets worse as the archive grows. It probably needs a cap or an archive link at 8–12 posts.",
      "Piece sizes cycle by position, or would need a new frontmatter field.",
      "Hanging on one eye-line leaves empty wall under shorter pieces.",
      "Cheap otherwise: one listing component, new tokens and a font pair."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "variable-weather",
    "file": "r3-variable-weather.html",
    "name": "Variable Weather",
    "boundary": "scroll-linked heading motion and a single variable font replacing Open Sans",
    "idea": "One variable font, Recursive, does all the work, with its monospace setting standing for code and its sans for prose. Hovering a post title shifts it from casual and light to linear and heavy without moving anything. On a post, each heading starts as casual slanted monospace and settles into upright sans as it scrolls into view: code turning into prose as you read.",
    "palette": [
      {
        "name": "Paper (light bg)",
        "hex": "#ffffff"
      },
      {
        "name": "Ink (light text)",
        "hex": "#1f2a27"
      },
      {
        "name": "Teal 700 (light accent)",
        "hex": "#00796b"
      },
      {
        "name": "Deep teal ink (dark bg)",
        "hex": "#0a1a1e"
      },
      {
        "name": "Foam (dark text)",
        "hex": "#dbeae7"
      },
      {
        "name": "Aqua (dark accent)",
        "hex": "#5ed4c5"
      }
    ],
    "type": "Recursive across five axes (MONO, CASL, wght, slnt, CRSV). Body is upright linear sans at 18/1.68 and never animates. \"code\" is italic cursive mono against heavy upright \"Tango\". System mono for code blocks.",
    "tradeoffs": [
      "The scroll-driven headings only work in Chromium. Firefox and Safari show static headings.",
      "On screens narrower than 52rem, only the casual and slant axes change, so headings don't re-wrap.",
      "Recursive Sans Linear is more mechanical than Open Sans for long reading.",
      "The style guide's motion rules would need updating to allow scroll-linked heading motion."
    ],
    "round": 3,
    "status": "discarded"
  },
  {
    "id": "verdigris",
    "file": "r2-verdigris.html",
    "name": "Verdigris",
    "boundary": "copper and bronze material surfaces replace the clean white and ink grounds",
    "idea": "Teal as patina, the colour copper turns as it weathers. The page is aged bronze (dark) or freshly patinated copper-green (light), with mottled verdigris growing in from the edges. The wordmark and titles are engraved Cinzel, struck into the metal. Reading happens on one clean, opaque plate.",
    "palette": [
      {
        "name": "Aged bronze ground (dark)",
        "hex": "#1C130D"
      },
      {
        "name": "Bronze plate (dark)",
        "hex": "#261A12"
      },
      {
        "name": "Verdigris (dark links and titles)",
        "hex": "#74CDB9"
      },
      {
        "name": "Copper (rules and markers)",
        "hex": "#B87333"
      },
      {
        "name": "Patina paper ground (light)",
        "hex": "#D3E7DF"
      },
      {
        "name": "Deep bronze type (light)",
        "hex": "#2E2117"
      }
    ],
    "type": "Cinzel (an inscriptional face, capitals only) for the wordmark, titles, H2s and dates, with an inset engraved shadow at display sizes. Alegreya Sans for body (19/1.62). System mono for code.",
    "tradeoffs": [
      "Copper is a second hue, and the chrome is anything but quiet: a textured ground and a shadowed reading plate.",
      "The patina layer repaints on scroll in some browsers. On phones the plate covers almost all of it.",
      "Cinzel is capitals only, so long titles get wide and the H2s read more formal than the author's voice.",
      "Shiki panels and the engraved shadows need retuning for each theme, which adds about a dozen new tokens."
    ],
    "round": 2,
    "status": "discarded"
  },
  {
    "id": "swiss-poster",
    "file": "r2-swiss-poster.html",
    "name": "Swiss Poster",
    "boundary": "fixed vertical wordmark spine and an asymmetric multi-column grid",
    "idea": "An International Typographic Style concert poster. A full-height flat teal band runs down the left edge with a huge vertical \"codeTango\" inside it as the page's fixed spine. To its right, an asymmetric 12-column grid holds huge flush-left titles, with small dates and categories on distant grid lines, so the white space makes the composition.",
    "palette": [
      {
        "name": "Spine teal (both themes)",
        "hex": "#00796B"
      },
      {
        "name": "Paper (light bg)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Black-teal ink (light text)",
        "hex": "#0D2420"
      },
      {
        "name": "Muted slate (light meta)",
        "hex": "#4F625D"
      },
      {
        "name": "Deep ink (dark bg)",
        "hex": "#0B1C1F"
      },
      {
        "name": "Aqua link (dark)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "Schibsted Grotesk only, with weight doing all the hierarchy (900 \"Tango\", 400 italic \"code\", 800 titles at 0.9 leading). JetBrains Mono inside code blocks. Body 18/1.62 on a 40rem column.",
    "tradeoffs": [
      "The spine takes about 200px of width, which squeezes layouts between 900px and 1100px wide.",
      "It breaks the single-column and quiet-chrome rules: a painted teal band and meta in a separate column.",
      "Post markdown needs a grid wrapper, and wide diagrams need column placement.",
      "Short, wide windows fall back to the horizontal band, so there are two header layouts to maintain."
    ],
    "round": 2,
    "status": "discarded"
  },
  {
    "id": "nautical-chart",
    "file": "r2-nautical-chart.html",
    "name": "Nautical Chart",
    "boundary": "illustrated contour backgrounds instead of plain grounds",
    "idea": "Printed like an admiralty sea chart, where teal is the colour of the shallows. One fixed SVG of depth contours rises from the corners. Header and footer sit on the water, and reading happens on a calm paper panel framed by a double border, as on a real chart. Titles are italic Garamond in teal ink, like the names of waters on a chart.",
    "palette": [
      {
        "name": "Chart paper (light panel)",
        "hex": "#F8FBFA"
      },
      {
        "name": "Shallows (light band)",
        "hex": "#BEDFD9"
      },
      {
        "name": "Chart ink teal (light links)",
        "hex": "#00756A"
      },
      {
        "name": "Sounding ink (light text)",
        "hex": "#142E2A"
      },
      {
        "name": "Night sea (dark ground)",
        "hex": "#0A1F26"
      },
      {
        "name": "Night aqua (dark links and contours)",
        "hex": "#6FD9CB"
      }
    ],
    "type": "EB Garamond: italic for the wordmark, titles, H2s and synopsis, upright for body (19/1.68). Jost, widely spaced, for chart-style labels on nav, meta and H3s. System mono for code.",
    "tradeoffs": [
      "The contours stretch to fill any screen, so phones and desktops see quite different shapes.",
      "An illustrated background and two new fonts are a long way from the plain-ground style guide.",
      "The small compass rose by the wordmark goes against the \"no logo icon\" rule, and it's the first thing to cut.",
      "The 1.2 s fade-in of the chart runs longer than the guide's 300 ms motion limit."
    ],
    "round": 2,
    "status": "discarded"
  },
  {
    "id": "raw-html",
    "file": "r2-raw-html.html",
    "name": "Raw HTML",
    "boundary": "drops the designed type system and quiet polish for browser-default brutalism",
    "idea": "\"Simply rendered HTML\" pushed as far as it goes: system serif, underlined teal links with a separate visited colour, a visible skip link, meta in a real <dl>, tags in <details>, and a numbered <ol> archive. The bold move is the huge serif wordmark, with the RSS and llms.txt URLs written out as plain links for people and agents.",
    "palette": [
      {
        "name": "Paper (light bg)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (light text, dark bg)",
        "hex": "#000000"
      },
      {
        "name": "Link teal (light)",
        "hex": "#00796B"
      },
      {
        "name": "Visited teal (light)",
        "hex": "#004D40"
      },
      {
        "name": "Off-white (dark text)",
        "hex": "#F2F1EA"
      },
      {
        "name": "Link aqua (dark)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "No web fonts. ui-serif/Georgia for everything, with browser-default heading sizes. ui-monospace for code. Body 18–20px/1.6 on a left-aligned 34em measure.",
    "tradeoffs": [
      "The cheapest of all to build: no font dependency, minimal tokens and no transitions.",
      "Type depends on the platform (New York on Apple, Georgia on Windows), so rendering varies between devices.",
      "Archive numbers come from the total post count, so pagination has to pass the right start value.",
      "It only works if every detail stays exact, and pure black and white can feel harsh in dark mode."
    ],
    "round": 2,
    "status": "discarded"
  },
  {
    "id": "letterpress",
    "file": "r2-letterpress.html",
    "name": "Letterpress",
    "boundary": "textured, skeuomorphic paper and pressed type instead of flat surfaces",
    "idea": "Heavy, cool grey-blue cotton stock with the wordmark and titles pressed into it in uneven teal ink. Thick-thin printer's rules separate the listing. Posts are set like a fine press book: centred title page, slab drop cap, indented paragraphs, and diagrams sitting in debossed plate marks. In dark mode the display type becomes teal and silver foil.",
    "palette": [
      {
        "name": "Cotton stock (light)",
        "hex": "#E3E9EC"
      },
      {
        "name": "Teal press ink (light)",
        "hex": "#0B5F57"
      },
      {
        "name": "Body ink (light)",
        "hex": "#1C2A2B"
      },
      {
        "name": "Teal-black stock (dark)",
        "hex": "#0A1517"
      },
      {
        "name": "Teal foil (dark)",
        "hex": "#5ED4C5"
      },
      {
        "name": "Silver foil (dark)",
        "hex": "#C9D3D4"
      }
    ],
    "type": "Alfa Slab One (wood-type slab) for titles, H2s and the drop cap. Alegreya for body (17–19/1.62, justified and hyphenated on wide screens, with old-style figures). System mono for code.",
    "tradeoffs": [
      "The ink and foil effects are fragile and render a little differently in Safari and Firefox.",
      "This is the heaviest surface of the set (three noise layers plus masked type), which costs paint time on low-end phones.",
      "The heavy slab makes long titles take up a lot of space.",
      "Justified text and drop caps need a prose class and a first-paragraph hook, and justified lines can open gaps around inline code."
    ],
    "round": 2,
    "status": "discarded"
  },
  {
    "id": "worktree",
    "file": "r1-worktree.html",
    "name": "Worktree",
    "boundary": null,
    "idea": "Home draws the blog as a directory tree: a codetango/ root with category folders and posts as leaves, joined by CSS connector lines with rounded git-graph elbows that draw themselves in on load. In a post, faint outline guides in the left gutter show the H2/H3 nesting, as in an editor.",
    "palette": [
      {
        "name": "Paper (light bg)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (light text)",
        "hex": "#1D2B29"
      },
      {
        "name": "Teal 700 (links)",
        "hex": "#00796B"
      },
      {
        "name": "Connector teal",
        "hex": "#2E9387"
      },
      {
        "name": "Deep teal ink (dark bg)",
        "hex": "#0A1A1E"
      },
      {
        "name": "Aqua (dark links)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "Atkinson Hyperlegible Next for all reading (18/1.65). JetBrains Mono only for the tree, breadcrumb and code.",
    "tradeoffs": [
      "Grouping by category breaks strict newest-first order, so recent posts in a quiet category sink down the page.",
      "Outline guides need posts wrapped in sections by heading: a rehype plugin plus a test.",
      "Two new font families, both of which would need self-hosting.",
      "The draw-in animation would replay on every return home under ClientRouter unless limited."
    ],
    "round": 1,
    "status": "discarded"
  },
  {
    "id": "tango-steps",
    "file": "r1-tango-steps.html",
    "name": "Tango Steps",
    "boundary": null,
    "idea": "The listing is footwork for two partners, human and agent. Posts alternate left and right across a wide stage, with one thin teal line weaving through the empty side of each row. In a post, the title and H2s step into an outer track while the body stays a calm 40rem column.",
    "palette": [
      {
        "name": "Floor (light bg)",
        "hex": "#F6F8F8"
      },
      {
        "name": "Ink (light text)",
        "hex": "#16272A"
      },
      {
        "name": "Lead teal",
        "hex": "#00796B"
      },
      {
        "name": "Teal ink (dark bg)",
        "hex": "#0A1C1F"
      },
      {
        "name": "Aqua (dark)",
        "hex": "#5ED4C5"
      },
      {
        "name": "Wine (one detail only)",
        "hex": "#8A2846"
      }
    ],
    "type": "Bodoni Moda (optical sizes) for the wordmark, titles and headings, with italic ledes and H3s. Hanken Grotesk for body (17/1.7). System mono for code.",
    "tradeoffs": [
      "The SVG line depends on equal-height rows and a fixed post count, so Astro would have to generate the path at build time.",
      "Bodoni hairlines get thin in dark mode, so the display face stays at 1.5rem and above.",
      "The prose layout moves to a 60rem stage with named grid lines, beyond the single 42rem column.",
      "The wine accent is a non-teal hue and needs your approval."
    ],
    "round": 1,
    "status": "discarded"
  },
  {
    "id": "spec-sheet",
    "file": "r1-spec-sheet.html",
    "name": "Spec Sheet",
    "boundary": null,
    "idea": "The blog is typeset as a technical specification, legible to agents and humans alike. Home is a series of definition blocks: title and synopsis beside aligned fields (Published, Length, Category, Tags). Posts get a frontmatter field block, teal section numbers hanging in the margin, and a numbered contents list.",
    "palette": [
      {
        "name": "Paper (light bg)",
        "hex": "#FFFFFF"
      },
      {
        "name": "Ink (light text)",
        "hex": "#1B2826"
      },
      {
        "name": "Structural teal (light)",
        "hex": "#00715F"
      },
      {
        "name": "Deep teal ink (dark bg)",
        "hex": "#0A1C20"
      },
      {
        "name": "Foam (dark text)",
        "hex": "#D8EAE6"
      },
      {
        "name": "Aqua teal (dark)",
        "hex": "#62D3C3"
      }
    ],
    "type": "IBM Plex Sans for reading (17/1.65). Plex Mono for keys and code. Plex Sans Condensed 600 for titles, headings and section numbers.",
    "tradeoffs": [
      "Section numbers are cheap CSS counters, but the contents list needs a getHeadings() component.",
      "It breaks the single column: a two-column home grid, and a margin plus contents column on wide posts.",
      "Three Plex families mean noticeably more font weight per page.",
      "Short posts with one H2 show sparse numbering, so it might need a frontmatter opt-out."
    ],
    "round": 1,
    "status": "discarded"
  },
  {
    "id": "session-transcript",
    "file": "r1-session-transcript.html",
    "name": "Session Transcript",
    "boundary": null,
    "idea": "The chrome is a terminal session with a tmux-style status line. Home is the output of `ls -lt`, with dates and read times in fixed mono columns and synopses wrapping beneath in a reading face, ending in a fresh prompt with a blinking cursor. A post opens with one `cat` line, then the prose is a calm proportional column.",
    "palette": [
      {
        "name": "Teal-ink terminal (dark bg)",
        "hex": "#0b2226"
      },
      {
        "name": "Status bar and code (dark)",
        "hex": "#102c31"
      },
      {
        "name": "Prompt aqua (dark)",
        "hex": "#6fd6c8"
      },
      {
        "name": "Foam text (dark)",
        "hex": "#d5e8e4"
      },
      {
        "name": "Paper terminal (light bg)",
        "hex": "#eef4f3"
      },
      {
        "name": "Prompt teal (light)",
        "hex": "#00695c"
      }
    ],
    "type": "JetBrains Mono for chrome, listing titles and code. Source Sans 3 for all reading text (19/1.65).",
    "tradeoffs": [
      "Two new families to self-host, adding 4–6 font files.",
      "Mono listing titles and a filled status bar depart from the quiet-chrome rule.",
      "The listing needs grid markup with a stacked layout under 36rem, plus an ls-style date format.",
      "The terminal metaphor may put off readers who aren't developers, and the cursor blinks constantly (it stops under reduced motion)."
    ],
    "round": 1,
    "status": "discarded"
  },
  {
    "id": "ink-masthead",
    "file": "r1-ink-masthead.html",
    "name": "Ink Masthead",
    "boundary": null,
    "idea": "An independent-magazine cover where the wordmark is the design. \"codeTango\" is set full-width in Archivo at its widest setting, with italic \"code\" against black-weight upright \"Tango\". The newest post gets a cover-line lead and the rest follow as a calm list. Dark mode is the hero.",
    "palette": [
      {
        "name": "Deep ink (dark bg)",
        "hex": "#0a1a1e"
      },
      {
        "name": "Foam (dark text)",
        "hex": "#dbeae7"
      },
      {
        "name": "Bright aqua (dark accent)",
        "hex": "#5ed4c5"
      },
      {
        "name": "Paper (light bg)",
        "hex": "#ffffff"
      },
      {
        "name": "Ink teal (light text)",
        "hex": "#12302d"
      },
      {
        "name": "Teal 700 (light accent)",
        "hex": "#00796b"
      }
    ],
    "type": "Archivo (width and weight axes, italic) for the masthead, titles and chrome. Literata for reading (18/1.72). System mono for code.",
    "tradeoffs": [
      "Two web fonts, one of them a variable font with width and italic axes, means a heavier font payload.",
      "The masthead fills the frame through container query units and an estimated glyph width, so it may need fine-tuning.",
      "The masthead takes up most of the first screen, so on mobile only the lead post is above the fold.",
      "The CSS entrance replays on every return home under ClientRouter."
    ],
    "round": 1,
    "status": "discarded"
  },
  {
    "id": "marginalia",
    "file": "r1-marginalia.html",
    "name": "Marginalia",
    "boundary": "two columns and a sticky outline instead of one column",
    "idea": "Tufte-inspired, in a cool teal palette. Wide screens get a left column (wordmark, dates, sticky outline) and a right margin of sidenotes (meta, figure captions, link destinations), each starting level with its paragraph. Below 1100px everything folds back into one column with indented notes.",
    "palette": [
      {
        "name": "Glacier (light bg)",
        "hex": "#F6FAFA"
      },
      {
        "name": "Kelp (light text)",
        "hex": "#132E2A"
      },
      {
        "name": "Deep teal (light links)",
        "hex": "#006B5E"
      },
      {
        "name": "Slate teal (margin notes)",
        "hex": "#4A6560"
      },
      {
        "name": "Teal ink (dark bg)",
        "hex": "#0A1C20"
      },
      {
        "name": "Aqua (dark accent)",
        "hex": "#64D3C4"
      }
    ],
    "type": "Newsreader for body (19/1.62 on a 34rem measure), titles and italic H3s. Hanken Grotesk 13px for margins and chrome. System mono for code.",
    "tradeoffs": [
      "It breaks the single-column, no-sidebar rule. On home the margin stays empty on purpose.",
      "This is the most expensive to build: sidenote syntax, a remark/rehype plugin, figure transforms and section wrapping.",
      "The outline highlight uses CSS scroll-driven animations (no JS), which only works in Chromium and recent Safari.",
      "A margin note longer than its paragraph pushes the next paragraph down."
    ],
    "round": 1,
    "status": "discarded"
  },
  {
    "id": "teal-field",
    "file": "r1-teal-field.html",
    "name": "Teal Field",
    "boundary": "painted colour chrome instead of quiet whitespace",
    "idea": "Colour leads instead of whitespace. The home page is one flat field of saturated teal with big white Bricolage titles. On a post, the field becomes a frame and title band around a calm white (or ink) reading sheet.",
    "palette": [
      {
        "name": "Teal field (light)",
        "hex": "#00695C"
      },
      {
        "name": "Pale teal synopsis on field",
        "hex": "#C8EBE7"
      },
      {
        "name": "Body text on white sheet",
        "hex": "#1C2A27"
      },
      {
        "name": "Deep teal field (dark)",
        "hex": "#062B2E"
      },
      {
        "name": "Ink reading sheet (dark)",
        "hex": "#0D1E20"
      },
      {
        "name": "Aqua accent (dark)",
        "hex": "#5ED4C5"
      }
    ],
    "type": "Bricolage Grotesque for everything except code, used expressively across its optical-size, weight and width axes. JetBrains Mono for code.",
    "tradeoffs": [
      "It breaks the quiet-chrome rule: teal moves out of the links and into the background.",
      "Bricolage has no true italic, so ledes and <em> use a synthesised slant.",
      "Moderate Astro cost: a field body, a title-band and sheet split in the post layout, and new dark tokens.",
      "Contrast is locked: the field must stay at teal-800 or darker for white text to pass."
    ],
    "round": 1,
    "status": "discarded"
  }
];
