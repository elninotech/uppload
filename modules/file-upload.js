import metaData from "./meta";
import dispatch from "./dispatch";

export default uploadFile => {
    const dropper = document.querySelector(`#uppload_${metaData.uniqueId} #dragDropElement`);
    const inputFile = document.querySelector(`#uppload_${metaData.uniqueId} #dragDropFileElt`);
    dropper.addEventListener("drop", event => {
        if (event.dataTransfer.items) {
            if (event.dataTransfer.items[0].kind === "file") {
                metaData.file = event.dataTransfer.items[0].getAsFile();
                uploadFile();
                dispatch("fileDropped", metaData.file);
                dispatch("fileSelected", metaData.file);
            }
        } else {
            metaData.file = event.dataTransfer.files[0];
            uploadFile();
            dispatch("fileDropped", metaData.file);
            dispatch("fileSelected", metaData.file);
        }
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
        uploadFile();
        dispatch("fileSelected", metaData.file);
    });
}