import Croppr from "croppr";
import upload from "./upload";
import dispatch from "./dispatch";

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
					console.log(cropInstance.getValue());
				});
			});
		} else {
		}
	});
};
