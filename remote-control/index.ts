import { wss as websocketServer } from "./src/websocket/websocket";
import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT);
console.log(`Start static http server http://localhost:${HTTP_PORT} on the port ${HTTP_PORT}!`);

websocketServer;