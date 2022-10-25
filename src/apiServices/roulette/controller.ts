import { RequestHandler } from "express";
import { RouletteI } from "./model";
import rouletteDb from "./utils/.db";

const createRoulette: RequestHandler = async (req, res, next) => {
  const userId: any = req.user;
  const roulette: RouletteI = { userId, name: req.body.name };
  try {
    const newRoulette = await rouletteDb.create(roulette);
    if (!newRoulette)
      return res.status(501).json({ message: "error creating roulette" });
    res.status(200).json(newRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][roulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getRouletteById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const roulette = await rouletteDb.readById(id);
    if (!roulette)
      return res.status(404).json({ message: "roulette not found" });
    res.status(200).json(roulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][roulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getRoulettesByUserId: RequestHandler = async (req, res, next) => {
  const userId: any = req.user;
  try {
    const roulettes = await rouletteDb.readByUserId(userId);
    if (!roulettes)
      return res.status(404).json({ message: "rolettes not found" });
    res.status(200).json(roulettes);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][roulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const updateRouletteById: RequestHandler = async (req, res, next) => {
  const roulette = req.body;
  try {
    const newRoulette = rouletteDb.updateById(roulette);
    if (!newRoulette)
      return res.status(404).json({ message: "error not found for update" });
    res.status(200).json({ message: "updated successfull" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][roulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const deleteRouletteById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const row = rouletteDb.deleteById(id);
    if (!row) return res.status(404).json({ message: "not found for delete" });
    res.status(200).json({ message: "deleted successfull" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][roulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

export default {
  createRoulette,
  getRouletteById,
  getRoulettesByUserId,
  updateRouletteById,
  deleteRouletteById,
};
