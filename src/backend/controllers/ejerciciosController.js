const Modelo = require('../models/Ejercicios');

module.exports = {
  getAll: async (req, res) => res.json(await Modelo.findAll()),
  getById: async (req, res) => res.json(await Modelo.findByPk(req.params.id)),
  create: async (req, res) => res.json(await Modelo.create(req.body)),
  update: async (req, res) => {
    await Modelo.update(req.body, { where: { id: req.params.id } });
    res.json({ mensaje: "Actualizado" });
  },
  delete: async (req, res) => {
    await Modelo.destroy({ where: { id: req.params.id } });
    res.json({ mensaje: "Borrado" });
  }
};
