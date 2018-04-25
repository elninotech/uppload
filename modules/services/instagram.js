import metaData from "../meta";
import dispatch from "../dispatch";

export default (uploadFile, parent) => {
    const safeUploadFile = () => {
        uploadFile().catch(() => {});
    };
    const err = () => {
        parent.changePage("instagram");
        const error = "Unable to fetch this image from Instagram";
        parent.showError(error);
        dispatch("uploadError", error);
        parent.isUploading = false;
    };
    const buttonElt = document.querySelector(`#uppload_${metaData.uniqueId} #instagramButton`);
    const inputElt = document.querySelector(`#uppload_${metaData.uniqueId} #instagramInput`);
    buttonElt.addEventListener("click", event => {
        parent.changePage("uploading");
        parent.isUploading = true;
        dispatch("uploadStarted");
        setTimeout(() => {
            fetch(`https://api.microlink.io/?url=${inputElt.value}`).then(response => response.json()).then(json => {
                if (json.status === "success") {
                    if (json.data && json.data.image && json.data.image.url) {
                        dispatch("fileUploaded", json.data.image.url);
                        parent.changePage("uploaded");
                        parent.isUploading = false;
                        parent.updateValue(json.data.image.url);
                    } else {
                        err();
                    }
                } else {
                    err();
                }
             }).catch(error => {
                err();
            });
        }, parent.settings.minimumDelay || 0);
    });
    inputElt.addEventListener("keyup", event => {
        event.preventDefault();
        if (event.keyCode === 13) {
            buttonElt.click();
        }
    });
}