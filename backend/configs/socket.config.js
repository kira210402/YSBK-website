import { Server } from "socket.io";

let io;

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    return io;
  })
};

const getIo = () => {
  if(!io) {
    throw new Error("Socket.io not initialized")
  }

  return io;
};

export {
  initializeSocket,
  getIo,
}