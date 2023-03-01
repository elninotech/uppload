# A-la-carte (treeshaking) plugins

It's very easy to create your own custom build of Uppload, so you only load the feature you want without bloating up your build size.

For example, you can add the following services:

- Local (select file from computer)
- Direct URL
- Search on Unsplash and Pexels

You can import the required services from the `uppload` package and create your package:

```ts
import { Uppload, Local, URL, Unsplash, Pexels, en } from "uppload";

const uploader = new Uppload({ lang: en });
uploader.use([
  new Local(),
  new URL(),
  new Unsplash("unsplash-api-key"),
  new Pexels("pexels-api-key"),
]);
```

Similarly, you can import effects and uploaders and use the `Uppload.use()` function to build your package.
