import { UpploadUploader } from "../uploader";
import { app } from "firebase";

export default class Firebase extends UpploadUploader {
  name = "firebase";
  app: app.App;
  url: string | undefined;
  path: string | undefined;

  constructor({ app, url, path }: { app: app.App, url?: string; path?: string }) {
    super();
    this.url = url;
    this.app = app;
    this.path = path;
  }

  upload = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reference = this.app.storage(this.url).ref(this.path);
      reference.put(file)
        .then(() => reference.getDownloadURL())
        .then(url => resolve(url))
        .catch(error => reject(error));
    })
  }
}
