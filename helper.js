const randomInt = (min, max) => {
  if (min > max) throw new Error('min greater than max');
  const varianceRange = (max - min) + 1;
  const randomInRange = Math.floor(Math.random() * varianceRange);
  const zeroOffset = 0 - min;
  return randomInRange - zeroOffset;
};

const getTextWidth = (text, font, canvas) => {
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
};

const getNextMultipleTwo = (num) => {
  let multiple = 2;
  while (multiple < num) {
    multiple *= 2;
  }
  return multiple;
};

const createTextCanvas = (text, color) => {
  const padding = 20;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const textWidth = getTextWidth(text, '50px sans-serif', canvas);
  canvas.width = getNextMultipleTwo(textWidth + padding);
  canvas.height = 64;

  const emptyWidth = canvas.width - textWidth - padding;
  context.fillStyle = color;
  context.fillRect(emptyWidth / 2, 0, textWidth + padding, canvas.height);

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = 'white';
  context.font = '50px sans-serif';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas;
};

export default {
  randomInt,
  createTextCanvas,
};
