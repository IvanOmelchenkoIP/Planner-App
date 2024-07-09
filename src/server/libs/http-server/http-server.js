"use strict";

import http from "http";

import RouterManager from "./router/router-manager.js";
import HttpErrors from "./http-error/http-errors.js";
import StaticManager from "./static/static-manager.js";

const defaultNotFoundHandle = (req, res) => {
  res.writeHead(404, { "Content-type": "plain/text" });
  res.end();
};

class HttpServer {
  #port;
  #server;
  #router;
  #httpErrorManager;
  constructor(port, staticRoot) {
    this.#port = port;
    this.#httpErrorManager = new Map();
    this.#httpErrorManager.set(HttpErrors.NotFound, defaultNotFoundHandle);
    this.#router = new RouterManager(new StaticManager(staticRoot));
    this.#server = http.createServer((req, res) => {
      this.#router.handle(req, res, this.#httpErrorManager);
    });
  }

  listen(listenHandle) {
    this.#server.listen(this.#port, () => {
      listenHandle(this.#port);
    });
    return this;
  }

  onServerError(errorHandle) {
    this.#server.on("error", (err) => {
      errorHandle(err);
    });
    return this;
  }

  onClientError(error, handle) {
    this.#httpErrorManager.set(error, handle);
    return this;
  }

  registerControllers(...controllers) {
    this.#router.registerControllers(...controllers);
    return this;
  }
}

export default HttpServer;
