import { Color } from "../types";
import {
  accumulatedAllLetterFrequency,
  accumulatedFirstLetterFrequency,
} from "./letterFrequencies";

const getColorIndex = (string: string): number => {
  const capitalLetters = string.slice(1).replace(/[^A-Z]+/g, '');
  let colorIndex = accumulatedFirstLetterFrequency[string[0].toLowerCase()] || 0;
  // let previousLetterFrequency = firstLetterFrequency[string[0]];

  for(let i = 0; i<4 && i<capitalLetters.length; i++) {
    colorIndex += accumulatedAllLetterFrequency[capitalLetters[i].toLowerCase()] / Math.pow(10, i+1);
    // previousLetterFrequency = allLetterFrequency[string[i]] / Math.pow(10, i+1);
  }

  return colorIndex;
};

export const nameToColor = (string: string): Color => {
  const columns = 80;
  const rows = 7;
  const colorSpaceSize = columns * rows;
  const colorIndex = getColorIndex(string) * colorSpaceSize;
  const rowSize = colorSpaceSize / rows;

  return {
    l: (colorIndex / rowSize * 10) + 30,
    hue: (colorIndex % rowSize) * (360 / columns)
  }
};
