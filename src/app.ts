import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./routes";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
const httpServer = createServer(app);

const io = new Server(httpServer);

export default httpServer;
