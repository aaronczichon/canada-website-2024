export interface Config {
  imageEndpoint: string;
  directusAssetEndpoint: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultQuality: number;
  mode: string;
  social: {
    mastodon: string;
  };
  dateOptions: any;
}

export const GLOBAL_CONFIG: Config = {
  imageEndpoint: "https://directus.aaronczichon.de",
  directusAssetEndpoint: "/assets/",
  defaultWidth: 720,
  defaultHeight: 450,
  defaultQuality: 80,
  mode: "DEV",
  social: {
    mastodon: "@czichon@mastodon.social",
  },
  dateOptions: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
};
