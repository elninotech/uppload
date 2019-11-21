import { UpploadService } from "../service";

export default class Camera extends UpploadService {
  name = "camera";
  icon = `<svg aria-hidden="true" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M63 65l17-33c2-3 5-5 9-5h78c4 0 8 2 9 5l17 33h33c17 0 30 13 30 29v106c0 16-13 29-30 29H30c-17 0-30-13-30-29V94c0-16 13-29 30-29h33zm65 126c27 0 49-22 49-49 0-26-22-48-49-48s-49 22-49 48c0 27 22 49 49 49zm0-20c-16 0-30-13-30-29s14-28 30-28 30 12 30 28-14 29-30 29zm79-48c5 0 10-4 10-9 0-6-5-10-10-10-6 0-10 4-10 10 0 5 4 9 10 9z" fill="#000" fill-rule="nonzero"/></svg>`;
  color = "#16a085";
  stream?: MediaStream;
  gotError = false;

  supports = () => navigator.mediaDevices !== undefined;

  template = () => {
    return `
      CAMERA WILL BE HERE
      <button class="camera-stop">STOP</button>
      <video></video>
    `;
  };

  stop = () => {
    if (this.stream) this.stream.getTracks().forEach(track => track.stop());
  };

  update() {}

  handlers = () => {
    const constraints = { audio: false, video: { width: 1280, height: 720 } };
    window.navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        this.stream = mediaStream;
        console.log("Got stream", mediaStream);
        // var video = document.querySelector('video');
        // video.srcObject = mediaStream;
        // video.onloadedmetadata = function(e) {
        //   video.play();
        // };
      })
      .catch(() => {
        this.gotError = true;
        this.update();
      });
  };
}
