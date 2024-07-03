"use strict";

import HttpServer from "./server-files/http-server.js";

const PORT = 3000;
const STATIC_ROOT = "./src/resources/static";

new HttpServer(PORT, STATIC_ROOT)
  .onServerError((err) => {
    console.log(err);
  })
  .listen((port) => {
    console.log(`Listening at port ${port}`);
  })
  .onNotFoundError((req, res) => {
    res.writeHead(404, { "Content-type": "plain/text" });
    res.write("NotFound");
    res.end();
  });
