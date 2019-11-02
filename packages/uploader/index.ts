import UpploadPlugin from "@uppload/plugin";

export class UpploadUploader extends UpploadPlugin {
  type = "uploader";
  name: string = "";
  upload: (file: Blob) => Promise<string> = () => (new Promise((resolve) => (resolve(""))));
  constructor() {
    super();
  }
}
