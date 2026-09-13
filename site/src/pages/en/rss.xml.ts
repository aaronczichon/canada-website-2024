import mdxRenderer from '@astrojs/mdx/server.js';
import preactRenderer from '@astrojs/preact/server.js';
import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import { buildAdditionalExtensionString } from '../../functions/rss.func';

export async function GET(context: any) {
	// Static imports let Astro bundle the renderers and resolve their virtual modules.
	const container = await AstroContainer.create();
	container.addServerRenderer({ renderer: preactRenderer });
	container.addServerRenderer({ renderer: mdxRenderer });
	container.addClientRenderer({
		name: '@astrojs/preact',
		entrypoint: '@astrojs/preact/client.js',
	});

	let entries = await getCollection('blog');
	entries = entries.filter((entry) => entry.id.split('/')[0] === 'en');
	const feedItems: any[] = [];
	for (const post of entries) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content);
		const link = new URL(`/en/blog/${post.id}`, context.url.origin).toString();
		feedItems.push({ ...post.data, link, content: content + buildAdditionalExtensionString('en') });
	}
	return rss({
		title: 'Canada - Working Holiday for 1 months - Blog',
		// `<description>` field in output xml
		description: "We' working and travelling 12 months through Canada.",
		site: 'https://canada.aaronczichon.de/en',
		items: feedItems,
	});
}
