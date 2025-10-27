import { Uppload, en, Local, Preview } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

const uploader = new Uppload({
  lang: en,
  call: ".pure-button-primary",
  bind: ".uppload-image",
  value: "https://via.placeholder.com/150x150",
  inline: true,
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
uploader.use([new Preview()]);

// Logging
console.log(uploader);
uploader.on("*", (...params: any[]) => {
  console.log(params);
});
