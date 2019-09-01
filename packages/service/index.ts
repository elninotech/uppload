import UpploadPlugin from "../plugin";

interface Service {
  name: string;
}

export default class UpploadService extends UpploadPlugin implements Service {
  type = "service";
  name = "";
}
