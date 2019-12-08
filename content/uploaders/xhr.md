# XHR Uploader

The XHR uploader uses an `XMLHttpRequest` to send the selected file to a server. This is the preferred way to upload files in Uppload since it supports returning progress (%) too, unlike the [Fetch uploader](/uploaders/fetch):

```ts
import { Uppload, xhrUploader } from "uppload";

const profilePicture = new Uppload({
  uploader: xhrUploader({
    endpoint: "https://your-backend.com/upload"
  });
});
```

By default, this will send a POST request with form data with the `file` key and expect a JSON response with the URL, like this:

```json
{
  "url": "https://your-backend.com/file.jpg"
}
```

You can customize the key used in the form data in the configuration:

```ts
const profilePicture = new Uppload({
  uploader: xhrUploader({
    endpoint: "https://your-backend.com/upload",
    fileKeyName: "image"
  });
});
```

If you don't want to send a POST request, you can specify the HTTP verb as well:

```ts
const profilePicture = new Uppload({
  uploader: xhrUploader({
    endpoint: "https://your-backend.com/upload",
    fileKeyName: "image",
    method: "PUT"
  });
});
```

To add custom headers, methods, etc., to the XHR object, you can do this:

```ts
const profilePicture = new Uppload({
  uploader: xhrUploader({
    endpoint: "https://your-backend.com/upload",
    settingsFunction: xmlHttp => {
      // You get the XMLHttpRequest() object as the argument
      // For example, add a custom header for auth
      xmlHttp.setRequestHeader("Authorization", "Bearer MY_TOKEN")
    }
  });
});
```

If your server responds with a different JSON schema which does not use the `url` key, you can use the `responseKey` property:

```ts
const profilePicture = new Uppload({
  uploader: xhrUploader({
    endpoint: "https://your-backend.com/upload",
    responseKey: "imageUrl"
  });
});
```

Or, if it's more complicated than a simple key, you can parse your own response and return the URL:

```ts
const profilePicture = new Uppload({
  uploader: xhrUploader({
    endpoint: "https://your-backend.com/upload",
    responseFunction: responseText => {
      // Return the URL from the response text yourself
      const json = JSON.parse(responseText);
      return json.results[0].url; // Use your JSON response
    }
  });
});
```
