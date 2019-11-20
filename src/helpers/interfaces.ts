import { Uppload } from "../uppload";

export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  next: (file: Blob) => void;
  handle: (error: any) => void;
  uppload: Uppload;
}

export type Uploader = (
  file: Blob,
  updateProgress?: (progress: number) => void
) => Promise<string>;
