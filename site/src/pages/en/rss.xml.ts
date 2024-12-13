import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import { getContainerRenderer as getPreactRenderer } from '@astrojs/preact';
import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getCollection } from 'astro:content';
import { buildAdditionalExtensionString } from '../../functions/rss.func';

export async function GET(context) {
	const renderers = await loadRenderers([getPreactRenderer(), getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });
	container.addClientRenderer({
		name: '@astrojs/preact',
		entrypoint: '@astrojs/preact/client.js',
	});

	let entries = await getCollection('blog');
	entries = entries.filter((entry) => entry.slug.split('/')[0] === 'en');
	const feedItems: any[] = [];
	for (const post of entries) {
		const { Content } = await post.render();
		const content = await container.renderToString(Content);
		const link = new URL(`/en/blog/${post.slug}`, context.url.origin).toString();
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
