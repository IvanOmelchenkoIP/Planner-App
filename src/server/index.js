"use strict";

import homeController from "./controller/home.js";
import HttpErrors from "./libs/http-server/http-error/http-errors.js";
import HttpFunctions from "./libs/http-server/http-functions/http-functions.js";
import HttpServer from "./libs/http-server/http-server.js";

const PORT = 3000;
const STATIC_ROOT = "./src/resources/static";

HttpServer.create(PORT, STATIC_ROOT)
  .onServerError((err) => {
    console.log(err);
  })
  .listen((port) => {
    console.log(`Listening at port ${port}`);
  })
  .onClientError(
    HttpErrors.NotFound,
    HttpFunctions.Render("/html/not-found.html")
  )
  .registerControllers(homeController);
