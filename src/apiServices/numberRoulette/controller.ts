import { RequestHandler } from "express";
import { NumberRouletteI, NumberRouletteModel } from "./model";
import numberRouletteDb from "./utils/.db";
import rouletteAlgorithm from "../../services/roulette_algorithm";
const createNumberRoulette: RequestHandler = async (req, res, next) => {
  const userId: any = req.user;
  const numberRoulette: NumberRouletteI = {
    userId,
    rouletteId: req.body.rouletteId,
    sessionId: req.body.sessionId,
    valueNumber: req.body.valueNumber,
  };
  try {
    const newNumberRoulette = await numberRouletteDb.create(numberRoulette);
    if (!newNumberRoulette)
      return res
        .status(501)
        .json({ message: "error creating session roulette" });
    const numbersSession = await numberRouletteDb.readBySessionId(
      newNumberRoulette.sessionId
    );
    if (!numbersSession)
      return res.status(501).json({ message: "error numbers" });
    const algs = rouletteAlgorithm.getAlgs(
      numbersSession.map((item) => parseInt(item.valueNumber))
    );

    res.status(200).json({ number: newNumberRoulette, algs });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getNumberRouletteById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const numberRoulette = await numberRouletteDb.readById(id);
    if (!numberRoulette)
      return res.status(404).json({ message: "number roulette not found" });
    res.status(200).json(numberRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getNumbersRouletteByRouletteId: RequestHandler = async (
  req,
  res,
  next
) => {
  const rouletteId = req.params.rouletteId;
  try {
    const numbersRoulette = await numberRouletteDb.readByRouletteId(rouletteId);
    if (!numbersRoulette)
      return res.status(404).json("not found numbers roulette");
    res.status(200).json(numbersRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getNumbersRouletteByUserId: RequestHandler = async (req, res, next) => {
  const userId: any = req.user;
  try {
    const numbersRoulette = await numberRouletteDb.readByUserId(userId);
    if (!numbersRoulette)
      return res.status(404).json({ message: "numbers roulette not found" });
    res.status(200).json(numbersRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getNumbersRouletteBySessionId: RequestHandler = async (
  req,
  res,
  next
) => {
  const sessionId = req.params.sessionId;
  try {
    const numbersRoulette: NumberRouletteModel[] =
      await numberRouletteDb.readBySessionId(sessionId);
    if (!numbersRoulette)
      return res.status(404).json({ message: "numbers roulette not found" });
    const algs = rouletteAlgorithm.getAlgs(
      numbersRoulette.map((item) => parseInt(item.valueNumber))
    );
    res.status(200).json({ numbers: numbersRoulette, algs });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const updateNumberRouletteById: RequestHandler = async (req, res, next) => {
  const numberRoulette = req.body;
  try {
    const newNumberRoulette = await numberRouletteDb.updateById(numberRoulette);
    if (!newNumberRoulette)
      return res.status(404).json({ message: "error not found for update" });
    const numbersSession = await numberRouletteDb.readBySessionId(
      newNumberRoulette.sessionId
    );
    if (!numbersSession)
      return res.status(501).json({ message: "error numbers" });
    const algs = rouletteAlgorithm.getAlgs(
      numbersSession.map((item) => parseInt(item.valueNumber))
    );
    res.status(200).json({ message: "updated successfull", algs });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const deleteNumberRouletteById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const number = await numberRouletteDb.readById(id);
    if (!number)
      return res.status(404).json({ message: "not found for delete" });
    const row = numberRouletteDb.deleteById(id);
    if (!row) return res.status(404).json({ message: "not found for delete" });

    const numbs = await numberRouletteDb.readBySessionId(number.sessionId);
    const alg = rouletteAlgorithm.getAlgs(
      numbs.map((item) => parseInt(item.valueNumber))
    );
    res.status(200).json({ message: "deleted successfull", alg });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][numberRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

export default {
  createNumberRoulette,
  getNumberRouletteById,
  getNumbersRouletteByUserId,
  getNumbersRouletteBySessionId,
  getNumbersRouletteByRouletteId,
  updateNumberRouletteById,
  deleteNumberRouletteById,
};
