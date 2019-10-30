# Getting started

Uppload 2.0 lets you build your own Uppload package based on your needs. To get started, add the core package.

```bash
npm install @uppload/core
```

Most commonly, you'd want to add the drag-and-drop and file select plugin, along with the `Fetch` uploader which will send an HTTP POST request to your backend:

```bash
npm install @uppload/drag
```

Then, you can initialize your plugin:

```ts
import Uppload from "@uppload/core";
import DragAndDrop from "@uppload/drag";
import AxiosUploader from "@uppload/axios";

const uploader = new Uppload();
uploader.use(new DragAndDrop(), new AxiosUploader());
```
