const HttpError = require("../utils/http-error");

exports.requireLogin = (req, res, next) => {
  if (req.session && req.session.user) return next();
  else {
    const error = HttpError("You must be logged in to use this feature", 401);
    return next(error);
  }
};

exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.length || (req.session && req.session.user && roles.includes(req.session.user.role))) return next();
    else {
      let msg;
      if (roles.length === 1) msg = `Unauthorized. You must be ${roles[0]} to use this feature`;
      else if (roles.length > 1)
        msg = `Unauthorized. You must be ${roles.reduce((str, role, idx) => {
          if (idx === roles.length - 1) return str + role;
          if (idx === roles.length - 2) return str + role + " or ";
          return str + role + ", ";
        }, "")} to use this feature`;
      const error = HttpError(msg, 403);
      return next(error);
    }
  };
};
