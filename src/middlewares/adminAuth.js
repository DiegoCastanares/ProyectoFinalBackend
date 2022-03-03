const express = require("express");

const admin = true;
const middlewareAuth = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.send({
      status: "error",
      error: `ruta /api/productos${req.url} método ${req.method} no autorizado`,
    });
  }
};

module.exports = middlewareAuth;
