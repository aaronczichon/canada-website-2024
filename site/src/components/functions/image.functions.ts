import { GLOBAL_CONFIG } from "../../config";
import type {
  DirectusFile,
  InternalFile,
} from "../interfaces/directus.interface";
const authKey = import.meta.env.DIRECTUS_API_KEY;

/**
 * Resolves the name of the folder to it's ID.
 * @param folderName name of the folder for which we want the ID
 * @returns ID of the folder or undefined if not found
 */
export const fetchFolderIdByName = async (
  folderName: string,
): Promise<string | undefined> => {
  const response = await fetch(
    `${GLOBAL_CONFIG.imageEndpoint}/folders?filter[name][_eq]=${folderName}`,
  );
  const data = await response.json();
  if (!data || !data.data || data.data.length === 0) return;
  return data.data[0].id;
};

/**
 * Fetches the files of a specific folder given by it's ID.
 * @param folderId ID of the folder where the files should be fetched
 * @returns List of Directus Files
 */
export const fetchFilesFromFolder = async (
  folderId: string,
): Promise<InternalFile[]> => {
  const response = await fetch(
    `${GLOBAL_CONFIG.imageEndpoint}/files?filter[folder][_eq]=${folderId}&fields[]=filename_disk&fields[]=description&fields[]=type`,
  );
  const data = await response.json();
  if (!data || !data.data || data.data.length === 0) return [];
  const filteredFiles = (data.data as DirectusFile[]).filter(
    (file) => file.type.indexOf("image") !== -1,
  );
  return convertDirectusFileToInternalFile(filteredFiles);
};

/**
 * Converts a file list in the structure of directus to the internal structure
 * @param directusFiles list of files from directus
 * @returns list of internal files
 */
const convertDirectusFileToInternalFile = (
  directusFiles: DirectusFile[],
): InternalFile[] => {
  return directusFiles.map((file) => ({
    name: file.filename_disk,
    alt: file.description,
    base: `${GLOBAL_CONFIG.imageEndpoint}${GLOBAL_CONFIG.directusAssetEndpoint}${file.filename_disk}`,
    src: `${GLOBAL_CONFIG.imageEndpoint}${GLOBAL_CONFIG.directusAssetEndpoint}${file.filename_disk}?q=70&width=1600`,
  }));
};
