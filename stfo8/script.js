// Keep track of which side & slot we're currently assigning an image to
let currentSide = null;
let currentSlot = null;

// Arrays to store the chosen images for each side
// Each item is an object: { src: "imgX.png", value: number }
let youImages = [null, null, null, null];
let themImages = [null, null, null, null];

/**
 * When a "+" button is clicked, open the image selector.
 * side = "you" or "them"
 * slot = 0, 1, 2, or 3
 */
function openImageSelector(side, slot) {
  currentSide = side;
  currentSlot = slot;
  document.getElementById("imageSelector").style.display = "block";
}

/**
 * When an image is clicked in the selector, assign it to the current side/slot,
 * then hide the selector and update the page.
 */
function selectImage(imageSrc, value) {
  // Hide the popup
  document.getElementById("imageSelector").style.display = "none";

  if (currentSide === "you") {
    youImages[currentSlot] = { src: imageSrc, value: value };
    updateSlot("youSide", currentSlot, imageSrc);
  } else {
    themImages[currentSlot] = { src: imageSrc, value: value };
    updateSlot("themSide", currentSlot, imageSrc);
  }

  // Recalculate after each selection
  calculateResult();
}

/**
 * Replaces the content of a slot (the button) with the chosen image.
 */
function updateSlot(sideId, slotIndex, imageSrc) {
  const sideElement = document.getElementById(sideId);
  const slotElements = sideElement.getElementsByClassName("slot");
  const slot = slotElements[slotIndex];
  // Put an <img> in place of the button
  slot.innerHTML = `<img src="images/${imageSrc}" alt="Selected Image">`;
}

/**
 * Calculate total value on each side, then set resultBar text:
 * - LOSE if YOU > THEM
 * - WIN if THEM > YOU
 * - FAIR if equal
 */
function calculateResult() {
  let youTotal = youImages.reduce((sum, item) => {
    return item ? sum + item.value : sum;
  }, 0);

  let themTotal = themImages.reduce((sum, item) => {
    return item ? sum + item.value : sum;
  }, 0);

  const resultBar = document.getElementById("resultBar");

  if (youTotal > themTotal) {
    resultBar.textContent = "LOSE";
  } else if (youTotal < themTotal) {
    resultBar.textContent = "WIN";
  } else {
    resultBar.textContent = "FAIR";
  }
}
