import { Uppload, en, Local, Crop } from "uppload";
import firebaseUploader from "./firebase-uploader";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

const uploader = new Uppload({
  lang: en,
  call: ".pure-button-primary",
  bind: ".uppload-image",
  value: "https://via.placeholder.com/150x150",
  uploader: firebaseUploader
});

// Services
uploader.use([new Local()]);

// Effects
uploader.use([new Crop({ aspectRatio: 1 })]);

// Logging
console.log(uploader);
uploader.on("*", (...params: any[]) => {
  console.log(params);
});
