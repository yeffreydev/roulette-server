import { getNumbersByLongAlg } from "./helpers";
const getAlgs = (a: number[]) => {
  let alg1 = getNumbersByLongAlg(a, 10);
  return [{ nums: alg1, name: "alg-10 rtx 00" }];
};
const rouletteAlgorithm = {
  getNumbersByLongAlg,
  getAlgs,
};

export default rouletteAlgorithm;
