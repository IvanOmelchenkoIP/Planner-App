"use strict";

const render = (html) => {
  const renderInner = async (
    req,
    res,
    staticRouter,
    staticManager,
    errorManager,
    ...params
  ) => {
    await staticRouter.handle(req, res, params[0], staticManager, errorManager);
  };
  return { fn: renderInner, params: [html] };
};

export default render;
