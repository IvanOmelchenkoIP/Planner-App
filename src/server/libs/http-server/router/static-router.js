"use strict";

import { getExtension } from "../../utils/extension.js";
import STATIC_MIME_TYPES from "../static/static-types.js";
import HttpErrors from "../http-error/http-errors.js";

class StaticRouter {
  constructor() {}

  async handle(req, res, filepath, staticManager, errorManager) {
    const { data, err } = await staticManager.getStatic(filepath);
    if (err) {
      if (err.code == "ENOENT") {
        const notFoundProcessor = errorManager.get(HttpErrors.NotFound);
        if (notFoundHandle instanceof Function) {
          notFoundHandle(req, res);
        } else {
          const { controllerMethod, params } = notFoundHandle;
          controllerMethod(
            req,
            res,
            staticRouter,
            staticManager,
            errorManager,
            ...params
          );
        }
        return;
      }
      throw new Error(`Error occured while processing file ${html}`);
    }
    const extension = getExtension(filepath);
    res.writeHead(200, STATIC_MIME_TYPES[extension]);
    res.write(data);
    res.end();
  }
}

export default StaticRouter;
