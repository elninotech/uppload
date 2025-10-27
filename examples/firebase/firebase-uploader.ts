import { IUploader } from "uppload";
import * as firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCIsZIBfTuxfMhzbeiPK_ij_YYHkF5BS84",
  projectId: "photomonster-uploads",
  storageBucket: "photomonster-uploads.appspot.com",
  childPath: "uppload",
  path: "/"
};

const uploader: IUploader = (file, updateProgress) =>
  new Promise((resolve, reject) => {
    firebase.initializeApp(config);
    const storageReference = firebase.storage().ref(config.path);
    const reference = storageReference.child(
      `${config.childPath || ""}/file-name-3`
    );
    const uploadTask = reference.put(file);
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
        console.log("Uploaded!");
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => resolve(url))
          .catch(() => reject(new Error("unable_to_upload")));
      }
    );
  });

export default uploader;
