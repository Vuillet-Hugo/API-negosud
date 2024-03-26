import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const createOrder = async (userId) => {
  try {
    const { data: orderId, error: orderError } = await supabase
      .from("commande_client")
      .insert([
        {
          id_utilisateur: userId,
        },
      ])
      .select("id");
    if (orderError) throw orderError;
    return orderId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrderLine = async (order, orderId) => {
  try {
    const { data: orderLinePrice, error: orderLinePriceError } = await supabase
      .from("prix")
      .select("prix")
      .eq("id_produit", order.id_produit);

    const { data: orderLine, error: orderLineError } = await supabase
      .from("ligne_commande")
      .insert([
        {
          id_produit: order.id_produit,
          quantite: order.quantite,
          prix: orderLinePrice,
          id_commande: orderId,
        },
      ]);
    if (orderLineError) throw orderLineError;
    return "prout";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOneOrderById = async (orderId) => {
  try {
    const { data: order, error: orderError } = await supabase
      .from("ligne_commande")
      .select("*")
      .eq("id_commande", orderId);
    if (orderError) throw orderError;
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
