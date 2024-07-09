"use strict";

import homeController from "./controller/home.js";
import HttpServer from "./libs/http-server/http-server.js";

const PORT = 3000;
const STATIC_ROOT = "./src/resources/static";

new HttpServer(PORT, STATIC_ROOT)
  .onServerError((err) => {
    console.log(err);
  })
  .listen((port) => {
    console.log(`Listening at port ${port}`);
  })
  .registerControllers(homeController);
