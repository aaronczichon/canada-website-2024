// Directus Interfaces

export interface DirectusFile {
	filename_disk: string;
	description: string;
	type: string;
	metadata: {
		exif: {
			DateTimeOriginal: string;
		};
	};
}

// Internal Interface
export interface InternalFile {
	name: string;
	alt: string;
	base: string;
	src: string;
	creationDate: string;
}
