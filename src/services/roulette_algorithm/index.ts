import { MedianObject, MeanObject, ModeObject } from "./types";
const centralTendencyNumbers = {
  getMean: (a: number[]): MeanObject => {
    if (a.length % 2 === 0) {
      return {
        mean: [a[a.length / 2 - 1], a[a.length / 2]],
        length: a.length,
      };
    }
    return {
      mean: [a[(a.length + 1) / 2 - 1]],
      length: a.length,
    };
  },
  getMode: (a: number[], length: number): ModeObject => {
    let mode = 0;
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      let suma;
      for (let j = 0; j < a.length; j++) {}
    }
    return {
      count: a.length,
      mode: 3,
    };
  },
  getMedian: (a: number[]): MedianObject => {
    return {
      sum: a.reduce((partialSum, sum) => partialSum + sum, 0),
      length: a.length,
      median: a.reduce((partialSum, sum) => partialSum + sum, 0) / a.length,
    };
  },
};

const rouletteAlgorithm = {
  centralTendencyNumbers,
};

// export default rouletteAlgorithm;

rouletteAlgorithm.centralTendencyNumbers.getMedian([3, 4, 6]);
let median = rouletteAlgorithm.centralTendencyNumbers.getMedian([
  1, 2, 3, 4, 5, 6, 7, 8, 9,
]);
let mean = rouletteAlgorithm.centralTendencyNumbers.getMean([
  1, 2, 3, 4, 20, 30, 7, 8, 9, 10,
]);

let mean1 = rouletteAlgorithm.centralTendencyNumbers.getMean([
  1, 2, 3, 4, 20, 6, 7, 8, 9,
]);

console.log(median);
console.log(mean);
console.log(mean1);
