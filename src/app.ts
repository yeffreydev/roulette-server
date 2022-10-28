import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(router);
const httpServer = createServer(app);

const io = new Server(httpServer);

export default httpServer;
