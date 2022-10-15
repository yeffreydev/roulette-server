import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
app.use(express.json());
const httpServer = createServer(app);

const io = new Server(httpServer);

export default httpServer;
