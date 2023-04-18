// Import model
const Room = require("../models/room");

// Handler function for socket connection
const handlers = (io, socket) => {
  // Handle when client join room
  socket.on("client join room", async (roomId, role) => {
    console.log("client join room");
    console.log(`${io.engine.clientsCount} clients online`);
    let roomCode = roomId;
    // If client does not give roomId, create new room
    if (!roomCode) {
      const room = await Room.create({ messages: [] });
      roomCode = room._id.toString();
    }
    // Join room by roomId
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    socket.data.role = role;
  });

  // Handle when client send message
  socket.on("client send message", async (message) => {
    // Create new message
    const role = socket.data.role;
    const roomCode = socket.data.roomCode;
    const newMsg = { from: role, message };
    // Add new message to database
    await Room.findByIdAndUpdate(roomCode, { $push: { messages: newMsg } }, { new: true });
    // Send message to room
    io.to(roomCode).emit("server send message", newMsg);
  });

  // Handle when socket disconnect
  socket.on("disconnect", async () => {
    console.log("client leave room");
    const role = socket.data.role;
    const roomCode = socket.data.roomCode;
    if (role === "customer") await Room.findByIdAndDelete(roomCode);
  });
};

// Export
module.exports = handlers;
