import { Router } from "express";
import numberRouleteController from "./controller";
import passport from "passport";

const numberRouletteRouter = Router();

/*create number roulette*/
numberRouletteRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.createNumberRoulette
);

/*get numbers roulette by user id*/
numberRouletteRouter.get(
  "/byUserId",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.getNumbersRouletteByUserId
);

/*get numbers roulette by roulette id*/
numberRouletteRouter.get(
  "/byRouletteId/:rouletteId",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.getNumbersRouletteByRouletteId
);

/*get numbers roulette by session id*/
numberRouletteRouter.get(
  "/bySessionId/:sessionId",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.getNumbersRouletteBySessionId
);

/*get number roulette by id*/
numberRouletteRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.getNumberRouletteById
);

/*update number roulete by id*/
numberRouletteRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.updateNumberRouletteById
);

/*delete number roulete by id*/
numberRouletteRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  numberRouleteController.deleteNumberRouletteById
);

export default numberRouletteRouter;
