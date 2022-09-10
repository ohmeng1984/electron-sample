const video = document.getElementById("camera");
const captureButton = document.getElementById("capture-image");
const imageTag = document.getElementById("image");

captureButton.addEventListener ("click", () => {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataURL = canvas.toDataURL();
    // imageTag.src = dataURL;
    window.electronAPI.sendImage(dataURL);

    new Notification("Image Captured", {
      body: "Image is successfully capture from video."
    });
  });


navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
    video.srcObject = stream;
});

