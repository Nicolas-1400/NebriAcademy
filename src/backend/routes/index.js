const express = require('express');

module.exports = (Model) => {
  const router = express.Router();
  const controller = require('../controllers/homeController')(Model);

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
