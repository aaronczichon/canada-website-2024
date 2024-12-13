import { rssExtended } from '../i18n/utils';

export const buildAdditionalExtensionString = (lang: string) => {
	const text = rssExtended[lang as keyof typeof rssExtended];
	return `<p>${text}</p>`;
};
