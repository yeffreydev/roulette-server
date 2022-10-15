import passport from "passport";
import UserRepository from "../users/utils/user.db";

import { Strategy } from "passport-local";
import passport_jwt, { ExtractJwt } from "passport-jwt";

//import config
import config from "../../config/development";
import { UserI } from "../users/model";

const JWTStrategy = passport_jwt.Strategy;

//user db
const userDb = new UserRepository();
//singup with passport js
passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let user: UserI = {
        username,
        email: req.body.email,
        password,
        age: req.body.age,
      };
      try {
        // let newUser = await userDb.create(user);
      } catch (e) {
        console.error(
          "[error][auth]" + typeof e === "object" ? JSON.stringify(e) : e
        );
      }
    }
  )
);

//login with passport js

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {}
  )
);

//authenticaion with json web tokens
passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.JWT_KEY,
      jwtFromRequest: ExtractJwt.fromHeader("x-access-token"),
    },
    (token, done) => {
      try {
        return done(null, token.id);
      } catch (e) {
        done(e);
      }
    }
  )
);
