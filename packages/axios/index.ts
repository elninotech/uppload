import { UpploadUploader } from "../uploader";

export default class Axios extends UpploadUploader {
  name = "fetch";

  upload = async (file: Blob): Promise<string> => {
    console.log("Uploading your image...");
    return "";
  }
}
