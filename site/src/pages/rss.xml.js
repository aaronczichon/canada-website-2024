import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import { getContainerRenderer as getPreactRenderer } from '@astrojs/preact';
import { loadRenderers } from 'astro:container';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const renderers = await loadRenderers([getPreactRenderer(), getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });
	container.addClientRenderer({
		name: '@astrojs/preact',
		entrypoint: '@astrojs/preact/client.js',
	});

	let allPosts = await getCollection('blog');
	allPosts = allPosts.filter((entry) => entry.slug.split('/')[0] !== 'en');
	const feedItems = [];
	for (const post of allPosts) {
		const { Content } = await post.render();
		const content = await container.renderToString(Content);
		const link = new URL(`/blog/${post.slug}`, context.url.origin).toString();
		feedItems.push({ ...post.data, link, content });
	}
	return rss({
		title: 'Canada - Working Holiday für 12 Monate - Blog',
		// `<description>` field in output xml
		description: 'Für 12 Monate reisend und arbeitend durch Kanada.',
		site: 'https://canada.aaronczichon.de',
		items: feedItems,
	});
}
