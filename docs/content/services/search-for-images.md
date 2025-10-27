# Search for images

Users can search for photos from web services which have a free API. This is particulatly useful for letting users upload cover photos or photos in blog posts. Currently supported services are:

| Service name | Class name |
| ------------ | ---------- |
| Unsplash     | `Unsplash` |
| Pexels       | `Pexels`   |
| Pixabay      | `Pixabay`  |
| GIPHY        | `GIPHY`    |

You can sign up for a free API key for all these services, and they are also CORS-friendly. Under the hood, Uppload caches API responses in local storage.

![Screenshot of Unsplash service](/assets/screenshots/unsplash.png)

All search services work the same way. For example, to add the Unsplash service to your build, simply import it, initialize the class with an API key, and use the `Uppload.use()` function:

```ts
import { Uppload, Unsplash } from "uppload";

const picture = new Uppload();
picture.use(new Unsplash("your-api-key"));
```
