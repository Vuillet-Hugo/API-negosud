import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const readAllProduits = async (req, next) => {
  try {
    const { data: produits, error } = await supabase
      .from("produits")
      .select("*");
    if (error) throw error;
    for (let i = 0; i < produits.length; i++) {
      const { data: idCouleur } = await supabase
        .from("produit_categorie")
        .select("id_categorie")
        .eq("id_produit", produits[i].id);
      const { data: produitCouleur } = await supabase
        .from("categorie")
        .select("*")
        .eq("id", idCouleur[0].id_categorie);
      const { data: produitPrix } = await supabase
        .from("prix")
        .select("*")
        .eq("id_produit", produits[i].id);
      const { data: volume } = await supabase
        .from("option")
        .select("nom")
        .eq("id", produitPrix[0].id_option);
      const { data: region } = await supabase
        .from("fournisseur")
        .select("region")
        .eq("id", produits[i].fournisseur);

      produits[i].couleur = produitCouleur[0].nom;
      produits[i].prix = produitPrix[0].prix;
      produits[i].volume = volume[0].nom;
      produits[i].region = region[0].region;
    }
    const items = produits.map((item) => ({
      id: item.id,
      nom: item.nom,
      couleur: item.couleur,
      prix: item.prix,
      volume: item.volume,
      region: item.region,
    }));
    return items;
  } catch (error) {
    console.error(error);
    next(500);
  }
};

export const readProduitById = async (id, next) => {
  const item = {
    id: Number,
    nom: String,
    description: String,
    prix: String,
    couleur: String,
    volume: String,
    region: String,
    millesime: Number,
  };

  try {
    const { data: produit, error } = await supabase
      .from("produits")
      .select("*")
      .eq("id", id);
    const { data: idCouleur } = await supabase
      .from("produit_categorie")
      .select("id_categorie")
      .eq("id_produit", id);
    const { data: produitCouleur } = await supabase
      .from("categorie")
      .select("*")
      .eq("id", idCouleur[0].id_categorie);
    const { data: produitPrix } = await supabase
      .from("prix")
      .select("*")
      .eq("id_produit", id);
    const { data: volume } = await supabase
      .from("option")
      .select("nom")
      .eq("id", produitPrix[0].id_option);
    const { data: region } = await supabase
      .from("fournisseur")
      .select("region")
      .eq("id", produit[0].fournisseur);
    const { data: idMillesime } = await supabase
      .from("categorie_attribut")
      .select("id_attribut")
      .eq("id_categorie", produitCouleur[0].id);
    const { data: millesime } = await supabase
      .from("attribut")
      .select("nom")
      .eq("id", idMillesime[0].id_attribut);
    if (error) throw error;
    item.id = produit[0].id;
    item.nom = produit[0].nom;
    item.description = produit[0].description;
    item.couleur = produitCouleur[0].nom;
    item.prix = produitPrix[0].prix;
    item.volume = volume[0].nom;
    item.region = region[0].region;
    item.millesime = millesime[0].nom;
    return item;
  } catch (error) {
    console.error(error);
    next(500);
  }
};
