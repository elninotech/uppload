# Local service

Uppload's Local service allows users to upload images from their computer. Users can drag and drop files or click on the "Select a file" button to open a native file browser.

![Screenshot of Local service](/assets/screenshots/local.png)

To add the Local service to your build, simply import it, initialize the class to an object, and use the `Uppload.use()` function:

```ts
import { Uppload, Local } from "uppload";

const picture = new Uppload();
picture.use(new Local());
```

In the constructor parameter, you can specify the mime types you want to support and the maximum file size. By default, JPG, PNG, and GIF images are allowed, since Uppload is primarily an image uploader (but you can easily extend it to be a general-purpose file uploader).

```ts
const localServiceWithVideo = new Local({
  maxFileSize: 25000,
  mimeTypes: ["image/png", "image/jpeg", "video/mp4"],
});
```
