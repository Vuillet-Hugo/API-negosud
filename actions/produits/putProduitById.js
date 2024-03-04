import {
  updatePrixProduit,
  updateStockProduit,
} from "../../services/produitService.js";

export const putProduitById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const prixFields = ["prix"];
    const stockFields = ["quantite", "seuilcommande"];
    let produit = {};
    if (!id) {
      next(400);
    } else {
      if (Object.keys(req.body).some((field) => prixFields.includes(field))) {
        const prixProduit = await updatePrixProduit(id, req.body);
        produit = prixProduit;
      }
      if (Object.keys(req.body).some((field) => stockFields.includes(field))) {
        const stockProduit = await updateStockProduit(id, req.body);
        produit += stockProduit;
      }
      res.json(produit);
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
};
