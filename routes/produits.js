import express from "express";
import { getAllProduits } from "../actions/produits/getAllProduits.js";
import { getProduitById } from "../actions/produits/getProduitById.js";
const router = express.Router();

router
  .route("/")
  .get(getAllProduits)
  // .post(createProduit)
  .all((req, res, next) => next(405));

router
  .route("/:id")
  .get(getProduitById)
  // .put(updateProduitById)
  // .delete(deleteProduitById)
  .all((req, res, next) => next(405));

export default router;
