"use strict";

import { testExtension } from "../../utils/extension.js";
import HttpRouter from "./http-router.js";
import StaticRouter from "./static-router.js";

const testStatic = testExtension("html", "css", "js");

class RouterManager {
  #httpRouter;
  #staticRouter;
  #staticManager;

  constructor(staticManager) {
    this.#httpRouter = new HttpRouter();
    this.#staticRouter = new StaticRouter();
    this.#staticManager = staticManager;
  }

  handle(req, res, errorManager) {
    const route = req.url;
    if (route == "./favicon.io") return;
    if (testStatic(route)) {
      this.#staticRouter.handle(
        req,
        res,
        route,
        this.#staticManager,
        errorManager
      );
    } else {
      this.#httpRouter.handle(
        req,
        res,
        route,
        this.#staticRouter,
        this.#staticManager,
        errorManager
      );
    }
  }

  registerControllers(...controllers) {
    this.#httpRouter.registerControllers(...controllers);
  }
}

export default RouterManager;
