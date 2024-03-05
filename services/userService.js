import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const createUser = async (user) => {
  // const user = {
  // nom: string,
  // prenom: string,
  // adresse: string,
  // email: string,
  // telephone: string,
  // password: string,
  // civilite: Number,
  // dateNaissance: string,
  // }
  try {
    const { data, error } = await supabase.from("utilisateur").insert([
      {
        nom: user.nom,
        prenom: user.prenom,
        adresse: user.adresse,
        email: user.email,
        telephone: user.telephone,
        motdepasse: user.password,
        civilite: user.civilite,
        date_de_naissance: user.dateNaissance,
      },
    ]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
