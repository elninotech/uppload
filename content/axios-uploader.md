# Axios Uploader

The Axios Uploader is the primary way to send a file to your backend. It uses [Axios](https://github.com/axios/axios), a Promise-based HTTP client for the browser, since it has wide browser support.

To get started, add the package to your project as a dependency:

```bash
npm install @uppload/axios
```

Then, you can initialize your plugin. In the following example, we will make a `POST` request to https://example.com.

```ts
import Uppload from "@uppload/core";
import AxiosUploader from "@uppload/axios";

const uploader = new Uppload();
uploader.use(new AxiosUploader("https://example.com"));
```

We are assuming the the response from the server will look like this:

```json
{
  "url": "https://example.com/uploads/uploaded-image.jpg"
}
```

However, if your JSON response has a different key for the URL of the uploaded image, you can specify that as the second parameter:

```ts
uploader.use(new AxiosUploader("https://example.com", "fileUrl"));
```

If you don't want to send a `POST` request but a `PUT` request, for example, you have to use a configuration function as the first parameter. This is used as Axios's configuration:


```ts
const configurationFunction = (file: Blob) => {
  return {
    method: "PUT",
    data: {
      file
    }
  };
};
uploader.use(new AxiosUploader(configurationFunction, "fileUrl"));
```

Similarly, you can also make authenticated requests using custom headers, change the data type, etc., using the configuration function. For example, we will add an API key:

```ts
const configurationFunction = (file: Blob) => {
  return {
    method: "PUT",
    data: {
      file
    },
    headers: {
      "Authorization": "Bearer my-api-key"
    }
  };
};
uploader.use(new AxiosUploader(configurationFunction, "fileUrl"));
```
