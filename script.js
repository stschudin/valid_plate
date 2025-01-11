
// Last updated: 2025-01-11 14:30:00
const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("canvas");
const context = canvasElement.getContext("2d");

// Funktion zum Initialisieren der Kamera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoElement.srcObject = stream;
    videoElement.play();
  })
  .catch(error => {
    console.error("Kamerazugriff verweigert:", error);
  });

// Funktion, um ein Foto aufzunehmen
function capturePhoto() {
  // Setze Canvas-Größe auf die Video-Größe
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  // Zeichne das aktuelle Video-Frame auf das Canvas
  context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  // Mache das Canvas sichtbar
  canvasElement.style.display = "block";

  // Skaliere das Canvas dynamisch in der Breite des Bildschirms
  const screenWidth = window.innerWidth * 0.9; // 90% der Bildschirmbreite
  const scale = screenWidth / canvasElement.width;

  canvasElement.style.width = `${screenWidth}px`;
  canvasElement.style.height = `${canvasElement.height * scale}px`;
}

// Testbutton zum Foto-Machen (optional)
document.body.addEventListener("click", capturePhoto);
