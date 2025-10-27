# Firebase Uploader

This is an example of a custom uploader that sends your file to Firebase Storage. Firebase is a great way to have zero-config file uploads on your website.

```ts
import * as firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "your-firebase-api-key",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  childPath: "path/to/dir",
};

const firebaseUploader = (file, updateProgress) =>
  new Promise((resolve, reject) => {
    // Initialize a new Firebase app based on your config
    firebase.initializeApp(config);

    const storageReference = firebase.storage().ref(config.path);

    // Generate a file name based on current date and random number
    const reference = storageReference.child(
      `${config.childPath || ""}/${Math.random()
        .toString()
        .replace("0.", "")
        .substr(0, 7)}-${new Date().getTime()}.png`
    );

    // Upload the file to the storage reference
    const uploadTask = reference.put(file);

    // Report upload progress
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (updateProgress) updateProgress(progress);
      },
      error => {
        console.log("Got error", error);
        return reject(new Error("unable_to_upload"));
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => resolve(url)) // Return uploaded file's URL
          .catch(() => reject(new Error("unable_to_upload")));
      }
    );
  });
```

And then you can use `firebaseUploader` like any other custom uploader.

```ts
import { Uppload } from "uppload";

const profilePicture = new Uppload({
  uploader: firebaseUploader,
});
```

You can also [view a live demo](https://codesandbox.io/s/uppload-firebase-3zd9b) of the Firebase uploader on CodeSandbox.
