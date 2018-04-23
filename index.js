import css from "./uppload.scss";

let isOpen = 0;

let currentPage = "upload";
import pages from "./modules/pages";

const modalBackground = document.createElement("div");
modalBackground.classList.add("uppload-bg");
document.body.appendChild(modalBackground);

const modal = document.createElement("div");
modal.classList.add("uppload-modal");
modal.innerHTML =`
<div>
    <aside>
        <nav>
            <ul>
                <li class="active"><button><i class="fas fa-fw fa-upload"></i>Upload file</button></li>
                <li><button><i class="fas fa-fw fa-camera"></i>Camera</button></li>
                <li><button><i class="fas fa-fw fa-link"></i>Import from URL</button></li>
                <li><button><i class="fab fa-fw fa-facebook"></i>Facebook</button></li>
                <li><button><i class="fab fa-fw fa-google-drive"></i>Google Drive</button></li>
                <li><button><i class="fab fa-fw fa-dropbox"></i>Dropbox</button></li>
                <li><button><i class="fab fa-fw fa-instagram"></i>Instagram</button></li>
            </ul>
        </nav>
        <a class="uppload-branding" href="https://github.com/elninotech/uppload" target="_blank" rel="noopener noreferrer">Get Uppload</a>
    </aside>
    <section>
        ${pages[currentPage].html}
    </section>
</div>
`;
document.body.appendChild(modal);
pages[currentPage].init();

window.addEventListener("keyup", event => {
    if (event.keyCode === 27 || event.which === 27 || event.key === "Escape" || event.code === "Escape") {
        closeModal();
    }
});

const openModal = () => {
    isOpen = 1;
    modal.classList.add("visible");
    modalBackground.classList.add("visible");
    setTimeout(() => {
        modal.classList.add("fadeIn");
        modalBackground.classList.add("fadeIn");
    }, 1);
};

const closeModal = () => {
    isOpen = 0;
    modal.classList.add("fadeOut");
    modalBackground.classList.add("fadeOut");
    setTimeout(() => {
        modal.classList.remove("fadeOut");
        modal.classList.remove("visible");
        modalBackground.classList.remove("fadeOut");
        modalBackground.classList.remove("visible");
    }, 399);
};


modalBackground.addEventListener("click", closeModal);

openModal();