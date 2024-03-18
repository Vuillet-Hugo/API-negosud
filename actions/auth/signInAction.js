import { authVerif } from "../../services/authService.js";
import { generateAccessAndRefreshTokens } from "../../services/tokenService.js";

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authVerif(email, password);

    const payload = { user };
    const { access_token, refresh_token } =
      await generateAccessAndRefreshTokens(payload);

    res.status(200).json({
      access_token: access_token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error" });
  }
};
