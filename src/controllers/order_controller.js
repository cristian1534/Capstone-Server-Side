const { create, get } = require("../services/order_service");

exports.create_order = async (req, res) => {
  try {
    const order = await create(req.body);
    return res.status(200).json(order);
  } catch (err) {
    return res.sendStatus(500)
  }
};

exports.get_orders = async (req, res) => {
  try {
    const orders = await get();
    if (!orders.length)
      return res.status(404).json({ message: "Not orders placed." });

    return res.status(200).json(orders);
  } catch (err) {
    return res.sendStatus(500);
  }
};
