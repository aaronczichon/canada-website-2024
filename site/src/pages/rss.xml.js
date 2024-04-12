import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(_context) {
	const blog = await getCollection('blog');
	return rss({
		title: 'Canada - Working Holiday für 12 Monate - Blog',
		// `<description>` field in output xml
		description: 'Für 12 Monate reisend und arbeitend durch Kanada.',
		site: 'https://canada.aaronczichon.de',
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: post.data.customData,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`,
		})),
	});
}
