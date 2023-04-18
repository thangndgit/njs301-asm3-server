// Import model
const Room = require("../models/room");

// Import utils
const paging = require("../utils/paging");

// GET - /api/rooms
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

    // Get all rooms with limit
    const rooms = await Room.find().sort(sort).limit(limit);

    // Paging products
    const paged = paging(rooms, page_number, page_size);

    // Send response
    resData = { ...paged };
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};

// GET - /api/rooms/:roomId
exports.getById = async (req, res, next) => {
  try {
    // Request and response data
    const id = req.params.roomId;
    const resData = {};

    // Get user by id
    const room = await Room.findById(id);

    // Send response
    resData.item = room;
    return res.json(resData);

    // Catch error
  } catch (error) {
    return next(error);
  }
};
