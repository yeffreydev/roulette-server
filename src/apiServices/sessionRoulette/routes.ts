import { Router } from "express";
import sessionRouleteController from "./controller";
import passport from "passport";

const sessionRouletteRouter = Router();

/*create session roulette*/
sessionRouletteRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  sessionRouleteController.createSessionRoulette
);

/*get session roulette by user id*/
sessionRouletteRouter.get(
  "/byUserId",
  passport.authenticate("jwt", { session: false }),
  sessionRouleteController.getSessionsRouletteByUserId
);

/*get session roulette by rouletteId*/
sessionRouletteRouter.get(
  "/byRouletteId/:rouletteId",
  passport.authenticate("jwt", { session: false }),
  sessionRouleteController.getSessionsRouletteByRouletteId
);

/*get session roulette by id*/
sessionRouletteRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sessionRouleteController.getSessionRouletteById
);

/*update session roulete by id*/
sessionRouletteRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sessionRouleteController.updateSessionRouletteById
);

/*delete session roulete by id*/
sessionRouletteRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sessionRouleteController.deleteSessionRouletteById
);

export default sessionRouletteRouter;
