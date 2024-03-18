import express from "express";
import { postOrder } from "../actions/orders/createOrder.js";

const router = express.Router();

router
  .route("/")
  //   .get(getAllOrders)
  .post(postOrder)
  .all((req, res, next) => next(405));

// router
//   .route("/:id")
//   .get(getOrderById)
//   .put(putOrderById)
//   .delete(deleteOrderById)
//   .all((req, res, next) => next(405));

export default router;
