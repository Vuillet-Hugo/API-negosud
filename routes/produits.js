import express from "express";
import { getAllProduits } from "../actions/produits/getAllProduits.js";
import { getProduitById } from "../actions/produits/getProduitById.js";
const router = express.Router();

router
  .route("/")
  .get(getAllProduits)
  .all((req, res, next) => next(405));

router
  .route("/:id")
  .get(getProduitById)
  .all((req, res, next) => next(405));

export default router;
