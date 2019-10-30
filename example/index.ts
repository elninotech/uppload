import Uppload from "../packages/core";
import Axios from "../packages/axios";
import Instagram from "../packages/instagram";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button"
});
uppload.use(new Instagram());
uppload.use(new Axios());

uppload.open();
