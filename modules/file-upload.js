import metaData from "./meta";

export default () => {
    const dropper = document.querySelector(`#uppload_${metaData.uniqueId} #dragDropElement`);
    dropper.addEventListener("drop", event => {
        console.log("Files have been dropped", event.dataTransfer);
        event.preventDefault();
    });
    dropper.addEventListener("dragover", event => {
        console.log("Files are in the zone!");
        event.preventDefault();
    });
}