# Configuration

In the following example, the `value` property is used in the configuration object to specify the default image value.

```ts
import { Uppload } from "uppload";

const uploader = new Uppload({
  value: "https://example.com/image.jpg",
});
```

The keys you can use in the configuration object are:

| Key                    | Type        | Description                                                                        |
| ---------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `value`                | String      | Default/current image URL                                                          |
| `bind`                 | _IElements_ | Set value of these elements                                                        |
| `call`                 | _IElements_ | Clicking on these elements should open modal                                       |
| `defaultService`       | String      | Default service to open widget on                                                  |
| `lang`                 | Object      | [Language pack](/i18n)                                                             |
| `uploader`             | Function    | Function to [upload files](/uploaders)                                             |
| `inline`               | Boolean     | Show widget inline instead of modal                                                |
| `customClass`          | String      | Adds an additional class to the container                                          |
| `multiple`             | Boolean     | Allow multiple file uploads [#59](https://github.com/elninotech/uppload/issues/59) |
| `compression`          | Number      | Compress image with this factor (0-1)                                              |
| `compressionFromMimes` | String[]    | Only compress these types of images                                                |
| `compressionToMime`    | String      | Type of image to return, `image/jpeg` or `image/webp`                              |
| `maxWidth`             | Number      | Resize image to maximum width                                                      |
| `maxHeight`            | Number      | Resize image to maximum height                                                     |
| `maxSize`              | Number[]    | Resize image to maximum \[width, height]                                           |
| `compressor`           | Function    | Function to [compress files](/compression)                                         |

\*The _IElements_ type can be any of the following:

- String (e.g., a query selector like `".image"`)
- String[] (e.g., a query selector array like `[".image", ".img"]`)
- Element (e.g., a DOM element like `document.getElementById("img")`)
- Element[] (e.g., a DOM element array like `[document.createElement("div")]`)
- An array consisting Strings and DOM elements
