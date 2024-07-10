"use strict";

import fs from "fs";

class StaticManager {
  #root;
  #cache;

  constructor(root) {
    this.#root = root;
    this.#cache = new Map();
  }

  async getStatic(relativePath) {
    const cacheData = this.#cache.get(relativePath);
    if (cacheData) return { data: cacheData, err: null };
    const absolutePath = this.#root + relativePath;
    try {
      const fileData = await fs.promises.readFile(absolutePath, "utf-8");
      this.#cache.set(relativePath, fileData);
      return { data: fileData, err: null };
    } catch (err) {
      return { data: null, err: err };
    }
  }
}

export default StaticManager;
