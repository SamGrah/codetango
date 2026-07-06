import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// Blog posts: markdown files in src/content/blog/, id = filename without extension.
// URL becomes /blog/<id>/ — see src/pages/blog/[id].astro.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Canonical excerpt: shown on the listing and as the lede under the post title.
    synopsis: z.string().optional(),
    date: z.coerce.date(),
    author: z.string().default('Sam Graham'),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    // Drafts build in dev, are excluded from prod builds and the RSS feed.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
