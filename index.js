import css from "./uppload.scss";

let isOpen = 0;

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
                <li class="active"><button>Upload file</button></li>
                <li><button>Click photo</button></li>
                <li><button>Import from URL</button></li>
                <li><button>Facebook</button></li>
                <li><button>Google Drive</button></li>
                <li><button>Google Photos</button></li>
                <li><button>Dropbox</button></li>
                <li><button>Instagram</button></li>
            </ul>
        </nav>
    </aside>
    <section>

    </section>
</div>
`;
document.body.appendChild(modal);

window.addEventListener("keyup", event => {
    console.log(event);
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