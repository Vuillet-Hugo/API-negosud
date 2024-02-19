import { readAllProduits } from "../../services/produitService.js";

export const getAllProduits = async (req, res, next) => {
  try {
    const produits = await readAllProduits();
    res.json(produits);
  } catch (error) {
    console.error(error);
    next(500);
  }
};
