// Import base
const bcrypt = require("bcrypt");

// Import model
const User = require("../models/user");

// Import utils
const HttpError = require("../utils/http-error");
const paging = require("../utils/paging");

// POST - /api/users
exports.create = async (req, res, next) => {
  try {
    // Request and response data
    const reqData = req.body;
    const resData = {};

    // Find user if email or phone number existed
    const user = await User.findOne({ $or: [{ email: reqData.email }, { phone_number: reqData.phone_number }] });

    // If user exist, throw error
    if (user) throw HttpError("Email or phone number already exists on the system", 409);

    // If password has less than 8 characters, throw error
    if (reqData.password.length < 8) throw HttpError("Your password must have length more than 8", 400);

    // If user does not exist, hash password and create user
    const hashedPw = bcrypt.hashSync(reqData.password, 10);
    User.create({
      ...reqData,
      password: hashedPw,
      role: "customer",
      cart: {
        products: [],
        total_price: 0,
      },
    });

    // Send response
    resData.message = "Sign up successfully";
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// GET - /api/users
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

    // Get all users with limit
    const users = await User.find().sort(sort).limit(limit);

    // Paging products
    const paged = paging(users, page_number, page_size);

    // Send response
    resData = { ...paged };
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// GET - /api/users/:userId
exports.getById = async (req, res, next) => {
  try {
    // Request and response data
    const id = req.params.userId;
    const resData = {};

    // Get user by id
    const user = await User.findById(id).populate("cart.products.product");

    // Send response
    resData.item = user;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// PUT - /api/users/:userId
exports.updateById = async (req, res, next) => {
  try {
    // Request and response data
    const id = req.params.userId;
    const reqData = req.body;
    const resData = {};

    // Update user by id
    const updated = await User.findByIdAndUpdate(id, reqData).populate("cart.products.product");

    // Send response
    resData.message = "Update user successfully";
    resData.item = updated;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// DELETE - /api/users/:userId
exports.deleteById = async (req, res, next) => {
  try {
    // Request and response data
    const id = req.params.userId;
    const resData = {};

    // Update user by id
    await User.findByIdAndDelete(id);

    // Send response
    resData.message = "Delete user successfully";
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};
