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
      gridCSS.innerHTML = ".pixel {box-shadow: 0px 0px;}";
    }
  });
  document.body.appendChild(gridCSS);
}

let mouseButtonPressed = 0;
document.body.onmousedown = function () {
  mouseButtonPressed = 1;
};
document.body.onmouseup = function () {
  mouseButtonPressed = 0;
};

function pixelEventListener(color) {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", () => {
      if (mouseButtonPressed == 1) {
        pixel.setAttribute("style", "background: " + color + ";");
      }
    });
  });
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
    pixelEventListener("#D7DADC");
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
    pixel.setAttribute("style", "background: #D7DADC;");
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
    const gridDimensions = document.querySelector("#gridWrap");
    const containerDimensions = document.querySelector("#canvasContainer");
    const gridSizeSlider = document.querySelector("#gridSizeSlider");
    gridDimensions.setAttribute(
      "style",
      "350px; height: 350px; min-width: 350px"
    );
    containerDimensions.setAttribute("style", "width: 350px; height: 350px");
    gridSizeSlider.setAttribute("max", "350");
    gridSizeSlider.setAttribute("value", "350");
    gridSizeSlider.setAttribute("step", "10");
    createPixelGrid(15, 350);
  } else {
    createPixelGrid(15, 600);
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
colorButton("#colorButton", "#colorPicker");
colorButton("#colorButton2", "#colorPicker2");
colorButton("#colorButton3", "#colorPicker3");
colorButton("#colorButton4", "#colorPicker4");
colorButton("#colorButton5", "#colorPicker5");
colorPickerStyle("colorPicker");
colorPickerStyle("colorPicker2");
colorPickerStyle("colorPicker3");
colorPickerStyle("colorPicker4");
colorPickerStyle("colorPicker5");
eraserButton();
clearAllButton();
