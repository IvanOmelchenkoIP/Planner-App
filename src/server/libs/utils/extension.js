"use strict";

const getExtension = (filepath) => filepath.split(".").pop();

const testExtension = (...extensions) => {
  let regexpPattern = ".(";
  for (let i = 0; i < extensions.length - 1; i++) {
    const extension = extensions[i];
    regexpPattern += extension + "|";
  }
  regexpPattern += extensions.pop() + ")$";
  const regexp = new RegExp(regexpPattern);
  return (filepath) => regexp.test(filepath);
};

export { getExtension, testExtension };
