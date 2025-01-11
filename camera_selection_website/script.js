// Last updated: 2025-01-11 20:44:36

const videoElement = document.getElementById("video");
const cameraSelect = document.getElementById("cameraSelect");
const startCameraButton = document.getElementById("startCamera");
const capturePhotoButton = document.getElementById("capturePhoto");
const discardPhotoButton = document.getElementById("discardPhoto");
const photoCanvas = document.getElementById("photoCanvas");

// Funktion, um verfügbare Kameras aufzulisten
async function listCameras() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Kamera aktivieren, um Zugriff zu erlauben
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === "videoinput");

    cameraSelect.innerHTML = ""; // Vorherige Optionen entfernen
    videoDevices.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || `Kamera ${index + 1}`;
      cameraSelect.appendChild(option);
    });

    // Standardkamera anzeigen
    if (videoDevices.length > 0) {
      activateCamera(videoDevices[0].deviceId);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Kameras:", error);
    alert("Kamera konnte nicht erkannt werden. Bitte überprüfen Sie die Berechtigungen.");
  }
}

// Funktion, um eine ausgewählte Kamera zu aktivieren
async function activateCamera(deviceId) {
  try {
    const constraints = deviceId
      ? { video: { deviceId: { exact: deviceId } } }
      : { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.style.display = "block"; // Video sichtbar machen
    capturePhotoButton.style.display = "inline"; // Foto-Button sichtbar machen
    discardPhotoButton.style.display = "none"; // Verwerfen-Button ausblenden
    photoCanvas.style.display = "none"; // Canvas verstecken
  } catch (error) {
    console.error("Kamera konnte nicht aktiviert werden:", error);
    alert("Fehler beim Aktivieren der Kamera.");
  }
}

// Funktion, um ein Foto zu machen
function capturePhoto() {
  const context = photoCanvas.getContext("2d");
  photoCanvas.width = videoElement.videoWidth;
  photoCanvas.height = videoElement.videoHeight;
  photoCanvas.style.width = videoElement.style.width;
  photoCanvas.style.height = videoElement.style.height;
  context.drawImage(videoElement, 0, 0, photoCanvas.width, photoCanvas.height);
  photoCanvas.style.display = "block"; // Canvas sichtbar machen
  videoElement.style.display = "none"; // Video verstecken
  discardPhotoButton.style.display = "inline"; // Verwerfen-Button sichtbar machen
}

// Funktion, um das Foto zu verwerfen
function discardPhoto() {
  photoCanvas.style.display = "none"; // Canvas verstecken
  videoElement.style.display = "block"; // Video sichtbar machen
  discardPhotoButton.style.display = "none"; // Verwerfen-Button ausblenden
}

// Ereignislistener für den Kamera-Start-Button
startCameraButton.addEventListener("click", () => {
  const selectedCameraId = cameraSelect.value;
  activateCamera(selectedCameraId);
});

// Ereignislistener für den Foto-Button
capturePhotoButton.addEventListener("click", capturePhoto);

// Ereignislistener für den Foto-Verwerfen-Button
discardPhotoButton.addEventListener("click", discardPhoto);

// Kameras initial laden
listCameras();
