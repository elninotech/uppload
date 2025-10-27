import { Uppload, en, Unsplash, Crop, Pixabay, Pexels } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

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
uploader.use([
  new Unsplash(
    "3135681ed1e271e3d3d167e184aecfb0ad74d2043f6f378bf19a23a6647954d8"
  ),
  new Pixabay("14234762-6301dcca06f491e77f115de8e"),
  new Pexels("563492ad6f9170000100000172ccefc96f674d01869ba24acc62a573")
]);

// Effects
uploader.use([new Crop()]);

// Logging
console.log(uploader);
uploader.on("*", (...params: any[]) => {
  console.log(params);
});
