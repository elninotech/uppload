import metaData from "../meta";
import dispatch from "../dispatch";

export default uploadFile => {
    const safeUploadFile = () => {
        uploadFile().catch(() => {});
    };
    const dropper = document.querySelector(`#uppload_${metaData.uniqueId} #dragDropElement`);
    const inputFile = document.querySelector(`#uppload_${metaData.uniqueId} #dragDropFileElt`);
    dropper.addEventListener("drop", event => {
        if (event.dataTransfer.items) {
            if (event.dataTransfer.items[0].kind === "file") {
                metaData.file = event.dataTransfer.items[0].getAsFile();
                safeUploadFile();
                dispatch("fileDropped", metaData.file);
                dispatch("fileSelected", metaData.file);
            }
        } else {
            metaData.file = event.dataTransfer.files[0];
            safeUploadFile();
            dispatch("fileDropped", metaData.file);
            dispatch("fileSelected", metaData.file);
        }
        event.preventDefault();
    });
    dropper.addEventListener("dragenter", event => {
        dropper.classList.add("active");
        dispatch("dragEnter");
        event.preventDefault();
    });
    dropper.addEventListener("dragleave", event => {
        dropper.classList.remove("active");
        dispatch("dragLeave");
        event.preventDefault();
    });
    dropper.addEventListener("dragover", event => {
        dispatch("dragOver");
        event.preventDefault();
    });
    dropper.addEventListener("click", event => {
        inputFile.click();
        event.preventDefault();
    });
    document.querySelector(`#uppload_${metaData.uniqueId} #selectFileBtn`).addEventListener("click", event => {
        inputFile.click();
        event.preventDefault();
    });
    inputFile.addEventListener("change", event => {
        metaData.file = inputFile.files[0];
        safeUploadFile();
        dispatch("fileSelected", metaData.file);
    });
}