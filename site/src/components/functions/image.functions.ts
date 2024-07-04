import { GLOBAL_CONFIG } from "../../config";

export const convertAssetsToImageData = async (assets: string[]) => {
  // getting all the alt description fields from the assets
  return await Promise.all(
    assets.map(async (asset) => {
      const assetId = asset.split(".")[0];
      const response = await fetch(
        `${GLOBAL_CONFIG.imageEndpoint}/files/${assetId}?fields[]=description`,
      );
      const data = await response.json();
      console.log(data);
      return {
        base: `${GLOBAL_CONFIG.imageEndpoint}${GLOBAL_CONFIG.directusAssetEndpoint}${asset}`,
        src: `${GLOBAL_CONFIG.imageEndpoint}${GLOBAL_CONFIG.directusAssetEndpoint}${asset}?q=70&width=1600`,
        alt: data.data.description,
      };
    }),
  );
};
