# Crop

The Crop effect lets users crop their images before uploading them. Users can also choose which aspect ratio they want to crop by -- free, square, or 16:9.

```ts
import { Uppload, Crop } from "uppload";

const profilePicture = new Uppload();
profilePicture.use(new Crop());
```

You can force the aspect ratio. For example, only allow squares (1:1):

```ts
profilePicture.use(
  new Crop({
    aspectRatio: 1,
  })
);
```

You can also customize the aspect ratio options given to users. By default, the free aspect ratio has the value `NaN`:

```ts
profilePicture.use(
  new Crop({
    aspectRatioOptions: {
      free: NaN,
      square: 1,
      "16:9": 16 / 9,
    },
  })
);
```

If you don't want users to edit the aspect ratio, you can use the `hideAspectRatioSettings` property. This is the default case if you specify an aspect ratio:

```ts
profilePicture.use(
  new Crop({
    hideAspectRatioSettings: true
);
```

![Screenshot of the Crop effect](/assets/screenshots/crop.png)
