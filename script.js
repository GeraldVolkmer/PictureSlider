// Globale Variablen
let autoScrolling = true;
let autoScrollInterval;
let currentIndex = 0;
let images;

// Passt die Höhe des Bildbereichs an (Mindesthöhe z. B. 300px) und passt den Container an
function updateContainerHeight() {
  const firstImage = document.querySelector("#slider img");
  const sliderArea = document.getElementById("slider-area");
  const container = document.getElementById("slider-container");
  const controlBar = document.getElementById("control-bar");
  const minHeight = 300;
  const imageHeight = Math.max(firstImage.clientHeight, minHeight);
  
  // Slider-Bereich erhält die Bildhöhe
  sliderArea.style.height = imageHeight + "px";
  // Gesamtcontainer-Höhe = Bildhöhe + Höhe der Steuerleiste
  const totalHeight = imageHeight + controlBar.offsetHeight;
  container.style.height = totalHeight + "px";
  document.body.style.height = totalHeight + "px";
}

// Scrollt sanft zum Bild, das dem currentIndex entspricht
function scrollToCurrentImage() {
  images[currentIndex].scrollIntoView({ behavior: "smooth" });
}

// Wechselt automatisch zum nächsten Bild (Auto-Modus)
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  scrollToCurrentImage();
}

// Startet den Auto-Scroll-Modus
function autoScrollStart() {
  autoScrolling = true;
  autoScrollInterval = setInterval(nextImage, 2000); // alle 10 Sekunden
  // Navigationsbuttons deaktivieren
  document.getElementById("prevOneBtn").disabled = true;
  document.getElementById("prevTwoBtn").disabled = true;
  document.getElementById("nextOneBtn").disabled = true;
  document.getElementById("nextTwoBtn").disabled = true;
  // Manuelles Scrollen (z. B. per Mausrad) deaktivieren
  document.getElementById("slider").style.overflowY = "hidden";
  // Setze den Play/Pause-Button auf das Pause-Icon (Material Icon)
  document.getElementById("playPauseBtn").innerHTML = '<i class="material-icons">pause</i>';
}

// Stoppt den Auto-Scroll-Modus und ermöglicht Navigation über Buttons
function autoScrollStop() {
  autoScrolling = false;
  clearInterval(autoScrollInterval);
  // Navigationsbuttons aktivieren
  document.getElementById("prevOneBtn").disabled = false;
  document.getElementById("prevTwoBtn").disabled = false;
  document.getElementById("nextOneBtn").disabled = false;
  document.getElementById("nextTwoBtn").disabled = false;
  // Manuelles Scrollen (Mausrad) weiterhin deaktivieren – Navigation läuft nur über Buttons
  document.getElementById("slider").style.overflowY = "hidden";
  // Setze den Play/Pause-Button auf das Play-Icon (Material Icon)
  document.getElementById("playPauseBtn").innerHTML = '<i class="material-icons">play_arrow</i>';
}

document.addEventListener("DOMContentLoaded", function() {
  updateContainerHeight();
  images = document.querySelectorAll("#slider img");

  // Starte im Auto-Modus
  autoScrollStart();

  // Play/Pause-Toggle
  document.getElementById("playPauseBtn").addEventListener("click", function() {
    if (autoScrolling) {
      autoScrollStop();
    } else {
      // Beim erneuten Start wird die Animation an der aktuellen Position fortgesetzt
      autoScrollStart();
    }
  });

  // Navigation: Ein Bild zurück
  document.getElementById("prevOneBtn").addEventListener("click", function() {
    if (currentIndex > 0) {
      currentIndex -= 1;
      scrollToCurrentImage();
    }
  });

  // Navigation: Zwei Bilder zurück
  document.getElementById("prevTwoBtn").addEventListener("click", function() {
    currentIndex = Math.max(0, currentIndex - 5);
    scrollToCurrentImage();
  });

  // Navigation: Ein Bild vorwärts
  document.getElementById("nextOneBtn").addEventListener("click", function() {
    if (currentIndex < images.length - 1) {
      currentIndex += 1;
      scrollToCurrentImage();
    }
  });

  // Navigation: Zwei Bilder vorwärts
  document.getElementById("nextTwoBtn").addEventListener("click", function() {
    currentIndex = Math.min(images.length - 1, currentIndex + 5);
    scrollToCurrentImage();
  });

  // Deaktiviere das Scrollen per Mausrad im Bildbereich
  document.getElementById("slider").addEventListener("wheel", function(e) {
    e.preventDefault();
  });

  window.addEventListener("resize", updateContainerHeight);
});
