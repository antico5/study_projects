const BIT_LENGTH = 31; // because there are no unsigned integers in JS

// const seed = (1 << (BIT_LENGTH - 1)) | 1; // 10000...00001
const seed = new Date().getTime();

const combinator = (state: number): number => {
  return (state ^ (state >>> 1) ^ (state >>> 2) ^ (state >>> 7)) & 1; // XOR B0, B1, B2 and B7
};

function dec2bin(dec: number): string {
  return (dec >>> 0).toString(2);
}

let state = seed;

const tally = {};
const distances = {};
const modulus = 10;

let lastRandomNumber = 0;

while (true) {
  let randomNumber = 0;
  for (let i = 0; i < BIT_LENGTH; i++) {
    state = (state >>> 1) | (combinator(state) << (BIT_LENGTH - 1));
    const randomBit = state & 1;
    randomNumber <<= 1;
    randomNumber |= randomBit;
  }
  randomNumber %= modulus;

  const distance = randomNumber - lastRandomNumber;
  distances[distance] = (distances[distance] || 0) + 1;
  lastRandomNumber = randomNumber;

  tally[randomNumber] = (tally[randomNumber] || 0) + 1;
  if (state % 100000 == 0) {
    console.log({ tally, distances });
  }
}
