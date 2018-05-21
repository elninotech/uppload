export declare class UpploadEndpoint {
    url?: string;
    method?: string;
    headers?: any;
}
export declare type UpploadCropSize = [number, number, string];
export declare class UpploadCrop {
    aspectRatio?: number;
    maxSize?: UpploadCropSize;
    minSize?: UpploadCropSize;
}
export declare class UpploadBlob {
    size: number;
    type: string;
}
export declare class UpploadSettings {
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
export declare class UpploadEvents {
    static cropEnd: string;
    static cropMove: string;
    static cropStart: string;
    static dragEnter: string;
    static dragLeave: string;
    static dragOver: string;
    static fileDropped: string;
    static fileError: string;
    static fileSelected: string;
    static fileUploaded: string;
    static modalClosed: string;
    static modalOpened: string;
    static pageChanged: string;
    static uploadError: string;
    static uploadStarted: string;
}
