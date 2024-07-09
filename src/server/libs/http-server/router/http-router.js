"use strict";

import HttpErrors from "../http-error/http-errors.js";

class HttpRouter {
  #routes;

  constructor() {
    this.#routes = new Map();
  }

  registerControllers(...controllers) {
    for (const controller of controllers) {
      const builtController = controller.build();
      if (builtController.length == 0) continue;
      const builtRoutes = Object.keys(builtController);
      for (const builtRoute of builtRoutes) {
        this.#routes.set(builtRoute, builtController[builtRoute]);
      }
    }
  }

  handle(req, res, route, staticRouter, staticManager, errorManager) {
    const controller = this.#routes.get(route);
    if (!controller) {
      const notFoundHandle = errorManager.get(HttpErrors.NotFound);
      notFoundHandle(req, res);
      return;
    }
    const controllerMethodObject = controller[req.method];
    if (!controllerMethodObject) {
      const notFoundHandle = errorManager.get(HttpErrors.NotFound);
      notFoundHandle(req, res);
      return;
    }
    const { fn, params } = controllerMethodObject;
    fn(req, res, staticRouter, staticManager, errorManager, ...params);
  }
}

export default HttpRouter;
