import {
  Uppload,
  Local,
  Crop,
  en,
  Blur,
  Brightness,
  Contrast,
  Grayscale,
  HueRotate,
  Invert,
  Saturate,
  Sepia
} from "uppload";
import "uppload/uppload.css";
import "uppload/themes/light.css";

const uploader = new Uppload({
  lang: en,
  call: ".pure-button-primary",
  bind: ".uppload-image",
  value: "https://via.placeholder.com/150x150",
  uploader: (file, updateProgress) =>
    new Promise(resolve => {
      console.log("Uploading file...", file);
      setTimeout(() => resolve(window.URL.createObjectURL(file)), 2750);
      let progress = 0;
      const interval = setInterval(() => {
        if (progress > 99) clearInterval(interval);
        if (updateProgress) updateProgress(progress++);
      }, 25);
    })
});

// Services
uploader.use([new Local()]);

// Effects
uploader.use([
  new Crop(),
  new Blur(),
  new Brightness(),
  new Contrast(),
  new Grayscale(),
  new HueRotate(),
  new Invert(),
  new Saturate(),
  new Sepia()
]);

// Logging
console.log(uploader);
uploader.on("*", (...params: any[]) => {
  console.log(params);
});
