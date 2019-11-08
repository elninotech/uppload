import { UpploadUploader } from "@uppload/uploader";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type axiosFunction = (...params: any[]) => AxiosRequestConfig;
type returnFunction = (response: AxiosResponse) => string;

export default class Axios extends UpploadUploader {
  name = "fetch";
  endpoint?: string;
  configFunction?: axiosFunction;
  getUrlFunction?: returnFunction;
  getUrlFunctionKey?: string;

  constructor(
    endpointDetails?: string | axiosFunction,
    returnDetails?: string | returnFunction
  ) {
    super();
    if (typeof endpointDetails === "string") {
      this.endpoint = endpointDetails;
    } else if (typeof endpointDetails === "function") {
      this.configFunction = endpointDetails;
    }
    if (typeof returnDetails === "string") {
      this.getUrlFunctionKey = returnDetails;
    } else if (typeof returnDetails === "function") {
      this.getUrlFunction = returnDetails;
    }
  }

  upload = (file: Blob): Promise<string> => {
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
          if (typeof this.getUrlFunction === "function") {
            return resolve(this.getUrlFunction(response));
          } else if (this.getUrlFunctionKey) {
            return resolve(response.data[this.getUrlFunctionKey]);
          } else {
            return resolve(response.data.url);
          }
        })
        .catch(error => reject(error));
    });
  };
}
