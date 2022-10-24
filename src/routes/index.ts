import { Router } from "express";
import authRoutes from "../apiServices/auth/routes";
var router = Router();

// router.use("/users", users));
router.use("/api/auth", authRoutes);
// router.use("/post", post);
// router.use("/comments", comments);

export default router;
