import { MedianObject, MeanObject, ModeObject } from "./../types";

export default {
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
  getMode: (a: number[], length: number): ModeObject[] => {
    let modes: ModeObject[] = [];
    for (let i = 0; i < a.length; i++) {
      let mode = modes.find((item) => item.value === a[i]);
      if (!mode) {
        modes.push({ value: a[i], count: 1 });
      } else {
        modes = modes.map((item, index) => {
          if (item.value === mode?.value) {
            item = { value: mode.value, count: mode.count + 1 };
            return item;
          }
          return item;
        });
      }
      // console.log(modes);
    }
    modes = modes.sort((a, b) => b.count - a.count);
    if (length < modes.length) modes.length = length;
    return modes;
  },
  getMedian: (a: number[]): MedianObject => {
    return {
      sum: a.reduce((partialSum, sum) => partialSum + sum, 0),
      length: a.length,
      median: a.reduce((partialSum, sum) => partialSum + sum, 0) / a.length,
    };
  },
};
