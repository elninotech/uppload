import UpploadPlugin from "../plugin";
import { UpploadService } from "../service";
import "./index.scss";

export interface HandlersParams {
  upload: (file: Blob) => Promise<string>;
  handle: (error: any) => void;
}

class DefaultService extends UpploadService {
  name = "default";
  template = () => `<p>Select a service from the left.</p>`;
};

export default class Uppload {
  services: UpploadService[] = [new DefaultService()];
  isOpen = false;
  activeService = "default";
  container: HTMLDivElement;

  constructor() {
    const div = document.createElement("div");
    const body = document.body;
    if (body) {
      body.appendChild(div);
    }
    this.container = div;
  }

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

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.update();
  }

  update() {
    this.container.innerHTML = this.render();
  }

  render() {
    return `
      <div class="uppload-modal">
        <aside>
          <ul>
            ${this.services.map(service =>
              `<li class="service-${this.activeService === service.name ? 'active' : 'inactive'}">
                <span>${service.name}</span>
              </li>`
            ).join("")}
          </ul>
        </aside>
        <section>
          ${this.renderActiveService()}
        </section>
      </div>
    `;
  }

  renderActiveService() {
    const activeServices = this.services.filter(service => service.name === this.activeService);
    if (activeServices.length) {
      const activeService = activeServices[0];
      console.log(activeService);
      return `${typeof activeService.template === "function" ? activeService.template() : ""}`;
    }
  }
}
