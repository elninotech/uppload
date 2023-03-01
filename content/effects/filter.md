# Filter effects

Filter effects use CSS filters on SVG and allow users to drag an input range to add a filter. Available filter effects are:

| Service name | Class name   |
| ------------ | ------------ |
| Blur         | `Blur`       |
| Brightness   | `Brightness` |
| Contrast     | `Contrast`   |
| Grayscale    | `Grayscale`  |
| HueRotate    | `HueRotate`  |
| Invert       | `Invert`     |
| Saturate     | `Saturate`   |
| Sepia        | `Sepia`      |

In the following example, we're using the Blur effect is used, but all filter effects have the same usage:

```ts
import { Uppload, Blur } from "uppload";

const profilePicture = new Uppload();
profilePicture.use(new Blur());
```

## Development

All filter effects are inherited from the `UpploadFilterBaseClass` class, and you can create your own filter effects too:

```ts
import { UpploadFilterBaseClass } from "uppload";

class Brightness extends UpploadFilterBaseClass {
  name = "brightness";
  icon = "your-svg-icon-string";
  cssFilter = "brightness";
  unit = "%";
  value = 0;
  min = 0;
  max = 100;
}
```

In the above example, the CSS filter applied to the SVG will be `filter: brightness(10%)` if the value is `10`.

![Screenshot of the Brightness effect](/assets/screenshots/brightness.png)
