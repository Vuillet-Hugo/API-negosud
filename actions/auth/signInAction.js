import { authVerif } from "../../services/authService.js";

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authVerif(email, password);
    console.error("signin", email, password, user);
    res.status(200).json({
      message: "Utilisateur connecté",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error" });
  }
};
