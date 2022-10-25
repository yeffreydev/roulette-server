import { RequestHandler } from "express";
import { SessionRouletteI } from "./model";
import sessionRouletteDb from "./utils/.db";
const createSessionRoulette: RequestHandler = async (req, res, next) => {
  const userId: any = req.user;
  const sessionRoulette: SessionRouletteI = {
    userId,
    rouletteId: req.body.rouletteId,
    name: req.body.name,
  };
  try {
    const newSessionRoulette = await sessionRouletteDb.create(sessionRoulette);
    if (!newSessionRoulette)
      return res
        .status(501)
        .json({ message: "error creating session roulette" });
    res.status(200).json(newSessionRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][sessionRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getSessionRouletteById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const sessionRoulette = await sessionRouletteDb.readById(id);
    if (!sessionRoulette)
      return res.status(404).json({ message: "session roulette not found" });
    res.status(200).json(sessionRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][sessionRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getSessionsRouletteByRouletteId: RequestHandler = async (
  req,
  res,
  next
) => {
  const rouletteId = req.params.rouletteId;
  try {
    const sessionsRoulette = await sessionRouletteDb.readByRouletteId(
      rouletteId
    );
    if (!sessionsRoulette)
      return res.status(404).json("not found sessions roulette");
    res.status(200).json(sessionsRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][sessionRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const getSessionsRouletteByUserId: RequestHandler = async (req, res, next) => {
  const userId: any = req.user;
  try {
    const sessionsRoulette = await sessionRouletteDb.readByUserId(userId);
    if (!sessionsRoulette)
      return res.status(404).json({ message: "sessions roulette not found" });
    res.status(200).json(sessionsRoulette);
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][sessionRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const updateSessionRouletteById: RequestHandler = async (req, res, next) => {
  const sessionRoulette = req.body;
  try {
    const newSessionRoulette = sessionRouletteDb.updateById(sessionRoulette);
    if (!newSessionRoulette)
      return res.status(404).json({ message: "error not found for update" });
    res.status(200).json({ message: "updated successfull" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][sessionRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

const deleteSessionRouletteById: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const row = sessionRouletteDb.deleteById(id);
    if (!row) return res.status(404).json({ message: "not found for delete" });
    res.status(200).json({ message: "deleted successfull" });
  } catch (e) {
    res.status(500).json({ message: "server error" });
    console.error(
      "[error][sessionRoulette.controller]:",
      typeof e === "object" ? JSON.stringify(e) : e
    );
  }
};

export default {
  createSessionRoulette,
  getSessionRouletteById,
  getSessionsRouletteByUserId,
  getSessionsRouletteByRouletteId,
  updateSessionRouletteById,
  deleteSessionRouletteById,
};
