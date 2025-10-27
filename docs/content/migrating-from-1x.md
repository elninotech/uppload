# Migrating from Uppload 1.x

Uppload is rewritten from the ground up in TypeScript, and it's not backwards-compatible with Uppload 1.x.

To make sure there are no collisions, even the import style is different. For Uppload 1.x, you would use the default import as the class:

```js
import Uppload from "uppload";
```

But Uppload 2.x requires you to import the Uppload class like this:

```ts
import { Uppload } from "uppload";
```

Uppload 1.x had all packages built-in, so you could initialize it like this:

```js
const profilePicture = new Uppload({
  value: "https://randomuser.me/api/portraits/women/17.jpg",
});
```

In Uppload 2.x, however, you have to import the features you require.

```ts
import { Uppload, Instagram, Pexels } from "uppload";
const profilePicture = new Uppload({
  value: "https://randomuser.me/api/portraits/women/17.jpg",
});
profilePicture.use(new Instagram(), new Pexels());
```

Finally, Uppload 1.x didn't support TypeScript, but Uppload 2.x is written in TypeScript so it works with both JavaScript (ES6) and TypeScript.
