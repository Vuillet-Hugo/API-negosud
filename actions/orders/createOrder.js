import { createOrder, createOrderLine } from "../../services/orderService.js";

export const postOrder = async (req, res, next) => {


  try {
    const orderId = await createOrder(req.body.id_utilisateur);
      console.error(req.body)
    for (const product of req.body.products) {
      const orderLine = await createOrderLine(product, orderId[0].id);
    }
  } catch (error) {
    console.error(error);
    next(500);
  }
  res.json(orderLine);
};
