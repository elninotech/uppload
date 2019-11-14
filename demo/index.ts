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
  Filters,
  Rotate,
  Blur,
  Sharpen,
  Flickr,
  NineGag,
  Pinterest,
  en,
  DeviantArt,
  ArtStation,
  Twitter,
  Brightness,
  Contrast,
  Grayscale,
  HueRotate,
  Invert,
  Saturate,
  Sepia
} from "../src";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button",
  lang: en,
  uploader: (file: Blob) =>
    new Promise(resolve =>
      setTimeout(() => resolve(window.URL.createObjectURL(file)), 2000)
    )
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
  new Local(),
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
  new Crop(),
  // new Filters(),
  new Blur(),
  new Brightness(),
  new Contrast(),
  new Grayscale(),
  new HueRotate(),
  new Invert(),
  new Saturate(),
  new Sepia()
  // new Rotate(),
  // new Sharpen()
]);
// uppload.use(new Axios(() => ({
//   method: "GET",
//   url: "https://jsonplaceholder.typicode.com/todos/1"
// }), () => "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"));

uppload.open();
