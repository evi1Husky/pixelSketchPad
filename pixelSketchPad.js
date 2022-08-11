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
    pixelEventListener(getCurrentColorCode("#colorPicker"));
    return;
  }
  return createPixelGrid(pixelSize - 1, gridWidth);
}

function pixelEventListener(color) {
  const pixels = document.querySelectorAll(".pixel");
  let mouseButtonPressed = false;
  document.body.onmousedown = function () {
    mouseButtonPressed = true;
  };
  document.body.onmouseup = function () {
    mouseButtonPressed = false;
  };
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", () => {
      if (mouseButtonPressed) {
        pixel.setAttribute("style", "background: " + color + ";");
      }
    });
  });
  pixels.forEach((pixel) => {
    pixel.addEventListener("mousedown", () => {
      pixel.setAttribute("style", "background: " + color + ";");
    });
  });
}

function clearPixelGrid() {
  const pixels = document.getElementsByClassName("pixel");
  while (pixels[0]) {
    pixels[0].parentNode.removeChild(pixels[0]);
  }
}

function gridSliderEventListener() {
  const gridSizeSlider = document.querySelector("#gridSizeSlider");
  document.querySelector("#pixelGridSlider").addEventListener("input", (e) => {
    createPixelGrid(e.target.value, gridSizeSlider.value);
  });
}

function gridToggleBox() {
  const gridCheckbox = document.querySelector("#flexCheckChecked");
  const gridCSS = document.createElement("style");
  gridCheckbox.addEventListener("change", function () {
    if (gridCheckbox.checked) {
      gridCSS.innerHTML = ".pixel {box-shadow: 0px 0px 0px 0.1px;}";
    } else {
      gridCSS.innerHTML = ".pixel {box-shadow: 0px 0px 0px 0px;}";
    }
  });
  document.body.appendChild(gridCSS);
}

function colorPicker(colorPickerNum) {
  const colorPicker = document.querySelector(colorPickerNum);
  colorPicker.addEventListener("input", () => {
    pixelEventListener(colorPicker.value);
  });
}

function colorButton(colorButtonNum, colorPickerNum) {
  const colorButton = document.querySelector(colorButtonNum);
  colorButton.addEventListener("click", () => {
    pixelEventListener(getCurrentColorCode(colorPickerNum));
  });
}

function getCurrentColorCode(colorPickerNum) {
  const colorPicker = document.querySelector(colorPickerNum);
  return colorPicker.value;
}

function eraserButton() {
  const eraserButton = document.querySelector("#eraserButton");
  eraserButton.addEventListener("click", () => {
    pixelEventListener("#c8cbcd");
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
    pixel.setAttribute("style", "background: #c8cbcd;");
  });
}

function gridSizeSlider() {
  const gridSizeSlider = document.querySelector("#gridSizeSlider");
  const makeNewGrid = () => NewGridSize(gridSizeSlider.value);
  gridSizeSlider.addEventListener("input", makeNewGrid);
}

function NewGridSize(width) {
  clearPixelGrid();
  const gridDimensions = document.querySelector("#gridWrap");
  gridDimensions.setAttribute(
    "style",
    "width: " +
      width +
      "px" +
      "; " +
      "height: " +
      width +
      "px" +
      "; " +
      "min-width: " +
      width +
      "px" +
      ";"
  );
  const pixelSize = document.querySelector("#pixelGridSlider");
  createPixelGrid(pixelSize.value, width);
}

function colorPickerStyle(colorPickerNum) {
  let colorPicker = document.getElementById(colorPickerNum);
  colorPicker.addEventListener("input", () => {
    colorPicker.style.setProperty("--color", colorPicker.value);
  });
}

function getBrowserWidth() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return width;
}

function appAdjustForMobile(browserWidth) {
  if (browserWidth <= 600) {
    const grid = document.querySelector("#gridWrap");
    const container = document.querySelector("#canvasContainer");
    const gridSizeSlider = document.querySelector("#gridSizeSlider");
    grid.setAttribute("style", "width: 360px; height: 360px; min-width: 360px");
    container.setAttribute("style", "width: 360px; height: 360px");
    gridSizeSlider.setAttribute("max", "360");
    gridSizeSlider.setAttribute("value", "360");
    gridSizeSlider.setAttribute("step", "10");
    createPixelGrid(15, 360);
  } else {
    createPixelGrid(15, 540);
  }
}

appAdjustForMobile(getBrowserWidth());
gridSizeSlider();
gridSliderEventListener();
gridToggleBox();
pixelEventListener(getCurrentColorCode("#colorPicker"));
colorPicker("#colorPicker");
colorPicker("#colorPicker2");
colorPicker("#colorPicker3");
colorPicker("#colorPicker4");
colorPicker("#colorPicker5");
colorPicker("#colorPicker6");
colorButton("#colorButton", "#colorPicker");
colorButton("#colorButton2", "#colorPicker2");
colorButton("#colorButton3", "#colorPicker3");
colorButton("#colorButton4", "#colorPicker4");
colorButton("#colorButton5", "#colorPicker5");
colorButton("#colorButton6", "#colorPicker6");
colorPickerStyle("colorPicker");
colorPickerStyle("colorPicker2");
colorPickerStyle("colorPicker3");
colorPickerStyle("colorPicker4");
colorPickerStyle("colorPicker5");
colorPickerStyle("colorPicker6");
eraserButton();
clearAllButton();
