"use strict";

import http from "http";
import fs from "fs";

const isRouteStatic = (route) => {
  const staticRegex = /\.(html|css|js)$/;
  return staticRegex.test(route);
};

const getExtention = (filepath) => filepath.split(".").pop();

class HttpServer {
  #port;
  #staticRoot;
  #server;
  #cache;
  constructor(port, staticRoot) {
    this.#port = port;
    this.#staticRoot = staticRoot;
    this.#cache = new Map();
    this.#server = http.createServer((req, res) => {
      const route = req.url;
      if (route == "./favicon.ico") return;
      if (isRouteStatic(route)) {
        const STATIC_CONTENT_TYPES = {
          html: { "Content-type": "text/html" },
          css: { "Content-type": "text/css" },
          js: { "Content-type": "text/javascript" },
        };
        const data = this.#cache.get(route);
        const extension = getExtention(route);
        const contentType = STATIC_CONTENT_TYPES[extension];
        if (data) {
          res.writeHead(200, contentType);
          res.write(data);
          res.end();
          return;
        }
        const staticPath = this.#staticRoot + route;
        fs.readFile(staticPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end();
            return;
          }
          this.#cache.set(route, data);
          res.writeHead(200, contentType);
          res.write(data);
          res.end();
        });
      }
      if (route == "/") {
        const relativePath = "/html/home.html";
        const data = this.#cache.get(relativePath);
        if (data) {
          res.writeHead(200, { "Content-type": "text/html" });
          res.write(data);
          res.end();
          return;
        }
        const staticPath = this.#staticRoot + relativePath;
        fs.readFile(staticPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end();
            return;
          }
          this.#cache.set(relativePath, data);
          res.writeHead(200, { "Content-type": "text/html" });
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
