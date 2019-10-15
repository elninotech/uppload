import Uppload from "../packages/core";
import Firebase from "../packages/firebase";
import Instagram from "../packages/instagram";

const uppload = new Uppload({
  value: "https://via.placeholder.com/150",
  bind: ".uppload-image",
  call: ".uppload-button"
});
uppload.use(new Instagram());
uppload.use(new Firebase({
  app: {
    apiKey: "AIzaSyAv67if95tsnEcfQ3AnzPRNjsrma5i0peE",
		projectId: "uppload-storage",
		storageBucket: "uppload-storage.appspot.com"
  }
}));

uppload.open();
