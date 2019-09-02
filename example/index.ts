import Uppload from "../packages/core";
import Instagram from "../packages/instagram";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button"
});
uppload.use(new Instagram());

uppload.open();
