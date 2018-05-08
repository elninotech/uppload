import loadFile from "../loadFile";
import upload from "../upload";
import dispatch from "../dispatch";
import dataURItoBlob from "../dataUriToBlob";

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

let loaded = false;
export default scope => {
	if (!loaded) {
		scope.changePage("uploading");
		loadFile("https://cdn.jsdelivr.net/npm/croppr@2.3.0/dist/croppr.min.js")
			.then(() => {
				loaded = true;
				scope.changePage("crop");
			})
			.catch(() => {
				upload(null, scope)
					.then(() => {})
					.catch(() => {});
			});
	} else {
		const file = scope.meta.file;
		if (!["image/png", "image/jpeg", "image/gif", "image/jpeg"].includes(file.type)) {
			scope.changePage("upload");
			scope.meta.file = file;
			upload(null, scope)
				.then(() => {})
				.catch(() => {});
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		scope.meta.originalFileName = file.name;
		reader.addEventListener("load", event => {
			const imageDataUri = event.target.result;
			if (imageDataUri) {
				const image = scope.modalElement.querySelector("#previewImage");
				image.setAttribute("src", imageDataUri);
				image.addEventListener("load", () => {
					image.style.display = "block";
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
					const cropperDiv = scope.modalElement.querySelector("#imageCropper");
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
			}
		});
	}
};
