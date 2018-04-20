import css from "./uppload.scss";

const modalBackground = document.createElement("div");
modalBackground.classList.add("uppload-bg");
document.body.appendChild(modalBackground);

const modal = document.createElement("div");
modal.classList.add("uppload-modal");
modal.innerHTML = "Upploadmodal";
document.body.appendChild(modal);
