import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			tags: z.array(z.string()),
			author: z.string(),
			image: z
				.object({
					url: image().optional(),
					href: z.string().optional(),
					alt: z.string(),
				})
				.optional(),
			pubDate: z.date(),
			description: z.string(),
		}),
});

export const collections = {
	blog: blogCollection,
};