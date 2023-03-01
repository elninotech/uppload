# Image compression

To save on bandwidth and storage costs, you may want to upload resized and compressed images by default. If this is the case, you can [configure](/configuration) Uppload to do so:

```ts
import { Uppload } from "uppload";

const uploader = new Uppload({
  maxSize: [800, 600],
});
```

In the above example, images will be resized to a maximum of 800px in width and 600px in height. You can also specify only one of the two constraints using `maxWidth` or `maxHeight`.

If you want to apply compression, you can specify the `compression` factor (from 0 to 1), and Uppload will apply a lossy compression before uploading the image. This means that even if users upload a PNG, we will convert it to `image/jpeg` and upload it. Alternately, by specifying the `compressionToMime`, you can use WebP instead of JPEG.

```ts
const uploader = new Uppload({
  compression: 0.8,
  compressionToMime: "image/webp",
});
```

If you only want specific file types to be compress, for example only JPEG and WEBP images, but not PNGs, you can use the `compressionFromMimes` property:

```ts
const uploader = new Uppload({
  compression: 0.8,
  compressionFromMimes: ["image/jpeg", "image/webp"],
  compressionToMime: "image/webp",
});
```

If you want to perform your own image compression, perhaps by using an external library, you can specify a function instead:

```ts
const uploader = new Uppload({
  compressor: (file: Blob) => {
    return new Promise((resolve, reject) => {
      // Perform your compression here
      resolve(file);
    });
  },
});
```
