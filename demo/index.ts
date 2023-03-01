import {
  Uppload,
  Instagram,
  Facebook,
  Camera,
  URL,
  Local,
  GIPHY,
  Unsplash,
  Pixabay,
  Pexels,
  Screenshot,
  Crop,
  Rotate,
  Flip,
  Blur,
  Flickr,
  NineGag,
  Pinterest,
  en,
  DeviantArt,
  ArtStation,
  Twitter,
  Flipboard,
  Fotki,
  LinkedIn,
  Reddit,
  Tumblr,
  WeHeartIt,
  Brightness,
  Contrast,
  Grayscale,
  HueRotate,
  Invert,
  Saturate,
  Sepia,
} from "../src";

const button = document.createElement("div");
button.innerHTML = `<div class="try-button"><button class="try-uppload"><span aria-hidden="true">&#9654;&nbsp;&nbsp;</span>Live demo</button></div>`;
const header = document.querySelector("header#masthead .masthead");
if (header) header.appendChild(button);

const uppload = new Uppload({
  value: "https://via.placeholder.com/150x150",
  bind: [".uppload-image", "img.icon"],
  call: ".try-uppload",
  lang: en,
  maxSize: [256, 256],
  uploader: (file, updateProgress) =>
    new Promise(resolve => {
      console.log("Uploading file...", file);
      setTimeout(() => resolve(window.URL.createObjectURL(file)), 2750);
      let progress = 0;
      const interval = setInterval(() => {
        if (progress > 99) clearInterval(interval);
        updateProgress && updateProgress(progress++);
      }, 25);
    }),
});

// These are our public demo API keys
// You should create your own (free!) account on these services and use your own API keys
const GIPHY_API_KEY = "Oxp1XWdrjdIVi2NUSD93h4HTuVpmIOAy";
const PIXABAY_API_KEY = "14234762-6301dcca06f491e77f115de8e";
const UNSPLASH_API_KEY =
  "3135681ed1e271e3d3d167e184aecfb0ad74d2043f6f378bf19a23a6647954d8";
const PEXELS_API_KEY =
  "563492ad6f9170000100000172ccefc96f674d01869ba24acc62a573";

uppload.use([
  new Local({
    mimeTypes: [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ],
  }),
  new Camera(),
  new Instagram(),
  new URL(),
  new Facebook(),
  new Screenshot(),
  new GIPHY(GIPHY_API_KEY),
  new Unsplash(UNSPLASH_API_KEY),
  new Pixabay(PIXABAY_API_KEY),
  new Pexels(PEXELS_API_KEY),
  new Pinterest(),
  new Flickr(),
  new Twitter(),
  new NineGag(),
  new DeviantArt(),
  new ArtStation(),
  new Flipboard(),
  new Fotki(),
  new LinkedIn(),
  new Reddit(),
  new Tumblr(),
  new WeHeartIt(),
]);

uppload.use([
  new Crop({
    aspectRatio: 1,
  }),
  new Rotate(),
  new Blur(),
  new Brightness(),
  new Flip(),
  new Contrast(),
  new Grayscale(),
  new HueRotate(),
  new Invert(),
  new Saturate(),
  new Sepia(),
]);

uppload.on("*", (...args: any) => {
  console.log("Uppload event", ...args);
});

setTimeout(function () {
  // @ts-ignore-next-line
  document.querySelector(".try-uppload").click();
}, 250);

(window as any).uppload = uppload;
