import { getUserByEmail } from "./userService.js";
import bcrypt from "bcrypt";

export const authVerif = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    console.error("authVerif");
    if (user.length === 0) {
      console.error("Utilisateur non trouvé");
      return { error: "Utilisateur non trouvé" };
    }
    bcrypt.compare(password, user[0].motdepasse, (err, result) => {
      if (err) {
        return { error: "Mot de passe incorrect" };
      }
      if (result) {
        console.error("Mot de passe correct", user);
      }
      return user;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
