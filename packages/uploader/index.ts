import UpploadPlugin from "../plugin";

export class UpploadUploader extends UpploadPlugin {
  type = "uploader";
  name?: string;
  upload?: (file: Blob) => Promise<string>;
}
