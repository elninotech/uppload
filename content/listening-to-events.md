# Listening to events

You can listen to events by using the `on` function:

```ts
import { Uppload, en } from "uppload";
const uploader = new Uppload({ lang: en });

uploader.on("upload", (url: string) => {
  console.log(`The URL of the uploaded file is: ${url}`);
});
```

If you want to stop listening to the event, you can use the `off` function:

```ts
const errorLogger = (error: string) => {
  console.log("The error message is", error);
};
uploader.on("error", errorLogger); // Start listening
/* . . . */
uploader.off("error", errorLogger); // Stop listening
```

You can listen to the following event:

| Event           | Description                       |
| --------------- | --------------------------------- |
| `ready`         | Plugin is ready and initialized   |
| `bind`          | The value of a new URL is applied |
| `open`          | Plugin is opened                  |
| `close`         | Plugin is closed                  |
| `before-upload` | File upload has started           |
| `upload`        | File upload has completed         |
| `error`         | File upload got an error          |
