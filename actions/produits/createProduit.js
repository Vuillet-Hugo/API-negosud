import { createProduit } from "../../services/produitService.js";

export const postProduit = async (req, res, next) => {
  try {
    const requiredFields = [
      "nom",
      "description",
      "prix",
      "couleur",
      "volume",
      "fournisseur",
      "millesime",
      "stock",
      "seuilcommande",
    ];
    for (const field of requiredFields) {
      if (!req.body.hasOwnProperty(field) || !req.body[field]) {
        return res.status(400).json({
          error: `Le champ ${field} est obligatoire`,
        });
      }
    }
    const produit = await createProduit(req.body);
    res.json(produit);
  } catch (error) {
    console.error(error);
    next(500);
  }
};
