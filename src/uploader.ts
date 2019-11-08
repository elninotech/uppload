export class UpploadUploader {
  type = "uploader";
  name: string = "";
  upload: (file: Blob) => Promise<string> = () =>
    new Promise(resolve => resolve(""));
}
