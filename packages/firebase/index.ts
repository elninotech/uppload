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

  upload = async (file: Blob) => {
    const reference = this.app.storage(this.url).ref(this.path);
    await reference.put(file);
    return await reference.getDownloadURL();
  }
}
