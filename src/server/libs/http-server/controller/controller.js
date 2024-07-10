"use strict";

import isEmpty from "../../utils/object.js";

class Controller {
  #controllerData;

  constructor() {
    this.#controllerData = {
      route: "",
      methods: {},
      nested: [],
    };
  }

  route(route) {
    this.#controllerData.route = route;
    return this;
  }

  methodPOST(handle) {
    this.#controllerData.methods["POST"] = handle;
    return this;
  }

  methodGET(handle) {
    this.#controllerData.methods["GET"] = handle;
  }

  methodDELETE(handle) {
    this.#controllerData.methods["DELETE"] = handle;
  }

  nest(...nestedCollection) {
    this.#controllerData.nested.push(...nestedCollection);
  }

  build() {
    const route = this.#controllerData.route;
    const nestedCollection = this.#controllerData.nested;
    const registered = {};
    if (nestedCollection.length > 0) {
      for (const nested of nestedCollection) {
        const registeredNested = nested.register();
        if (registeredNested.length == 0) continue;
        const nestedRoutes = Object.keys(registeredNested);
        for (const nestedRoute of nestedRoutes) {
          const absoluteRoute = route + nestedRoute;
          const nestedMethods = registeredNested[nestedRoute];
          registered[absoluteRoute] = nestedMethods;
        }
      }
    }
    const methods = this.#controllerData.methods;
    if (!isEmpty(methods)) registered[route] = methods;
    return registered;
  }
}

export default Controller;
