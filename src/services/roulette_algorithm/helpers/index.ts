import { RouletteNumberI } from "../types";
import centralTendency from "./centralTendency";
export const rouletteNumbers: RouletteNumberI[] = [
  { id: 0, value: 0, color: "green" },
  { id: 1, value: 32, color: "red" },
  { id: 2, value: 15, color: "black" },
  { id: 3, value: 19, color: "red" },
  { id: 4, value: 4, color: "black" },
  { id: 5, value: 21, color: "red" },
  { id: 6, value: 2, color: "black" },
  { id: 7, value: 25, color: "red" },
  { id: 8, value: 17, color: "black" },
  { id: 9, value: 34, color: "red" },
  { id: 10, value: 6, color: "black" },
  { id: 11, value: 27, color: "red" },
  { id: 12, value: 13, color: "black" },
  { id: 13, value: 36, color: "red" },
  { id: 14, value: 11, color: "black" },
  { id: 15, value: 30, color: "red" },
  { id: 16, value: 8, color: "black" },
  { id: 17, value: 23, color: "red" },
  { id: 18, value: 10, color: "black" },
  { id: 19, value: 5, color: "red" },
  { id: 20, value: 24, color: "black" },
  { id: 21, value: 16, color: "red" },
  { id: 22, value: 33, color: "black" },
  { id: 23, value: 1, color: "red" },
  { id: 24, value: 20, color: "black" },
  { id: 25, value: 14, color: "red" },
  { id: 26, value: 31, color: "black" },
  { id: 27, value: 9, color: "red" },
  { id: 28, value: 22, color: "black" },
  { id: 29, value: 18, color: "red" },
  { id: 30, value: 29, color: "black" },
  { id: 31, value: 7, color: "red" },
  { id: 32, value: 28, color: "black" },
  { id: 33, value: 12, color: "red" },
  { id: 34, value: 35, color: "black" },
  { id: 35, value: 3, color: "red" },
  { id: 36, value: 26, color: "black" },
];

export const parseToArrayNumbers = (a: any[], field: string): number[] =>
  a.map((item) => item[field]);

export const getIndex = (n: number): number =>
  rouletteNumbers.find((item) => item.value === n)?.id || 0;

export const getValueById = (id: number): number =>
  rouletteNumbers.find((item) => item.id === id)?.value || 0;

export const calculateDistance = (n1: number, n2: number) =>
  getIndex(n1) - getIndex(n2);
// algorithm.getHotNumbersByLongLtoR(cNumbers, 30);

export const findLongIndex = (beforeN: number, n: number) => {
  let absoluteLong = 0;
  let i1 = getIndex(n);
  let i2 = getIndex(beforeN);
  if (i2 < i1) absoluteLong = 37 - i1 + i2;
  if (i2 > i1) absoluteLong = 37 - (37 - i2 + i1);
  return absoluteLong;
};

export const findIndex = (n: number, long: number) => {
  let index = getIndex(n);
  if (long == 0 || long == 37) return index;
  if (index >= long) return index - long;
  return 37 - (long - index);
};
export const longArray = (array: number[]) => {
  if (!array.length) return [];
  if (array.length === 1) return [0];
  let newArray: number[] = [];
  for (let i = 0; i < array.length - 1; i++) {
    let n = findLongIndex(array[i], array[i + 1]);
    newArray.push(n);
  }
  return newArray;
};

//build main algorithm
export const getNumbersByLongAlg = (a: number[], length: number) => {
  if (!a.length) return [];
  let long = longArray(a);
  let hotLongs = centralTendency.getMode(long, length);
  let newArray: any = [];
  for (let i = 0; i < hotLongs.length; i++) {
    let index = findIndex(a[a.length - 1], hotLongs[i].value);
    newArray.push({
      now: a[a.length - 1],
      index,
      number: getValueById(index),
      long: hotLongs[i].value,
      count: hotLongs[i].count,
    });
  }
  return newArray;
};
