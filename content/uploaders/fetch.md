# Fetch Uploader

The Fetch uploader uses a `Fetch` request to send the selected file to a server. This is can be used instead of the [XHR Uploader](/uploaders/xhr) if your use case does not need backwards compatibility with older browsers (like IE 11).

This uploader also does not support progress (%) and will only display an "Uploading..." message instead of live progress, since `Fetch` does not have an `onprogress` event like `XMLHttpRequest` does.

```ts
import { Uppload, fetch } from "uppload";

const profilePicture = new Uppload({
  uploader: fetch({
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
  uploader: fetch({
    endpoint: "https://your-backend.com/upload",
    fileKeyName: "image"
  });
});
```

If you don't want to send a POST request, you can specify the HTTP verb as well:

```ts
const profilePicture = new Uppload({
  uploader: fetch({
    endpoint: "https://your-backend.com/upload",
    fileKeyName: "image",
    method: "PUT"
  });
});
```

To add custom headers, methods, etc., you can provide additional configuration for the Fetch request. In this case, you will have to also add the body of the request, like so:

```ts
const profilePicture = new Uppload({
  uploader: fetch({
    endpoint: "https://your-backend.com/upload",
    settingsFunction: file => {
      // You get the file blob
      // For example, add a custom header for auth and send a PUT request
      const formData = new FormData();
      formData.append("file", file);
      return {
        method: "PUT",
        body: formData,
        headers: {
          "Authorization": "Bearer YOUR_TOKEN"
        }
      };
    }
  });
});
```

If your server responds with a different JSON schema which does not use the `url` key, you can use the `responseKey` property:

```ts
const profilePicture = new Uppload({
  uploader: fetch({
    endpoint: "https://your-backend.com/upload",
    responseKey: "imageUrl"
  });
});
```

Or, if it's more complicated than a simple key, you can parse your own response and return the URL:

```ts
const profilePicture = new Uppload({
  uploader: fetch({
    endpoint: "https://your-backend.com/upload",
    responseFunction: json => {
      // Has the response.json() result as the argument
      return json.results[0].url; // Use your JSON response
    }
  });
});
```
