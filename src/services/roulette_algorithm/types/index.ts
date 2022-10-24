export interface MedianObject {
  sum: number;
  length: number;
  median: number;
}

export interface ModeObject {
  count: number;
  mode: number;
}

export interface MeanObject {
  mean: [number] | [number, number] | [];
  length: number;
}
