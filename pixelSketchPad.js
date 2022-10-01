function findNumberOfPixels(pixelSize, gridWidth) {
  const numOfPixelsRow = gridWidth / pixelSize;
  const numOfPixels = numOfPixelsRow * numOfPixelsRow;
  if (numOfPixels % numOfPixelsRow === 0) {
    return numOfPixels;
  }
  return findNumberOfPixels(pixelSize, gridWidth - 1);
}

function createPixelGrid(pixelSize, gridWidth) {
  const numOfPixels = findNumberOfPixels(pixelSize, gridWidth);
  clearPixelGrid();
  const pixelSizeString = `${pixelSize}px`;
  const grid = document.getElementById('pixelGrid');
  grid.setAttribute(
    'style',
    `grid-template-columns: repeat(auto-fill, minmax(${pixelSizeString}, 1fr))`
  );
  for (let i = 0; i < numOfPixels; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    grid.appendChild(pixel);
  }
  pixelEventListener(getCurrentColorCode('#colorPicker'));
}

function pixelEventListener(color) {
  const pixels = document.querySelectorAll('.pixel');
  let mouseButtonPressed = false;
  document.body.onmousedown = function () {
    mouseButtonPressed = true;
  };
  document.body.onmouseup = function () {
    mouseButtonPressed = false;
  };
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', () => {
      if (mouseButtonPressed) {
        pixel.setAttribute('style', `background: ${color};`);
      }
    });
  });
  pixels.forEach((pixel) => {
    pixel.addEventListener('mousedown', () => {
      pixel.setAttribute('style', `background: ${color};`);
    });
  });
}

function clearPixelGrid() {
  const pixels = document.getElementsByClassName('pixel');
  while (pixels[0]) {
    pixels[0].parentNode.removeChild(pixels[0]);
  }
}

function gridSliderEventListener() {
  const gridSizeSlider = document.querySelector('#gridSizeSlider');
  document.querySelector('#pixelGridSlider').addEventListener('input', (e) => {
    createPixelGrid(e.target.value, gridSizeSlider.value);
  });
}

function gridToggleBox() {
  const gridCheckbox = document.querySelector('#flexCheckChecked');
  const gridCSS = document.createElement('style');
  gridCheckbox.addEventListener('change', function () {
    if (gridCheckbox.checked) {
      gridCSS.innerHTML = '.pixel {box-shadow: 0px 0px 0px 0.1px;}';
    } else {
      gridCSS.innerHTML = '.pixel {box-shadow: 0px 0px;}';
    }
  });
  document.body.appendChild(gridCSS);
}

function colorPicker(colorPickerNum) {
  const colorPicker = document.querySelector(colorPickerNum);
  colorPicker.addEventListener('input', () => {
    pixelEventListener(colorPicker.value);
  });
}

function colorButton(colorButtonNum, colorPickerNum) {
  const colorButton = document.querySelector(colorButtonNum);
  colorButton.addEventListener('click', () => {
    pixelEventListener(getCurrentColorCode(colorPickerNum));
  });
}

function getCurrentColorCode(colorPickerNum) {
  const colorPicker = document.querySelector(colorPickerNum);
  return colorPicker.value;
}

function eraserButton() {
  const eraserButton = document.querySelector('#eraserButton');
  eraserButton.addEventListener('click', () => {
    pixelEventListener('#c8cbcd');
  });
}

function clearAllButton() {
  const clearAllButton = document.querySelector('#clearAllButton');
  clearAllButton.addEventListener('click', () => {
    pixelClear();
  });
}

function pixelClear() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.setAttribute('style', 'background: #c8cbcd;');
  });
}

function gridSizeSlider() {
  const gridSizeSlider = document.querySelector('#gridSizeSlider');
  const makeNewGrid = () => NewGridSize(gridSizeSlider.value);
  gridSizeSlider.addEventListener('input', makeNewGrid);
}

function NewGridSize(width) {
  clearPixelGrid();
  const gridDimensions = document.querySelector('#gridWrap');
  gridDimensions.setAttribute(
    'style',
    `width: ${width}px; height: ${width}px; min-width: ${width}px;`
  );
  const pixelSize = document.querySelector('#pixelGridSlider');
  createPixelGrid(pixelSize.value, width);
}

function colorPickerStyle(colorPickerNum) {
  const colorPicker = document.getElementById(colorPickerNum);
  colorPicker.addEventListener('input', () => {
    colorPicker.style.setProperty('--color', colorPicker.value);
  });
}

function randomHexGenerator() {
  const symbolArray = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E','F',
  ];
  const hexArray = ['#'];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * symbolArray.length);
    const randomSymbol = symbolArray[randomIndex];
    hexArray.push(randomSymbol);
  }
  return hexArray.join('');
}

function pixelEventListenerRandomHex() {
  const pixels = document.querySelectorAll('.pixel');
  let mouseButtonPressed = false;
  document.body.onmousedown = function () {
    mouseButtonPressed = true;
  };
  document.body.onmouseup = function () {
    mouseButtonPressed = false;
  };
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', () => {
      if (mouseButtonPressed) {
        pixel.setAttribute('style', `background: ${randomHexGenerator()};`);
      }
    });
  });
  pixels.forEach((pixel) => {
    pixel.addEventListener('mousedown', () => {
      pixel.setAttribute('style', `background: ${randomHexGenerator()};`);
    });
  });
}

function randomButton() {
  const randomButton = document.querySelector('#randomButton');
  randomButton.addEventListener('click', () => {
    pixelEventListenerRandomHex();
  });
}

function adjustForMobileBrowsers() {
  if (window.innerWidth < 450) {
    const gridSizeSlider = document.getElementById('gridSizeSlider');
    const gridWrap = document.getElementById('gridWrap');
    createPixelGrid(15, 360);
    gridSizeSlider.setAttribute('value', '360');
    gridSizeSlider.setAttribute('max', '360');
    gridWrap.setAttribute('style', 'width: 360px', 'height: 360px', 'min-width: 360px')
  } else {
    createPixelGrid(15, 460);
  }
}

adjustForMobileBrowsers()
gridSizeSlider();
gridSliderEventListener();
gridToggleBox();
pixelEventListener(getCurrentColorCode('#colorPicker'));
colorPicker('#colorPicker');
colorPicker('#colorPicker2');
colorPicker('#colorPicker3');
colorPicker('#colorPicker4');
colorPicker('#colorPicker5');
colorPicker('#colorPicker6');
colorButton('#colorButton', '#colorPicker');
colorButton('#colorButton2', '#colorPicker2');
colorButton('#colorButton3', '#colorPicker3');
colorButton('#colorButton4', '#colorPicker4');
colorButton('#colorButton5', '#colorPicker5');
colorButton('#colorButton6', '#colorPicker6');
colorPickerStyle('colorPicker');
colorPickerStyle('colorPicker2');
colorPickerStyle('colorPicker3');
colorPickerStyle('colorPicker4');
colorPickerStyle('colorPicker5');
colorPickerStyle('colorPicker6');
eraserButton();
clearAllButton();
randomButton();
