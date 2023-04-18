// Import base

// Import model
const Order = require("../models/order");
const Product = require("../models/product");

// Import utils
const paging = require("../utils/paging");

// POST - /api/orders
exports.create = async (req, res, next) => {
  try {
    // Request and response data
    const reqData = req.body;
    const resData = {};

    // Decrease quantity of products in order
    reqData.products.forEach(async (prod) => {
      const productId = prod.product._id;
      const qty = prod.qty;
      await Product.findByIdAndUpdate(productId, { $inc: { remaining: -qty } });
    });

    // Create product
    const created = await Order.create({ ...reqData });

    // Send response
    resData.message = "Create order successfully";
    resData.item = created;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// GET - /api/orders
exports.getAll = async (req, res, next) => {
  try {
    // Request and response data
    const queries = req.query;
    let resData = {};

    // Filter attribute
    const sort = String(queries.sort || "");
    const limit = Number(queries.limit || 1000);

    // Paging attribute
    const page_number = Number(queries.page_number || 1);
    const page_size = Number(queries.page_size || 12);

    // Find body
    const findBody = {};
    if (queries.user) findBody.user = queries.user;

    // Get all orders with limit
    const orders = await Order.find(findBody).populate("user").populate("products.product").sort(sort).limit(limit);

    // Paging products
    const paged = paging(orders, page_number, page_size);

    // Send response
    resData = { ...paged };
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// GET - /api/orders/:orderId
exports.getById = async (req, res, next) => {
  try {
    // Request and response data
    const resData = {};
    const id = req.params.orderId;

    // Get order by orderId
    const order = await Order.findById(id).populate("user").populate("products.product");

    // Send response
    resData.item = order;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// PUT - /api/orders/:orderId
exports.updateById = async (req, res, next) => {
  try {
    // Request and response data
    const id = req.params.orderId;
    const reqData = req.body;
    const resData = {};

    // Update order by orderId
    const updated = await Order.findByIdAndUpdate(id, reqData).populate("user").populate("products.product");

    // Send response
    resData.message = "Update order successfully";
    resData.item = updated;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// DELETE - /api/orders/:orderId
exports.deleteById = async (req, res, next) => {
  try {
    // Request and response data
    const id = req.params.orderId;
    const resData = {};

    // Delete order by orderId
    await Order.findByIdAndDelete(id);

    // Send response
    resData.message = "Delete order successfully";
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};
