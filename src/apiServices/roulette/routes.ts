import { Router } from "express";
import rouletteController from "./controller";
import passport from "passport";
const rouletteRoutes = Router();

rouletteRoutes.get(
  "/byUser/",
  passport.authenticate("jwt", { session: false }),
  rouletteController.getRoulettesByUserId
);
rouletteRoutes.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  rouletteController.getRouletteById
);
rouletteRoutes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  rouletteController.createRoulette
);
rouletteRoutes.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  rouletteController.updateRouletteById
);
rouletteRoutes.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  rouletteController.deleteRouletteById
);

export default rouletteRoutes;
