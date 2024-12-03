import { useTranslatedPath } from '../../i18n/utils';

/**
 * Returns a path specific to the language
 * @param lang Could be 'en' or 'de'
 * @param reqUrl URL of the current path
 * @returns a string of the path for the langauge
 */
export const getCurrentPathForSpecificLanguage = (lang: 'en' | 'de', reqUrl: string) => {
	const pathname = new URL(reqUrl).pathname.replace('/en', '').replace('/de', '');

	// paths for the specific language
	return useTranslatedPath(lang)(pathname);
};
