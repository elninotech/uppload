import dispatch from "../dispatch";
import uploadFile from "../upload";

/**
 * Initialization function for select/drag-drop file service
 * @param {Object} scope - Parent Uppload object
 */
export default scope => {
	const safeUploadFile = () => {
		uploadFile(null, scope).catch(() => {});
	};
	const dropper = document.querySelector(`#uppload_${scope.meta.uniqueId} #dragDropElement`);
	const inputFile = document.querySelector(`#uppload_${scope.meta.uniqueId} #dragDropFileElt`);
	dropper.addEventListener("drop", event => {
		if (event.dataTransfer.items) {
			if (event.dataTransfer.items[0].kind === "file") {
				scope.meta.file = event.dataTransfer.items[0].getAsFile();
				safeUploadFile();
				dispatch("fileDropped", scope.meta.file);
				dispatch("fileSelected", scope.meta.file);
			}
		} else {
			scope.meta.file = event.dataTransfer.files[0];
			safeUploadFile();
			dispatch("fileDropped", scope.meta.file);
			dispatch("fileSelected", scope.meta.file);
		}
		event.preventDefault();
	});
	dropper.addEventListener("dragenter", event => {
		dropper.classList.add("active");
		dispatch("dragEnter");
		event.preventDefault();
	});
	dropper.addEventListener("dragleave", event => {
		dropper.classList.remove("active");
		dispatch("dragLeave");
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
	document.querySelector(`#uppload_${scope.meta.uniqueId} #selectFileBtn`).addEventListener("click", event => {
		inputFile.click();
		event.preventDefault();
	});
	inputFile.addEventListener("change", event => {
		scope.meta.file = inputFile.files[0];
		safeUploadFile();
		dispatch("fileSelected", scope.meta.file);
	});
};
