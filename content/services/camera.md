# Camera service

⚠️ **WARNING:** The camera service is currently in active development.

Uppload's Camera service allows users to click a photo using their device's cameras. For laptops, this may be a front-facing webcam; and for mobiles, users can choose from multiple cameras.

<!-- ![Screenshot of Camera service](/assets/screenshots/camera.png) -->

To add the Camera service to your build, simply import it, initialize the class to an object, and use the `Uppload.use()` function:

```ts
import { Uppload, Camera } from "uppload";

const picture = new Uppload();
picture.use(new Camera());
```

In the constructor parameter, you can specify which camera to use by default:

- `USER` for the front camera
- `ENVIRONMENT` for the rear camera

```ts
const click = new Camera("USER");
```
