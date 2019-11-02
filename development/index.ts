import Uppload from "../packages/core/dist/index";
import Axios from "../packages/axios/dist/index";
import Instagram from "../packages/instagram/dist/index";
import { en } from "../packages/i18n/dist/index";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button",
  lang: en
});
uppload.use(new Instagram());
uppload.use(new Axios(() => ({
  method: "GET",
  url: "https://jsonplaceholder.typicode.com/todos/1"
}), () => "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"));

uppload.on("open", () => console.log("Uppload is open!"));
uppload.open();
