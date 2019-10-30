import Uppload from "../packages/core";
import Axios from "../packages/axios";
import Instagram from "../packages/instagram";
import { en } from "../packages/i18n";

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

uppload.open();
