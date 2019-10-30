import { UpploadUploader } from "../uploader";

export interface UpploadAxiosConfig {
  method?: string;
  endpoint: string;
}

export default class Axios extends UpploadUploader {
  name = "fetch";
  endpoint: string;

  constructor(endpointDetails?: string | UpploadAxiosConfig) {
    super();
    this.endpoint = "";
    if (typeof endpointDetails === "string") {
      this.endpoint = endpointDetails;
    } else if (typeof endpointDetails === "object") {
      this.endpoint = endpointDetails.endpoint;
    }
  }

  upload = async (file: Blob): Promise<string> => {
    console.log("Uploading your image...", this.endpoint);
    return "";
  }
}
