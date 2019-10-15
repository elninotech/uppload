import { UpploadUploader } from "../uploader";
import { app, initializeApp } from "firebase";

export default class Firebase extends UpploadUploader {
  name = "firebase";
  app: app.App;
  url: string | undefined;
  path: string | undefined;

  constructor({ app, url, path }: { app: Object, url?: string; path?: string }) {
    super();
    this.url = url;
    this.app = initializeApp(app);
    this.path = path;
  }

  upload = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reference = this.app.storage(this.url).ref(this.path);
      const child = reference.child(`file-name.${file.type}`);
      child.put(file)
        .then(() => child.getDownloadURL())
        .then((url: string) => resolve(url))
        .catch(error => reject(error));
    })
  }
}
