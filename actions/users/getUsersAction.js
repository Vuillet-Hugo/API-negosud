import { getUserByEmail } from "../../services/userService.js";

export default async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error" });
  }
};
