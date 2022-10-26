import { RequestHandler } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "./auth";
import config from "../../config/development";

const login: RequestHandler = async (req, res, next) => {
  try {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        return res.status(301).json({ message: info });
      }
      if (!user) return res.status(301).json({ message: info });
      req.logIn(user, { session: false }, async (err) => {
        if (err) res.status(301).json({ message: info });
        const token = jwt.sign({ id: user.id }, config.JWT_KEY);
        return res.status(200).json({ token, auth: true });
      });
    })(req, res, next);
  } catch (e) {
    res.status(501).json({ mesage: "username or password invalid" });
    console.error("[user.controller][loginser][error]");
  }
};

const register: RequestHandler = (req, res, next) => {
  try {
    passport.authenticate("signup", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "duplicate user" });
      }
      if (!user) return res.status(501).json(info);
      req.logIn(user, { session: false }, async (err) => {
        if (err) return next(err);
        const token = jwt.sign({ id: user.id }, config.JWT_KEY);
        return res.status(200).json({ auth: true, token });
      });
    })(req, res, next);
  } catch (e) {
    console.error(
      "[user.controller][registerUser][error]",
      typeof e === "object" ? JSON.stringify(e) : e
    );
    res.status(501).json({ message: "server error 404" });
  }
};

export default {
  login,
  register,
};
