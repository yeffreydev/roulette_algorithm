import express from "express";
import http from "http";
import path from "path";
import numbersRowsRoutes from "./router/numbers_rows.routes";
import routes from "./router/routes";
import cors from "cors";
//define app
const app = express();

//express configuration and JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//app routes
app.use(routes);

//number routes
app.use(numbersRowsRoutes);

//app server static files
app.use("/", express.static(path.join(__dirname, "./../public")));

//create http server
const server = http.createServer(app);

//export server
export default server;
