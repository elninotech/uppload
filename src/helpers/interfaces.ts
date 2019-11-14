export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  next: (file: Blob) => void;
  handle: (error: any) => void;
}

export type Uploader = (file: Blob) => Promise<string>;
