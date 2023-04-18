// Import base
const bcrypt = require("bcrypt");

// Import model
const User = require("../models/user");

// Import utils
const HttpError = require("../utils/http-error");

// POST - /api/sessions
exports.create = async (req, res, next) => {
  try {
    // Request and response data
    const reqData = req.body;
    const resData = {};

    // Find user if email existed
    const user = await User.findOne({ email: reqData.email }).populate("cart.products.product");

    // If user does not exist, throw error
    if (!user) throw HttpError("Account does not exist");

    // If account is admin but user is not
    if (reqData.isAdmin && user.role === "customer")
      throw HttpError("You need to login with a manager or admin account");

    // If user exist, check password
    const isPwMatch = bcrypt.compareSync(reqData.password, user.password);

    // If password does not match
    if (!isPwMatch) throw HttpError("Wrong password", 401);

    // If password match, set session
    req.session.user = user;
    req.session.isLoggedIn = true;

    // Send response
    resData.message = "Sign in successfully";
    resData.user = user;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// GET - /api/sessions
exports.get = async (req, res, next) => {
  try {
    // Request and response data
    const resData = {};

    // Get user
    let user = req.session.user;
    if (user) user = await User.findById(user._id).populate("cart.products.product");

    // Send response
    resData.user = user;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// DELETE - /api/sessions
exports.delete = async (req, res, next) => {
  try {
    // Request and response data
    const resData = {};

    // Destroy session
    req.session.destroy();

    // Send response
    resData.message = "Sign out successfully";
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};
