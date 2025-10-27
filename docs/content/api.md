# API

Using the Uppload API, you can programatically control functionality. First, initialize your package, like this:

```ts
import { Uppload, Local, xhrUploader, en } from "uppload";

const uploader = new Uppload({
  lang: en,
  uploader: xhrUploader({
    endpoint: "https://example.com/upload",
  }),
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

uppload
  .upload(file)
  .then(url => {
    console.log("Uploaded URL", url);
  })
  .catch(error => {
    console.error("ERR", error);
  });
```

## Changing settings

If you've already initialized the plugin using `new Uppload()`, you can update its settings (such as language) using the following:

```ts
uppload.updateSettings({
  lang: nl
  uploader: aDifferentUploader
});
```

## Updating active plugins

### Removing a plugin

If you want to remove a specific plugin (like a service or effect), use the `remove` function:

```ts
uppload.remove("instagram");
uppload.remove("crop");
```

### Updating plugins' list:

The `updatePlugins` function takes a function as the argument; that function takes an array of active plugins as its argument and returns the plugins to keep.

For example, you can use the `Array.filter()` function to create a list of active plugins:

```ts
uppload.updatePlugins(plugins =>
  plugins.filter(plugin => {
    plugin.name === "instagram";
  })
);
```

Or, come up with your own logic that returns a list of plugins:

```ts
uppload.updatePlugins(plugins => {
  const result = plugins.length > 4 ? [] : plugins;
  result.push(new Crop(), new Unsplash());
  return result;
});
```

### Removing all plugins

If you want to reset your Uppload instance's plugins by removing all of them, you can return an empty array in `updatePlugins`:

```ts
uppload.updatePlugins(plugins => []);
```
