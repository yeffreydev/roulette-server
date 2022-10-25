import { Router } from "express";
import authRoutes from "../apiServices/auth/routes";
import rouletteRoutes from "../apiServices/roulette/routes";
import sessionRouletteRouter from "../apiServices/sessionRoulette/routes";
import numberRouletteRouter from "../apiServices/numberRoulette/routes";
var router = Router();

// router.use("/users", users));
router.use("/api/auth", authRoutes);
router.use("/api/roulette", rouletteRoutes);
router.use("/api/session-roulette", sessionRouletteRouter);
router.use("/api/number-roulette", numberRouletteRouter);
// router.use("/post", post);
// router.use("/comments", comments);

export default router;
