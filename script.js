// Globale Variablen
let autoScrolling = true;      // Gibt an, ob der automatische Bildwechsel läuft
let autoScrollInterval;
let currentIndex = 0;          // Index des gerade sichtbaren Bildes
let images = [];               // Array mit den Bildern

function updateContainerHeight() {
  // Bestimme das aktuell sichtbare Bild
  const currentImg = images[currentIndex];
  if (!currentImg) return;

  const sliderArea = document.getElementById("slider-area");
  const container = document.getElementById("slider-container");
  const controlBar = document.getElementById("control-bar");
  
  // Falls ein Bild noch nicht ganz geladen ist, kann clientHeight = 0 sein
  // Du könntest hier auf naturalHeight zurückgreifen oder 
  // Fall-Back minHeight verwenden
  const minHeight = 300;
  const imageHeight = Math.max(currentImg.clientHeight, minHeight);

  // sliderArea bekommt die Höhe dieses Bildes
  sliderArea.style.height = imageHeight + "px";

  // Container-Höhe = Bildhöhe + Höhe der Steuerleiste
  const totalHeight = imageHeight + controlBar.offsetHeight;
  container.style.height = totalHeight + "px";
  // Optional auch Body-Höhe anpassen
  document.body.style.height = totalHeight + "px";
}

// Zeige das Bild mit dem currentIndex, blende alle anderen aus
function showCurrentImage() {
  images.forEach((img, index) => {
    // Nur das aktuelle Bild anzeigen
    if (index === currentIndex) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });

  // Danach Höhe aktualisieren
  updateContainerHeight();
}

// Wechselt zum nächsten Bild (Zyklus)
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showCurrentImage();
}

// Starte den automatischen Bildwechsel
function autoScrollStart() {
  autoScrolling = true;
  // Z.B. alle 2 Sekunden zum nächsten Bild
  autoScrollInterval = setInterval(nextImage, 2000);

  // Buttons deaktivieren
  document.getElementById("prevOneBtn").disabled = true;
  document.getElementById("prevTwoBtn").disabled = true;
  document.getElementById("nextOneBtn").disabled = true;
  document.getElementById("nextTwoBtn").disabled = true;

  // Icon: Pause
  document.getElementById("playPauseBtn").innerHTML = '<i class="material-icons">pause</i>';
}

// Stoppe den automatischen Bildwechsel
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

// DOM-Content-Loaded
document.addEventListener("DOMContentLoaded", function() {
  // Lade alle Bilder in ein Array
  images = document.querySelectorAll("#slider img");
  
  // Zeige zuerst das 0. Bild
  showCurrentImage();

  // Starte Automatik
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
    // z.B. zwei Bilder zurück
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
    // z.B. zwei Bilder vorwärts
    currentIndex = Math.min(images.length - 1, currentIndex + 5);
    showCurrentImage();
  });

  // Bei Fenstergrößenänderung => Höhe neu berechnen
  window.addEventListener("resize", updateContainerHeight);
});
