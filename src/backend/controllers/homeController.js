module.exports = (Model) => ({
  getAll: async (req, res) => {
    try {
      const rows = await Model.findAll();
      res.status(200).json({
        success: true,
        count: rows.length,
        data: rows
      });
    } catch (err) {
      console.error(`[ERROR] getAll:`, err.message);
      res.status(500).json({
        success: false,
        error: 'Error al obtener registros',
        message: err.message
      });
    }
  },

  getById: async (req, res) => {
    try {
      if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }
      const row = await Model.findByPk(req.params.id);
      if (!row) {
        return res.status(404).json({
          success: false,
          error: 'Registro no encontrado',
          id: req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: row
      });
    } catch (err) {
      console.error(`[ERROR] getById:`, err.message);
      res.status(500).json({
        success: false,
        error: 'Error al obtener registro',
        message: err.message
      });
    }
  },

  create: async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Datos vacíos',
          message: 'El cuerpo de la solicitud no puede estar vacío'
        });
      }
      const created = await Model.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Registro creado exitosamente',
        data: created
      });
    } catch (err) {
      console.error(`[ERROR] create:`, err.message);
      
      // Manejo específico de errores de validación Sequelize
      if (err.name === 'SequelizeUniqueConstraintError') {
        const fields = err.errors.map(e => e.path).join(', ');
        return res.status(409).json({
          success: false,
          error: 'Conflicto: Campo duplicado',
          fields: fields,
          message: `Los campos ${fields} ya existen en la base de datos`
        });
      }
      
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => ({
          field: e.path,
          message: e.message
        }));
        return res.status(422).json({
          success: false,
          error: 'Error de validación',
          validationErrors: errors
        });
      }
      
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({
          success: false,
          error: 'Violación de clave foránea',
          message: 'El registro referenciado no existe o la operación violaría una restricción de integridad',
          details: err.message
        });
      }
      
      // Detectar error de foreign key por patrón de mensaje
      if (err.message && err.message.includes('foreign key')) {
        return res.status(409).json({
          success: false,
          error: 'Violación de clave foránea',
          message: 'El registro referenciado no existe. Verifique que los IDs de referencias existan.',
          details: err.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Error al crear registro',
        message: err.message
      });
    }
  },

  update: async (req, res) => {
    try {
      if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }
      
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Datos vacíos',
          message: 'El cuerpo de la solicitud no puede estar vacío'
        });
      }
      
      const [updatedCount] = await Model.update(req.body, {
        where: { id: req.params.id },
        individualHooks: true
      });
      
      if (updatedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Registro no encontrado',
          id: req.params.id
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Registro actualizado exitosamente',
        id: req.params.id
      });
    } catch (err) {
      console.error(`[ERROR] update:`, err.message);
      
      if (err.name === 'SequelizeUniqueConstraintError') {
        const fields = err.errors.map(e => e.path).join(', ');
        return res.status(409).json({
          success: false,
          error: 'Conflicto: Campo duplicado',
          fields: fields,
          message: `Los campos ${fields} ya existen en la base de datos`
        });
      }
      
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => ({
          field: e.path,
          message: e.message
        }));
        return res.status(422).json({
          success: false,
          error: 'Error de validación',
          validationErrors: errors
        });
      }
      
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({
          success: false,
          error: 'Violación de clave foránea',
          message: 'El registro referenciado no existe o la operación violaría una restricción de integridad',
          details: err.message
        });
      }
      
      // Detectar error de foreign key por patrón de mensaje
      if (err.message && err.message.includes('foreign key')) {
        return res.status(409).json({
          success: false,
          error: 'Violación de clave foránea',
          message: 'El registro referenciado no existe. Verifique que los IDs de referencias existan.',
          details: err.message
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Error al actualizar registro',
        message: err.message
      });
    }
  },

  delete: async (req, res) => {
    try {
      if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }
      
      const deletedCount = await Model.destroy({
        where: { id: req.params.id }
      });
      
      if (deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Registro no encontrado',
          id: req.params.id
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Registro eliminado exitosamente',
        id: req.params.id
      });
    } catch (err) {
      console.error(`[ERROR] delete:`, err.message);
      res.status(500).json({
        success: false,
        error: 'Error al eliminar registro',
        message: err.message
      });
    }
  }
});
