import { readProduitById } from "../../services/produitService.js";
import { readFavoritesProduits } from "../../services/produitService.js";

export const getProduitById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      next(400);
    } else {
      if (id === "favorites") {
        const produits = await readFavoritesProduits();
        res.json(produits);
      } else {
        const produit = await readProduitById(id);

        if (!produit) {
          next(404);
        } else {
          res.json(produit);
        }
      }
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
};
