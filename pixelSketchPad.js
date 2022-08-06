function createPixelGrid(pixelSize, gridWidth) {
  pixelSize = Math.round(pixelSize);
  let numPixels = gridWidth / pixelSize;
  numPixels *= numPixels;
  if (numPixels % 2 == 0) {
    clearPixelGrid();
    const pixelSizeString = pixelSize + "px";
    const grid = document.getElementById("pixelGrid");
    grid.setAttribute(
      "style",
      "grid-template-columns: repeat(auto-fill, minmax(" +
        pixelSizeString +
        ", 1fr))"
    );
    for (let i = 0; i < numPixels; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      grid.appendChild(pixel);
    }
    pixelEventListener(getCurrentColorCode());
    return;
  }
  return createPixelGrid(pixelSize - 1, gridWidth);
}

function clearPixelGrid() {
  const pixels = document.getElementsByClassName("pixel");
  while (pixels[0]) {
    pixels[0].parentNode.removeChild(pixels[0]);
  }
}

function gridSliderEventListener() {
  document.querySelector("#pixelGridSlider").addEventListener("input", (e) => {
    createPixelGrid(e.target.value, 600);
  });
}

function gridToggleBox() {
  const gridCheckbox = document.querySelector("#toggleGridCheckbox");
  const gridCSS = document.createElement("style");
  gridCheckbox.addEventListener("change", function () {
    if (gridCheckbox.checked) {
      gridCSS.innerHTML = ".pixel {box-shadow: 0px 0px 0px 0.1px black inset;}";
    } else {
      gridCSS.innerHTML = ".pixel {box-shadow: 0px 0px 0px 0.0px black inset;}";
    }
  });
  document.body.appendChild(gridCSS);
}

let buttonPressed = 0;
document.body.onmousedown = function () {
  buttonPressed = 1;
};
document.body.onmouseup = function () {
  buttonPressed = 0;
};

function pixelEventListener(color) {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", () => {
      if (buttonPressed == 1) {
        pixel.setAttribute("style", "background: " + color + ";");
      }
    });
  });
}

function colorPicker() {
  const colorPicker = document.querySelector("#colorPicker");
  colorPicker.addEventListener("input", () => {
    pixelEventListener(colorPicker.value);
  });
}

function getCurrentColorCode() {
  const colorPicker = document.querySelector("#colorPicker");
  return colorPicker.value;
}

function eraserButton() {
  const eraserButton = document.querySelector("#eraserButton");
  eraserButton.addEventListener("click", () => {
    pixelEventListener("white");
  });
}

function clearAllButton() {
  const clearAllButton = document.querySelector("#clearAllButton");
  clearAllButton.addEventListener("click", () => {
    pixelClear();
  });
}

function pixelClear() {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.setAttribute("style", "background: white;");
  });
}

createPixelGrid(15, 600);
gridSliderEventListener();
gridToggleBox();
pixelEventListener(getCurrentColorCode());
colorPicker();
eraserButton();
clearAllButton();