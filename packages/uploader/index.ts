import UpploadPlugin from "../plugin";
import { HandlersParams } from "../core";

export class UpploadUploader extends UpploadPlugin {
  type = "uploader";
  name?: string;
  upload?: (file: Blob) => Promise<string>;
}
