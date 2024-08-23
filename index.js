import fs from "fs";
import jpeg from "jpeg-js";

const FILE_PATH = "FILL ME IN";

const BACKGROUND_COLOR = [41, 49, 62];
const SIMILARITY = 97;
const ERROR = 255 / (100 - SIMILARITY);

const data = fs.readFileSync(FILE_PATH);
const rawImageData = jpeg.decode(data, { useTArray: true });

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

const OUT_DIR = "FILL ME IN";
fs.writeFileSync(OUT_DIR, newImageData.data);
