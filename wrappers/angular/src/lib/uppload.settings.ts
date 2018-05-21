export class UpploadEndpoint {
	url?: string;
	method?: string;
	headers?: any;
}
export type UpploadCropSize = [number, number, string];

export class UpploadCrop {
	aspectRatio?: number;
	maxSize?: UpploadCropSize;
	minSize?: UpploadCropSize;
}

export class UpploadBlob {
	size: number;
	type: string;
}

export class UpploadSettings {
	value?: string;
	bind?: string[];
	call?: string[];
	uploadFunction?: (file: UpploadBlob) => Promise<string>;
	endpoint?: string | UpploadEndpoint;
	services?: string[];
	defaultService?: string;
	successDelay?: number;
	minimumDelay?: number;
	errorDelay?: number;
	allowedTypes?: string | string[];
	maxFileSize?: number;
	isFileTypeAllowed?: (file: UpploadBlob) => boolean;
	isFileSizeAllowed?: (file: UpploadBlob) => boolean;
	i18n?: any;
	crop?: UpploadCrop;
}

export class UpploadEvents {
	static cropEnd = "cropEnd";
	static cropMove = "cropMove";
	static cropStart = "cropStart";
	static dragEnter = "dragEnter";
	static dragLeave = "dragLeave";
	static dragOver = "dragOver";
	static fileDropped = "fileDropped";
	static fileError = "fileError";
	static fileSelected = "fileSelected";
	static fileUploaded = "fileUploaded";
	static modalClosed = "modalClosed";
	static modalOpened = "modalOpened";
	static pageChanged = "pageChanged";
	static uploadError = "uploadError";
	static uploadStarted = "uploadStarted";
}
