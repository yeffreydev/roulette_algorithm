import server from "./app";
import config from "./config";
server.listen(config.PORT, () =>
  console.log("server running on port: " + config.PORT)
);
