import UpploadPlugin from "../plugin";
import { UpploadService } from "../service";

export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  handle: (error: any) => void;
}

export default class Uppload {
  services: UpploadService[] = [];

  ready() {
    console.log("Uppload is ready!", this.services);
  }

  use(plugin: UpploadPlugin | UpploadService | UpploadPlugin[] | UpploadService[]) {
    if (Array.isArray(plugin)) {
      plugin.forEach(item => this.install(item));
    } else {
      this.install(plugin);
    }
  }
  install(plugin: UpploadPlugin | UpploadService) {
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
