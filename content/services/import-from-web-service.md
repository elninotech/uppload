# Import from web service

Users can import photos from web services in Uppload by specifying the resource URL. Currently supported services are:

| Service name       | Class name   |
| ------------------ | ------------ |
| Direct URL         | `URL`        |
| Instagram          | `Instagram`  |
| Facebook           | `Facebook`   |
| Twitter            | `Twitter`    |
| Flickr             | `Flickr`     |
| 9GAG               | `NineGag`    |
| Pinterest          | `Pinterest`  |
| DeviantArt         | `DeviantArt` |
| ArtStation         | `ArtStation` |
| Flipboard          | `Flipboard`  |
| Fotki              | `Fotki`      |
| LinkedIn           | `LinkedIn`   |
| Reddit             | `Reddit`     |
| Tumblr             | `Tumblr`     |
| WeHeartIt          | `WeHeartIt`  |
| Webpage screenshot | `Screenshot` |

![Screenshot of Instagram service](/assets/screenshots/instagram.png)

All web services work the same way. For example, to add the Instagram service to your build, simply import it, initialize the class to an object, and use the `Uppload.use()` function:

```ts
import { Uppload, Instagram } from "uppload";

const picture = new Uppload();
picture.use(new Instagram());
```

## Development

Under the hood, all of these web service importers use the [Microlink API](https://microlink.io), so they have a shared codebase. Uppload also caches API responses in local storage.

If you want to build your own Microlink-based web service importer, you can do this:

```ts
import { MicrolinkBaseClass } from "uppload";

export default class ServiceName extends MicrolinkBaseClass {
  name = "service-name";
  icon = "your-svg-icon";
  color = "#cc3366";
}
```
