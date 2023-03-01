import { IUploader } from "../helpers/interfaces";

export const xhrUploader = ({
  endpoint,
  fileKeyName = "file",
  method = "POST",
  responseKey = "url",
  responseFunction,
  settingsFunction,
}: {
  endpoint: string;
  fileKeyName?: string;
  method?: string;
  responseKey?: string;
  responseFunction?: (responseText: string) => string;
  settingsFunction?: (xmlHttp: XMLHttpRequest) => void | XMLHttpRequest;
}): IUploader => {
  return (file, updateProgress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append(fileKeyName, file);
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open(method, endpoint, true);
      if (typeof settingsFunction === "function") settingsFunction(xmlHttp);
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
      xmlHttp.addEventListener("error", () => reject("errors.response_not_ok"));
      xmlHttp.addEventListener("abort", () => reject("errors.upload_aborted"));
      xmlHttp.send(formData);
    });
};

export const fetchUploader = ({
  endpoint,
  settingsFunction,
  method = "POST",
  fileKeyName = "file",
  responseKey = "url",
  responseFunction,
}: {
  endpoint: RequestInfo;
  settingsFunction?: (file: Blob) => RequestInit;
  method?: string;
  fileKeyName?: string;
  responseKey?: string;
  responseFunction?: (responseText: string) => string;
}): IUploader => {
  return file =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append(fileKeyName, file);
      window
        .fetch(
          endpoint,
          settingsFunction
            ? settingsFunction(file)
            : {
                method,
                body: formData,
              }
        )
        .then(response => {
          if (!response.ok) throw new Error("errors.response_not_ok");
          return response.json();
        })
        .then(json => {
          if (typeof responseFunction === "function")
            return resolve(responseFunction(json));
          return resolve(json[responseKey]);
        })
        .catch(() => reject("errors.response_not_ok"));
    });
};
