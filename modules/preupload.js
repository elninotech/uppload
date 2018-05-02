import Croppr from "croppr";
import upload from "./upload";

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
					aspectRatio: 1
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
