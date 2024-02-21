import { createProduit } from "../../services/produitService.js";

export const postProduit = async (req, res, next) => {
  try {
    const produit = await createProduit(req.body);
    res.json(produit);
  } catch (error) {
    console.error(error);
    next(500);
  }
};
