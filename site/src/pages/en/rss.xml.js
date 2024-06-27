import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(_context) {
	const blog = await getCollection('blog');
	return rss({
		title: 'Canada - Working Holiday for 1 months - Blog',
		// `<description>` field in output xml
		description: 'We\' working and travelling 12 months through Canada.',
		site: 'https://canada.aaronczichon.de/en',
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			customData: post.data.customData,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/en/blog/${post.slug}/`,
		})),
	});
}
