import Dropzone from "dropzone";

export default () => {
    const dropzoneElt = new Dropzone(".uppload-modal #dropzoneElt", {
        clickable: ".uppload-modal #dropzoneBtn",
        url: "/file/post"
    });
    // console.log(dropzoneElt);
}