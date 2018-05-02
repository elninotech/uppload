import Croppr from "croppr";
import upload from "./upload";
import dispatch from "./dispatch";

const getImagePortion = (imgObj, newWidth, newHeight, startX, startY, ratio) => {
	const tnCanvas = document.createElement("canvas");
	const tnCanvasContext = tnCanvas.getContext("2d");
	tnCanvas.width = newWidth;
	tnCanvas.height = newHeight;
	const bufferCanvas = document.createElement("canvas");
	const bufferContext = bufferCanvas.getContext("2d");
	bufferCanvas.width = imgObj.width;
	bufferCanvas.height = imgObj.height;
	bufferContext.drawImage(imgObj, 0, 0);
	tnCanvasContext.drawImage(bufferCanvas, startX, startY, newWidth * ratio, newHeight * ratio, 0, 0, newWidth, newHeight);
	return tnCanvas.toDataURL();
};

const dataURItoBlob = dataURI => {
	const byteString = atob(dataURI.split(",")[1]);
	const mimeString = dataURI
		.split(",")[0]
		.split(":")[1]
		.split(";")[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ab], { type: mimeString });
};

export default scope => {
	const file = scope.meta.file;
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.addEventListener("load", event => {
		const imageDataUri = event.target.result;
		if (imageDataUri) {
			const image = scope.modalElement.querySelector("#previewImage");
			image.setAttribute("src", imageDataUri);
			image.addEventListener("load", () => {
				const cropInstance = new Croppr(scope.modalElement.querySelector("#previewImage"), {
					aspectRatio: scope.settings.crop.aspectRatio || null,
					maxSize: scope.settings.crop.maxSize || null,
					minSize: scope.settings.crop.minSize || null,
					onCropStart: data => {
						dispatch("cropStart", data);
					},
					onCropMove: data => {
						dispatch("cropMove", data);
					},
					onCropEnd: data => {
						dispatch("cropEnd", data);
					}
				});
				const button = scope.modalElement.querySelector("#cropAndUploadBtn");
				button.addEventListener("click", () => {
					const cropValues = cropInstance.getValue();
					const newImage = getImagePortion(image, cropValues.width, cropValues.height, cropValues.x, cropValues.y, 1);
					scope.meta.file = dataURItoBlob(newImage);
					upload(null, scope)
						.then(() => {})
						.catch(() => {});
				});
			});
		} else {
		}
	});
};
