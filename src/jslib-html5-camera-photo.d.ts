declare module "jslib-html5-camera-photo" {
  export enum FACING_MODES {
    ENVIRONMENT = "ENVIRONMENT",
    USER = "USER"
  }
  export enum IMAGE_TYPES {
    JPG = "JPG",
    PNG = "PNG"
  }
  export default class CameraPhoto {
    constructor(videoElement: HTMLVideoElement);
    startCamera(facingMode?: FACING_MODES): Promise<MediaStream>;
    stopCamera(): Promise<void>;
    getDataUri(settings: {
      sizeFactor: number;
      imageType: IMAGE_TYPES;
      imageCompression: number;
      isImageMirror: boolean;
    }): string;
    getCameraSettings(): {
      aspectRatio: number;
      deviceId: string;
      frameRate: number;
      groupId: string;
      height: number;
      resizeMode: string;
      width: number;
    };
  }
}
