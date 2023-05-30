require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const pizzaRouter = require("./routers/pizzaRouter");
const connectToDb = require("./config/db");
const { cleanUpOrders } = require("./handlers/dbHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});

app.get("/", (req, res) => res.redirect("/healthcheck"));
app.get("/healthcheck", (req, res) => res.json("Health check successful"));

app.use("/pizza", pizzaRouter);

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("User Disconnected");
    // cleanUpOrders();
  });
});

global.io = io;

connectToDb().then(() => {
  server.listen(3000, () => {
    console.log("App is listening on port 3000");
  });
});
