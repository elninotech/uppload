import dataURItoBlob from "../dataUriToBlob";

export default scope => {
	const imageUrl = scope.imagePreview.image;
	const previousService = scope.imagePreview.previous;
	const imageElement = scope.modalElement.querySelector("#previewImage");
	imageElement.setAttribute("src", imageUrl);
	imageElement.addEventListener("load", () => {
		imageElement.style.display = "block";
	});
	const backBtn = scope.modalElement.querySelector("#backBtn");
	if (!previousService) {
		backBtn.style.display = "none";
	}
	backBtn.addEventListener("click", () => {
		scope.changePage(previousService);
	});
	scope.modalElement.querySelector("#continueBtn").addEventListener("click", () => {
		scope.meta.file = dataURItoBlob(imageUrl);
		scope.changePage("crop");
	});
};
