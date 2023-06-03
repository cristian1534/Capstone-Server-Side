const Product = require("../models/product_model");

exports.create = (data) =>
  new Product(data).save().then((product) => product.toObject());

exports.get_one = (id) => Product.findOne(id);

exports.get_all = () => Product.find();

exports.update = (id, data) => Product.findByIdAndUpdate(id, data);

exports.delete_one = (id) => Product.findByIdAndDelete(id);
