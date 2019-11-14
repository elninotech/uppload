# Getting started

Uppload 2 lets you build your own Uppload package based on your needs. To get started, install that package.

```bash
npm install uppload
```

Most commonly, you'd want to add the drag-and-drop and file select plugin (known as `Local`), along with the `Fetch` uploader which will send an HTTP POST request to your backend.

Then, you can initialize your plugin:

```ts
import { Uppload, Local, xhrUploader, en } from "uppload";

const uploader = new Uppload({
  lang: en,
  uploader: xhrUploader({
    endpoint: "https://example.com/upload"
  });
});
uploader.use(new Local());
```
