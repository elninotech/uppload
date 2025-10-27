# Writing a custom uploader

Instead of using the [XHR Uploader](/uploaders/xhr) or [Fetch Uploader](/uploaders/fetch), you can also write your own uploader.

The uploader function should return a `Promise` which resolves to the URL of the uploaded file on the server.

```ts
import { Uppload } from "uppload";

const customUploader = (file: Blob): Promise<string> => {
  // Here, we take the file and send it to the server
  return new Promise((resolve, reject) => {
    // Send the file and get the URL
    resolve("uploaded-file-url");
  });
};

const profilePicture = new Uppload({
  uploader: customUploader,
});
```

If your custom uploader supports reporting progress, you can do so too:

```ts
const customUploader = (
  file: Blob,
  updateProgress: (progress: number) => void
): Promise<string> => {
  // Here, we take the file and send it to the server
  return new Promise((resolve, reject) => {
    // Keep updating the progress
    updateProgress(10); // Progress is now at 10%
    // Send the file as soon as it is uploaded
    resolve("uploaded-file-url");
  });
};
```

For example, a custom XHR request uploader could look like this:

```ts
const customUploader = (
  file: Blob,
  updateProgress: (progress: number) => void
): Promise<string> => {
  // Here, we take the file and send it to the server
  return new Promise((resolve, reject) => {
    // First, we create form data with the file
    const formData = new FormData();
    formData.append("file", file);

    // Then, we upload the file
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://example.com/upload", true);

    // We also report the progress back
    xmlHttp.addEventListener("progress", event =>
      updateProgress(event.loaded / event.total);
    );

    // Finally, we report the uploaded file URL
    xmlHttp.addEventListener("load", () =>
      resolve(JSON.parse(xmlHttp.responseText).url);
    );

    // Handle errors
    xmlHttp.addEventListener("error", () => reject("errors.response_not_ok"));
    xmlHttp.addEventListener("abort", () => reject("errors.upload_aborted"));

    // Send the request
    xmlHttp.send(formData);
  });
}
```
