"use strict";

import http from "http";
import fs from "fs";

class HttpServer {
  #port;
  #staticRoot;
  #server;
  constructor(port, staticRoot) {
    this.#port = port;
    this.#staticRoot = staticRoot;
    this.#server = http.createServer((req, res) => {
      const route = req.url;
      if (route == "./favicon.ico") return;
      if (route == "/") {
        const staticPath = this.#staticRoot + "/html/home.html";
        fs.readFile(staticPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end();
            return;
          }
          res.writeHead(200, { "Content-type": "text-html" });
          res.write(data);
          res.end();
        });
      }
    });
  }

  listen(listenHandle) {
    this.#server.listen(this.#port, () => {
      listenHandle(this.#port);
    });
    return this;
  }

  onError(errorHandle) {
    this.#server.on("error", (err) => {
      errorHandle(err);
    });
    return this;
  }
}

export default HttpServer;
