import { UpploadEffect } from "../";
import { safeListen } from "../helpers/elements";
import { HandlersParams } from "../helpers/interfaces";

export default class Filters extends UpploadEffect {
  name = "filters";
  icon = "fas fa-images";

  template = (file: Blob) => {
    const image = URL.createObjectURL(file);
    return `
      <div><div class="filter-previews"><div class="filter-previews-scroll">
        <div>
          <div class="filter-pic filter-normal"><img alt="" src="${image}"></div>
          <div>Normal</div>
        </div>
        <div>
          <div class="filter-pic filter-1977"><img alt="" src="${image}"></div>
          <div>1977</div>
        </div>
        <div>
          <div class="filter-pic filter-aden"><img alt="" src="${image}"></div>
          <div>Aden</div>
        </div>
        <div>
          <div class="filter-pic filter-brooklyn"><img alt="" src="${image}"></div>
          <div>Brooklyn</div>
        </div>
        <div>
          <div class="filter-pic filter-inkwell"><img alt="" src="${image}"></div>
          <div>Inkwell</div>
        </div>
        <div>
          <div class="filter-pic filter-poprocket"><img alt="" src="${image}"></div>
          <div>Poprocket</div>
        </div>
        <div>
          <div class="filter-pic filter-x-pro-ii"><img alt="" src="${image}"></div>
          <div>X-Pro II</div>
        </div>
      </div></div></div>
    `;
  };

  handlers = () => {
    const range = document.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range)
      safeListen(range, "change", () => {
        this.update();
      });
  };

  update() {
    console.log(new Date());
    let value = 0;
    const range = document.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range) value = parseInt(range.value);
    const displayer = document.querySelector(".settings .value span");
    if (displayer) displayer.innerHTML = value.toString();
  }
}
