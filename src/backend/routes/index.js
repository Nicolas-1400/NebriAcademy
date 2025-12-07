const express = require("express");

module.exports = (Model) => {
  const router = express.Router();
  // Importa el controlador y lo inicializa con el modelo
  const controller = require("../controllers/homeController")(Model);

  // Define las rutas CRUD
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};
