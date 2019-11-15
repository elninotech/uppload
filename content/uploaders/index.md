# Uploaders

Uploaders are ways to upload a file to a server. The `uploader` key in the constructor parameter is used to specify an uploader function:

```ts
import { Uppload } from "uppload";

const profilePicture = new Uppload({
  uploader: (file: Blob, updateProgress: (progress: number) => void) => {
    // Upload your file here
    // Optionally, update the progress percentage
  }
});
```
