import express from "express";
import { postUserAction } from "../actions/users/createUserAction.js";

const router = express.Router();

router.route("/").post(postUserAction);

// router.route("/:id").get(getUserByIdAction);

export default router;
