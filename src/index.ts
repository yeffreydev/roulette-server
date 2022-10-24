import httpServer from "./app";
import config from "./config/development";
httpServer.listen(config.port, () =>
  console.log("server running on port ", config.port)
);
