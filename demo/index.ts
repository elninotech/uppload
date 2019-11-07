import { Uppload } from "../src";
// import Axios from "@uppload/axios";
import { Instagram } from "../src";
import { Facebook } from "../src";
import { Camera } from "../src";
import { URL } from "../src";
import { Local } from "../src";
import { Screenshot } from "../src";
import { en } from "../src";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button",
  lang: en
});
uppload.use([new Local(), new Camera(), new Instagram(), new URL(), new Facebook(), new Screenshot()]);
// uppload.use(new Axios(() => ({
//   method: "GET",
//   url: "https://jsonplaceholder.typicode.com/todos/1"
// }), () => "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"));

uppload.open();
