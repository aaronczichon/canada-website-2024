export const showDefaultLang = false;

export const languages = {
	en: 'English',
	de: 'Deutsch',
};

export const defaultLang = 'de';

export const ui = {
	en: {
		'nav.blog': 'Blog',
		'nav.map': 'Map',
		'nav.pengiun': 'Find Pengiuns',
		'nav.visitors': 'Visitors',
		'nav.about': 'About',
		'nav.imprint': 'Imprint',
		'map.selectRoutes': 'Select Routes to Display:',
	},
	de: {
		'nav.blog': 'Blog',
		'nav.map': 'Karte',
		'nav.pengiun': 'Find Pengiuns',
		'nav.visitors': 'Besuch',
		'nav.about': 'Über uns',
		'nav.imprint': 'Impressum',
		'map.selectRoutes': 'Routen zur Anzeige auswählen:',
	},
} as const;

export const rssExtended = {
	de: 'Schön, dass du diesen Blog per RSS liest ❤️ <br /> Die Galerien werden im Feed-Reader nicht dargestellt. <br /> Besuche die Website, um die Bilder zu sehen.',
	en: 'Nice to see you reading this blog via RSS ❤️ <br /> Galleries are not displayed in the feed reader. <br /> Visit the website to see the pictures.',
} as const;

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
	};
}
