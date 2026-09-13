import mdxRenderer from '@astrojs/mdx/server.js';
import preactRenderer from '@astrojs/preact/server.js';
import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getCollection, render } from 'astro:content';
import { buildAdditionalExtensionString } from '../functions/rss.func';

export async function GET(context: any) {
	// Static imports let Astro bundle the renderers and resolve their virtual modules.
	const container = await AstroContainer.create();
	container.addServerRenderer({ renderer: preactRenderer });
	container.addServerRenderer({ renderer: mdxRenderer });
	container.addClientRenderer({
		name: '@astrojs/preact',
		entrypoint: '@astrojs/preact/client.js',
	});

	let allPosts = await getCollection('blog');
	allPosts = allPosts.filter((entry) => entry.id.split('/')[0] !== 'en');
	const feedItems: any[] = [];
	for (const post of allPosts) {
		const { Content } = await render(post);
		const content = await container.renderToString(Content);
		const link = new URL(`/blog/${post.id}`, context.url.origin).toString();
		feedItems.push({ ...post.data, link, content: content + buildAdditionalExtensionString('de') });
	}
	return rss({
		title: 'Canada - Working Holiday für 12 Monate - Blog',
		// `<description>` field in output xml
		description: 'Für 12 Monate reisend und arbeitend durch Kanada.',
		site: 'https://canada.aaronczichon.de',
		items: feedItems,
	});
}
