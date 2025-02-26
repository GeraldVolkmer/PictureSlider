// Globale Variablen
let autoScrolling = true;    // ob der automatische Bildwechsel läuft
let autoScrollInterval;
let currentIndex = 0;        // Index des aktuell sichtbaren Bildes
let images = [];

function updateContainerHeight() {
  // Ermitteln wir das aktuell "aktive" Bild
  const currentImg = images[currentIndex];
  if (!currentImg) return;

  const sliderArea = document.getElementById("slider-area");
  const container = document.getElementById("slider-container");
  const controlBar = document.getElementById("control-bar");
  
  // Sicherheitshalber: Falls Bild noch nicht geladen => minHeight
  const minHeight = 300;
  const imageHeight = Math.max(currentImg.clientHeight, minHeight);

  // #slider-area bekommt die Höhe des aktuellen Bildes
  sliderArea.style.height = imageHeight + "px";

  // Gesamthöhe = Bildhöhe + Steuerleiste
  const totalHeight = imageHeight + controlBar.offsetHeight;
  container.style.height = totalHeight + "px";
  document.body.style.height = totalHeight + "px"; 
}

// Blendet nur das Bild mit currentIndex "sichtbar" (active) ein, alle anderen aus
function showCurrentImage() {
  images.forEach((img, index) => {
    if (index === currentIndex) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
  // Höhe anpassen
  updateContainerHeight();
}

// Wechselt zum nächsten Bild (mit Wrap-Around)
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showCurrentImage();
}

// Startet den automatischen Bildwechsel
function autoScrollStart() {
  autoScrolling = true;
  // z.B. alle 2 Sekunden
  autoScrollInterval = setInterval(nextImage, 2500);

  // Buttons deaktivieren
  document.getElementById("prevOneBtn").disabled = true;
  document.getElementById("prevTwoBtn").disabled = true;
  document.getElementById("nextOneBtn").disabled = true;
  document.getElementById("nextTwoBtn").disabled = true;

  // Icon: Pause
  document.getElementById("playPauseBtn").innerHTML = '<i class="material-icons">pause</i>';
}

// Stoppt den automatischen Bildwechsel
function autoScrollStop() {
  autoScrolling = false;
  clearInterval(autoScrollInterval);

  // Buttons aktivieren
  document.getElementById("prevOneBtn").disabled = false;
  document.getElementById("prevTwoBtn").disabled = false;
  document.getElementById("nextOneBtn").disabled = false;
  document.getElementById("nextTwoBtn").disabled = false;

  // Icon: Play
  document.getElementById("playPauseBtn").innerHTML = '<i class="material-icons">play_arrow</i>';
}

// DOMContentLoaded => Initialisieren
document.addEventListener("DOMContentLoaded", function() {
  // Alle Bilder sammeln
  images = document.querySelectorAll("#slider img");

  if (images.length === 0) return;

  // Zeige zuerst das 0. Bild
  showCurrentImage();

  // Starte Automodus
  autoScrollStart();

  // Play/Pause-Toggle
  document.getElementById("playPauseBtn").addEventListener("click", function() {
    if (autoScrolling) {
      autoScrollStop();
    } else {
      autoScrollStart();
    }
  });

  // Navigation: Ein Bild zurück
  document.getElementById("prevOneBtn").addEventListener("click", function() {
    if (currentIndex > 0) {
      currentIndex--;
      showCurrentImage();
    }
  });

  // Navigation: Zwei Bilder zurück
  document.getElementById("prevTwoBtn").addEventListener("click", function() {
    currentIndex = Math.max(0, currentIndex - 5);
    showCurrentImage();
  });

  // Navigation: Ein Bild vorwärts
  document.getElementById("nextOneBtn").addEventListener("click", function() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      showCurrentImage();
    }
  });

  // Navigation: Zwei Bilder vorwärts
  document.getElementById("nextTwoBtn").addEventListener("click", function() {
    currentIndex = Math.min(images.length - 1, currentIndex + 5);
    showCurrentImage();
  });

  // Auf Fenstergröße reagieren
  window.addEventListener("resize", updateContainerHeight);
});
