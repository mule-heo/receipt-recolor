import fs from "fs";
import jpeg from "jpeg-js";

const FILE_PATH = "./images/example.jpg";

const BACKGROUND_COLOR = [41, 49, 62];
const SIMILARITY = 65;
const ERROR = 255 * (100 - SIMILARITY) / 100;

const data = fs.readFileSync(FILE_PATH);
const rawImageData = jpeg.decode(data, { useTArray: true });

/**
 * 
 * convert background color to white - rgb(255, 255, 255)
 * 
 * convert none background color to black - rgb(0, 0, 0)
 * 
 * @param {*} imageData 
 */
function changeColor(imageData) {
  for (let i = 0; i < imageData.data.length; i += 4) {
    let isBackground = true;

    for (let j = 0; j < 3; j++) {
      if (Math.abs(imageData.data[i + j] - BACKGROUND_COLOR[j]) > ERROR)
        isBackground = false;
    }
    if (isBackground) {
      imageData.data[i] = 255;
      imageData.data[i + 1] = 255;
      imageData.data[i + 2] = 255;
    } else {
      imageData.data[i] = 0;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
    }
  }
}

changeColor(rawImageData);

const newImageData = jpeg.encode(rawImageData, 90);

const OUT_DIR = "./images/example-output.jpg";
fs.writeFileSync(OUT_DIR, newImageData.data);
