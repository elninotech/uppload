import { Uploader } from "../helpers/interfaces";

export const xhr = ({
  endpoint,
  fileKeyName = "file",
  method = "POST",
  updateProgress,
  responseKey = "url",
  responseFunction,
  settingsFunction
}: {
  endpoint: string;
  fileKeyName: string;
  method: string;
  updateProgress?: (progress: number) => void;
  responseKey: string;
  responseFunction?: (responseText: string) => string;
  settingsFunction?: (xmlHttp: XMLHttpRequest) => void | XMLHttpRequest;
}): Uploader => {
  return (file: Blob) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append(fileKeyName, file);
      const xmlHttp = new XMLHttpRequest();
      if (typeof settingsFunction === "function") settingsFunction(xmlHttp);
      xmlHttp.open(method, endpoint, true);
      xmlHttp.addEventListener("progress", event => {
        if (typeof updateProgress === "function")
          updateProgress(event.loaded / event.total);
      });
      xmlHttp.addEventListener("load", () => {
        const responseText = xmlHttp.responseText;
        if (typeof responseFunction === "function")
          return resolve(responseFunction(responseText));
        const json = JSON.parse(responseText);
        return resolve(json[responseKey]);
      });
      xmlHttp.addEventListener("error", () => reject("response_not_ok"));
      xmlHttp.addEventListener("abort", () => reject("upload_aborted"));
      xmlHttp.send(formData);
    });
};
