export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  handle: (error: any) => void;
}
