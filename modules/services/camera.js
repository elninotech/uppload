import dispatch from "../dispatch";

/**
 * Initialization function for select/drag-drop file service
 * @param {Object} scope - Parent Uppload object
 */
export default scope => {
	const previewWindow = scope.modalElement.querySelector(".camera-container .preview");
	let video = null;
	let canvas = null;
	let startbutton = null;
	let width = 0;
	let height = 0;
	function startup() {
		let streaming = false;
		video = scope.modalElement.querySelector("#cameraVideo");
		canvas = scope.modalElement.querySelector("#cameraCanvas");
		startbutton = scope.modalElement.querySelector("#clickButton");
		navigator.getMedia =
			navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		navigator.getMedia(
			{
				video: true,
				audio: false
			},
			function(stream) {
				if (navigator.mozGetUserMedia) {
					video.mozSrcObject = stream;
				} else {
					let vendorURL = window.URL || window.webkitURL;
					try {
						video.srcObject = stream;
					} catch (error) {
						video.src = vendorURL.createObjectURL(stream);
					}
				}
				video.play();
			},
			function(err) {}
		);
		video.addEventListener(
			"canplay",
			function(ev) {
				if (!streaming) {
					height = video.videoHeight / (video.videoWidth / width);
					if (isNaN(height)) {
						height = width / (4 / 3);
					}
					video.setAttribute("width", width);
					video.setAttribute("height", height);
					canvas.setAttribute("width", width);
					canvas.setAttribute("height", height);
					streaming = true;
				}
			},
			false
		);
		startbutton.addEventListener(
			"click",
			event => {
				clickImage();
				event.preventDefault();
			},
			false
		);
	}
	function clickImage() {
		const context = canvas.getContext("2d");
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			context.drawImage(video, 0, 0, width, height);
			let data = canvas.toDataURL("image/png");
			scope.imagePreview = {
				previous: "camera",
				image: data
			};
			scope.changePage("preview");
		}
	}
	setTimeout(() => {
		width = previewWindow.offsetWidth;
		startup();
	}, 1);
};
