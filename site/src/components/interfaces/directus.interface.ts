// Directus Interfaces

export interface DirectusFile {
  filename_disk: string;
  description: string;
  type: string;
}

// Internal Interface
export interface InternalFile {
  name: string;
  alt: string;
  base: string;
  src: string;
}
