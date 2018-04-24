import metaData from "./meta";

export default () => {
    const dropper = document.querySelector(`#uppload_${metaData.uniqueId} #dragDropElement`);
    dropper.addEventListener("drop", event => {
        if (event.dataTransfer.items) {
            if (ev.dataTransfer.items[0].kind === "file") {
                // ev.dataTransfer.items[0].getAsFile();
            }
        } else {
            // ev.dataTransfer.files[0];
        }
        event.preventDefault();
    });
    dropper.addEventListener("dragover", event => {
        console.log("Files are in the zone!");
        event.preventDefault();
    });
    dropper.addEventListener("click", event => {
        document.querySelector(`#uppload_${metaData.uniqueId} #dragDropFileElt`).click();
        event.preventDefault();
    });
    document.querySelector(`#uppload_${metaData.uniqueId} #selectFileBtn`).addEventListener("click", event => {
        document.querySelector(`#uppload_${metaData.uniqueId} #dragDropFileElt`).click();
        event.preventDefault();
    });
}