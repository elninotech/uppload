import UpploadPlugin from "../plugin";
import { UpploadService } from "../service";

export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  handle: (error: any) => void;
}

export default class Uppload {
  services: UpploadService[] = [];

  ready() {
    console.log("Uppload is ready!");
  }

  use(plugin: UpploadPlugin) {
    if (plugin.type === "service") {
      // Install this service
      this.services.push(plugin as UpploadService);
      this.ready();
    }
  }

  renderSidebar() {
    return `<ul>
      ${this.services.map(service =>
        `<li>${service.name}</li>`
      )}
    </ul>`;
  }
}
