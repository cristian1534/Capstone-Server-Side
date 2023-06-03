const Order = require("../models/order_model");

exports.create = (data) => Order.insertMany(data).then(() => data);

exports.get = () => Order.find();
