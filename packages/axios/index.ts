import { UpploadUploader } from "../uploader";
import axios, { AxiosRequestConfig } from "axios";

type axiosFunction = (...params: any[]) => AxiosRequestConfig;
export default class Axios extends UpploadUploader {
  name = "fetch";
  endpoint?: string;
  configFunction?: axiosFunction;

  constructor(endpointDetails?: string | axiosFunction) {
    super();
    if (typeof endpointDetails === "string") {
      this.endpoint = endpointDetails;
    } else if (typeof endpointDetails === "function") {
      this.configFunction = endpointDetails;
    }
  }

  upload = (file: Blob): Promise<string> => {
    console.log("Uploading your image...", this.endpoint);
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: this.endpoint,
        data: {
          image: file
        },
        ...(this.configFunction ? this.configFunction(file) : undefined)
      })
        .then(response => {
          console.log("GOT SUCCESS RESPONSE", response.data);
          resolve(response.data.url);
        })
        .catch(error => reject(error));
    });
  }
}
