import { Uppload } from "../src";
import { Instagram } from "../src";
import { Facebook } from "../src";
import { Camera } from "../src";
import { URL } from "../src";
import { Local } from "../src";
import { GIPHY } from "../src";
import { Unsplash } from "../src";
import { Pixabay } from "../src";
import { Pexels } from "../src";
import { Screenshot } from "../src";
import { Crop } from "../src";
import { Filters } from "../src";
import { Rotate } from "../src";
import { Hue } from "../src";
import { Sharpen } from "../src";
import { en } from "../src";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button",
  lang: en
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
  new Filters(),
  new Hue(),
  new Crop(),
  new Rotate(),
  new Sharpen()
]);
// uppload.use(new Axios(() => ({
//   method: "GET",
//   url: "https://jsonplaceholder.typicode.com/todos/1"
// }), () => "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"));

uppload.open();
