import express from "express";
import { postUserAction } from "../actions/auth/signUpAction.js";
import { signin } from "../actions/auth/signInAction.js";

const router = express.Router();

router
  .route("/signup")
  .post(postUserAction)
  .all((req, res, next) => next(405));

router
  .route("/signin")
  .post(signin)
  .all((req, res, next) => next(405));

export default router;
