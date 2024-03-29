import { createUser } from "../../services/userService.js";
import { hashPassword } from "../../services/passwordService.js";

export const postUserAction = async (req, res, next) => {
  try {
    const requiredFields = [
      "nom",
      "prenom",
      "adresse",
      "email",
      "telephone",
      "password",
      "civilite",
      "dateNaissance",
      "role",
    ];
    for (const field of requiredFields) {
      if (!req.body.hasOwnProperty(field) || !req.body[field]) {
        return res.status(400).json({
          error: `Le champ ${field} est obligatoire`,
        });
      }
    }
    req.body.password = await hashPassword(req.body.password);
    const user = await createUser(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    next(500);
  }
};
