# Themes

Uppload can be themed based on your liking. You can choose from the `dark` or `light` theme, or write your own theme.

You can import the CSS in your JavaScript using a bundler like Webpack:

```ts
import { Uppload } from "uppload";
import "uppload/dist/uppload.css"; // Basic styles
import "uppload/dist/themes/light.css"; // Light theme

const uppload = new Uppload();
```

You can also use the Sass source code instead:

```css
@import "uppload/src/styles/uppload.scss";
@import "uppload/src/themes/light.scss";
```

Or, use a CDN for styling:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/uppload/dist/uppload.css" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/uppload/dist/themes/light.css"
  />
</head>
```

## Custom theme

Instead of importing a theme, you can also design a custom theme. The best way is to look at the source code of [light.scss](https://github.com/elninotech/uppload/blob/master/src/themes/light.scss) and use the same CSS classes. You'll only have to change the color variables.

Alternately, you can overwrite some rules instead of building your own theme. The [theme.scss](https://github.com/elninotech/uppload/blob/master/src/themes/theme.scss) file applies the color variables to the widget, so that's a good starting point for that.
