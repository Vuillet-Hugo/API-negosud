import { getOneOrderById } from "../../services/orderService.js";

export const getOrderById = async (req, res, next) => {
  try {
    const order = await getOneOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    console.error(error);
    next(500);
  }
};
