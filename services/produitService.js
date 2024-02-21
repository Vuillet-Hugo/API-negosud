import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const readAllProduits = async (req, next) => {
  try {
    const { data: produits, error } = await supabase.from("produits").select(
      `
        id,
        nom,
        fournisseur(
          region
        ),
        prix(
          prix,
          id_option(
            nom
          )
        ),
        produit_categorie(
          categorie(
            nom,
            categorie_attribut(
              attribut(
                nom
              )
            )
          )
        )
        `
    );
    if (error) throw error;
    console.error(produits);
    const items = produits.map((item) => ({
      id: item.id,
      nom: item.nom,
      couleur: item.produit_categorie[0].categorie.nom,
      prix: item.prix[0].prix,
      volume: item.prix[0].id_option.nom,
      region: item.fournisseur.region,
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

export const createProduit = async (req, next) => {
  const produit = {
    id: Number,
    nom: String,
    description: String,
    prix: String,
    couleur: String,
    volume: String,
    region: String,
    millesime: Number,
    stock: Number,
    seuilcommande: Number,
  };

  try {
    const { data: produitData, error: produitError } = await supabase
      .from("produits")
      .insert([
        {
          nom: req.nom,
          description: req.description,
          fournisseur: req.fournisseur,
        },
      ])
      .select();
    let { data: categorieData, error: categorieError } = await supabase
      .from("categorie")
      .select("*")
      .eq("nom", req.couleur);
    if (categorieData.length === 0) {
      const { data: newCategorieData, error: newCategorieError } =
        await supabase
          .from("categorie")
          .insert([
            {
              nom: req.couleur,
            },
          ])
          .select();
      categorieData = newCategorieData;
    }
    const { data: prodCateData, error: prodCateError } = await supabase
      .from("produit_categorie")
      .insert([
        {
          id_produit: produitData[0].id,
          id_categorie: categorieData[0].id,
        },
      ]);
    let { data: attributData, error: attributError } = await supabase
      .from("attribut")
      .select("*")
      .eq("nom", req.millesime);
    if (attributData.length === 0) {
      const { data: newAttributData, error: newAttributError } = await supabase
        .from("attribut")
        .insert([
          {
            nom: req.millesime,
          },
        ])
        .select();
      attributData = newAttributData;
    }
    const { data: cateAttributData, error: cateAttributError } = await supabase
      .from("categorie_attribut")
      .insert([
        {
          id_categorie: categorieData[0].id,
          id_attribut: attributData[0].id,
        },
      ]);
    let { data: volumeData, error: volumeError } = await supabase
      .from("option")
      .select("*")
      .eq("nom", req.volume);
    if (volumeData.length === 0) {
      const { data: newVolumeData, error: newVolumeError } = await supabase
        .from("option")
        .insert([
          {
            nom: req.volume,
          },
        ])
        .select();
      volumeData = newVolumeData;
    }
    const { data: prixData, error: prixError } = await supabase
      .from("prix")
      .insert([
        {
          id_produit: produitData[0].id,
          id_option: volumeData[0].id,
          prix: req.prix,
        },
      ])
      .select();
    const { data: stockData, error: stockError } = await supabase
      .from("stocks")
      .insert([
        {
          id_prix: prixData[0].id,
          quantite: req.stock,
          seuilcommande: req.seuilcommande,
        },
      ]);
    return { id: produitData[0].id };
  } catch (error) {
    console.error(error);
    next(500);
  }
};
