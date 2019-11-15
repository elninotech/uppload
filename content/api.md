# API

Using the Uppload API, you can programatically control functionality. First, initialize your package, like this:

```ts
import { Uppload, Local, xhrUploader, en } from "uppload";

const uploader = new Uppload({
  lang: en,
  uploader: xhrUploader({
    endpoint: "https://example.com/upload"
  })
});
uploader.use(new Local());
```

Now, you're ready to use the API.

## Widget manipulation

You can open, close, or toggle the widget like this:

```ts
uppload.open();
uppload.close();
uppload.toggle();
```

To get the current state (open or closed), the recommended way is using the `modalOpen()` function:

```ts
const isOpen = uppload.modalOpen();
// `isOpen` is true or false
```

## Navigation

To navigate to a specific service, like Local, you can do this:

```ts
uppload.navigate("local");
```

## Uploads

Lastly, you can also upload a file:

```ts
const file = new Blob();

uppload.upload(file)
  .then(url => {
    console.log("Uploaded URL", url);
  }).catch(error => {
    console.error("ERR", error);
  });
```
