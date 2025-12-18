import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json({
      message: "Order saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save order",
    });
  }
};
