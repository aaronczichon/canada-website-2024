export interface Config {
	imageEndpoint: string;
	directusAssetEndpoint: string;
	defaultWidth: number;
	defaultHeight: number;
	defaultQuality: number;
	social: {
		mastodon: string;
	};
	dateOptions: any;
}

export const GLOBAL_CONFIG: Config = {
	imageEndpoint: 'https://directus.aaronczichon.de',
	directusAssetEndpoint: '/assets/',
	defaultWidth: 720,
	defaultHeight: 450,
	defaultQuality: 80,
	social: {
		mastodon: '@czichon@mastodon.social',
	},
	dateOptions: {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	},
};
