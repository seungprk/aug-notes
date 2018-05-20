const helper = {
  randomInt: (min, max) => {
    if (min > max) throw new Error('min greater than max');
    const varianceRange = (max - min) + 1;
    const randomInRange = Math.floor(Math.random() * varianceRange);
    const zeroOffset = 0 - min;
    return randomInRange - zeroOffset;
  },
};

export default helper;
