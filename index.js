import css from "./uppload.scss";

let currentPage = "upload";
import pages from "./modules/pages";

class Uppload {

    constructor(settings) {
    
        // Settings and initialization
        this.settings = settings || {};
        this.isOpen = 0;

        // Append modal to body
        this.modalBackground = document.createElement("div");
        this.modalBackground.classList.add("uppload-bg");
        document.body.appendChild(this.modalBackground);

        this.modal = document.createElement("div");
        this.modal.classList.add("uppload-modal");
        this.modal.innerHTML =`
        <div>
            ${pages.navbar.html}
            <section>
                ${pages[currentPage].html}
            </section>
        </div>
        `;
        document.body.appendChild(this.modal);
        pages[currentPage].init();
        
        // Add keyboard and click events to close modal
        this.modalBackground.addEventListener("click", this.closeModal.bind(this));
        window.addEventListener("keyup", event => {
            if (event.keyCode === 27 || event.which === 27 || event.key === "Escape" || event.code === "Escape") {
                this.modalBackground.click();
            }
        });

        // Update default value of image
        if (this.settings.value) {
            this.updateValue(this.settings.value, 1);
        }

        // Add click event to button
        this.settings.call = this.settings.call || ["data-uppload-button"];
        for (let i = 0; i < this.settings.call.length; i++) {
            let $button = document.querySelector(this.settings.call[i]);
            $button.addEventListener("click", this.openModal.bind(this));
        }
    
    }

    updateValue(newValue, initial = 0) {
        const elements = this.settings.bind || [];
        for (let i = 0; i < elements.length; i++) {
            let $element = document.querySelector(elements[i]);
            if ($element.tagName === "IMG") {
                $element.setAttribute("src", newValue);
            } else {
                $element.setAttribute("value", newValue);
            }
            $element.classList.add(`uppload-${initial === 0 ? "updated" : "initialized"}`);
        }
    }

    openModal() {
        this.isOpen = 1;
        this.modal.classList.add("visible");
        this.modalBackground.classList.add("visible");
        setTimeout(() => {
            this.modal.classList.add("fadeIn");
            this.modalBackground.classList.add("fadeIn");
        }, 1);
        setTimeout(() => {
            this.modal.classList.remove("fadeIn");
            this.modalBackground.classList.remove("fadeIn");
        }, 400);
    };
    
    closeModal() {
        this.isOpen = 0;
        this.modal.classList.add("fadeOut");
        this.modalBackground.classList.add("fadeOut");
        setTimeout(() => {
            this.modal.classList.remove("fadeOut");
            this.modal.classList.remove("visible");
            this.modalBackground.classList.remove("fadeOut");
            this.modalBackground.classList.remove("visible");
        }, 399);
    };

};
window.Uppload = Uppload; // for CDN
export default Uppload; // for ES6/CJS