# Camera service

Uppload's Camera service allows users to click a photo using their device's camera.

![Screenshot of Camera service](/assets/screenshots/camera.png)

To add the Camera service to your build, simply import it, initialize the class to an object, and use the `Uppload.use()` function:

```ts
import { Uppload, Camera } from "uppload";

const picture = new Uppload();
picture.use(new Camera());
```

This service is built for non-mobile devices (like laptops with webcams) since the native file picker (for Uppload, that is the [Local](/services/local) service) allows users to click photos in all major mobile operating systems.
