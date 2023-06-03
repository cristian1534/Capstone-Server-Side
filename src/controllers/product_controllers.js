const {
  create,
  get_one,
  get_all,
  update,
  delete_one,
} = require("../services/product_services");

exports.create_product = async (req, res) => {
  try {
    const { name, image_url, description, price } = req.body;
    if (!name || !image_url || !description || !price)
      return res.sendStatus(400);

    const product = await create({ name, image_url, description, price });
    return res.status(200).json(product);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.get_products = async (req, res) => {
  try {
    const products = await get_all();
    if (!products.length)
      return res.status(404).json({ message: "Any product stored yet" });

    return res.status(200).json(products);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.get_product = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await get_one({ _id: id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(product);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.delete_product = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await get_one({ _id: id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const deleted_product = await delete_one({ _id: id });
    return res.status(200).json(deleted_product);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

exports.update_product = async (req, res) => {
  try {
    const { name, image_url, description, price } = req.body;
    const { id } = req.params;

    const product = await get_one({ _id: id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (name) product.name = name;
    if (image_url) product.image_url = image_url;
    if (description) product.description = description;
    if (price) product.price = price;

    await update(
      { _id: id },
      {
        product,
      }
    );
    await product.save();
    return res.status(200).json({ message: "Product updated", product });
  } catch (err) {
    return res.sendStatus(500);
  }
};
