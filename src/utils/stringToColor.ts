const aCharCode = 'a'.charCodeAt(0);
const nLetters = 'z'.charCodeAt(0) - aCharCode + 1;

const getColorIndex = (string: string) => {
  const lowerCaseString = string.toLowerCase();

  const firstLetterIndex = ((lowerCaseString.charCodeAt(0) - aCharCode) * nLetters) | 0;
  const secondLetterIndex = (lowerCaseString.charCodeAt(1) - aCharCode) | 0;

  return firstLetterIndex + secondLetterIndex;
};

export const nameToColor = (string: string) => {
  const colorIndex = getColorIndex(string);
  const colorSpaceSize = nLetters * nLetters;
  const rowSize = colorSpaceSize / 7;

  return {
    l: (colorIndex / rowSize / 10) + 0.3,
    hue: colorIndex % rowSize
  }
};
