# Uploading multiple files

Uppload is designed for single-image uploads, like profile and cover photos. However, you can use the `multiple` property in the constructor object, but this is not recommended because effects only work with single images.

```ts
const uploader = new Uppload({
  multiple: true,
});
```

If users select only a single image, effects like crop and filters continue to work, but when users select more than one file, effects are skipped and the images are directly uploaded. You'll also have to use a custom uploader which supports uploading multiple files at once.
