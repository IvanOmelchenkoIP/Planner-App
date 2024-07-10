"use strict";

import Controller from "../libs/http-server/controller/controller.js";
import HttpFunctions from "../libs/http-server/http-functions/http-functions.js";

const homeController = new Controller();

homeController.route("/").methodGET(HttpFunctions.Render("/html/home.html"));

export default homeController;
