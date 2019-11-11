# Multiple Uppload instances

You can have multiple instances of Uppload on a webpage.

```ts
import { Uppload, Local, Fetch, en } from "uppload";

const profilePicture = new Uppload({ lang: en });
profilePicture.use([new Local(), new Fetch("http://localhost:3000/upload")]);

const coverImage = new Uppload({ lang: en });
coverImage.use([new Local(), new Fetch("http://localhost:3000/upload")]);
```
