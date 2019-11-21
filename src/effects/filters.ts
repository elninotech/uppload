import { UpploadEffect } from "../";
import { safeListen } from "../helpers/elements";
import { HandlersParams } from "../helpers/interfaces";

export default class Filters extends UpploadEffect {
  name = "filters";
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 18)" fill="#000" fill-rule="nonzero"><path d="M244 40h-29V10c0-6-5-10-10-10H10C4 0 0 4 0 10v160c0 5 4 10 10 10h29v30c0 6 4 10 9 10h195c6 0 10-4 10-10V50c0-5-4-10-9-10zm-10 136l-40-45c-4-5-11-5-15 0l-17 19-38-45c-4-5-13-5-17 0l-49 58V60h176v116zM19 160V20h176v20H49c-6 0-10 5-10 10v110H19z"/><ellipse cx="202.5" cy="94" rx="15.5" ry="16"/></g></svg>`;

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

  handlers = (params: HandlersParams) => {
    const range = params.uppload.container.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range)
      safeListen(range, "change", () => {
        this.update(params);
      });
  };

  update({ uppload }: HandlersParams) {
    console.log(new Date());
    let value = 0;
    const range = uppload.container.querySelector(
      ".settings input[type='range']"
    ) as HTMLInputElement;
    if (range) value = parseInt(range.value);
    const displayer = uppload.container.querySelector(".settings .value span");
    if (displayer) displayer.innerHTML = value.toString();
  }
}
