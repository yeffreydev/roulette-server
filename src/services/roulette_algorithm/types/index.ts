export interface MedianObject {
  sum: number;
  length: number;
  median: number;
}

export interface ModeObject {
  count: number;
  value: number;
}

export interface MeanObject {
  mean: [number] | [number, number] | [];
  length: number;
}

//roulette number

export interface RouletteNumberI {
  id: number;
  value: number;
  color: string;
}
