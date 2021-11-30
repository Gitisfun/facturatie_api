import Express from "express";
import http from "http";
import * as socketio from "socket.io";
import cors from "cors";
import ApiError from "./errors/ApiError.js";
import errorHandler from "./errors/ErrorHandler.js";
import chalk from "chalk" // TODO: remove chalk

// Routes
import gebruikersRoute from "./routes/gebruikers.js"
import btwRoute from "./routes/btw.js"
import betalingstermijnenRoute from "./routes/betalingstermijnen.js"
import leveranciersRoute from "./routes/leveranciers.js"
import klantenRoute from "./routes/klanten.js"
import artikelenRoute from "./routes/artikels.js"
import tekstRoute from "./routes/tekst.js"

const app = Express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const origin = process.env.ORIGIN || "http://localhost:8080";
const io = new socketio.Server(server, {
  cors: {
    origin: origin,
  },
});


app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

io.on("connection", (socket) => {

  console.log(chalk.green("New socket connected"));

  socket.on("clicked", () => {
    console.log("Clicked the button");
    socket.broadcast.emit("clicked", "Your response from the server is here!!")
  })

  socket.on("leveranciers", () => {
    socket.broadcast.emit("leveranciers", "Your response from the server is here!!")
  })

  socket.on("klanten", () => {
    socket.broadcast.emit("klanten", "Your response from the server is here!!")
  })

  socket.on("artikels", () => {
    socket.broadcast.emit("artikels", "Your response from the server is here!!")
  })

  socket.on("andere", () => {
    // To use and to everyone else connected
    socket.emit("andere", "Your response from the server is here!!")
    socket.broadcast.emit("andere", "Your response from the server is here!!")
  })

  socket.on("disconnect", () => {
    console.log(chalk.red("A socket has disconnected..."));
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the API!!!");
});

app.use("/api/gebruikers/", gebruikersRoute);
app.use("/api/btw/", btwRoute);
app.use("/api/betalingstermijnen/", betalingstermijnenRoute);
app.use("/api/tekst/", tekstRoute);
app.use("/api/leveranciers/", leveranciersRoute);
app.use("/api/klanten/", klantenRoute);
app.use("/api/artikels/", artikelenRoute);

app.use((req, res, next) => {
  next(ApiError.notFound("Route not found"));
});

app.use(errorHandler);

server.listen(port, () => console.log(`Server is running on port ${port}`));
