module.exports = (Modelo) => ({
  // Obtiene todos los registros
  getAll: async (req, res) => {
    try {
      const filas = await Modelo.findAll();
      res.status(200).json({
        success: true,
        count: filas.length,
        data: filas
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

  // Obtiene un registro por ID
  getById: async (req, res) => {
    try {
      if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }
      const fila = await Modelo.findByPk(req.params.id);
      if (!fila) {
        return res.status(404).json({
          success: false,
          error: 'Registro no encontrado',
          id: req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: fila
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

  // Crea un nuevo registro
  create: async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Datos vacíos',
          message: 'El cuerpo de la solicitud no puede estar vacío'
        });
      }
      const creado = await Modelo.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Registro creado exitosamente',
        data: creado
      });
    } catch (err) {
      console.error(`[ERROR] create:`, err.message);
      if (err.name === 'SequelizeUniqueConstraintError') {
        const campos = err.errors.map(e => e.path).join(', ');
        return res.status(409).json({
          success: false,
          error: 'Conflicto: Campo duplicado',
          fields: campos,
          message: `Los campos ${campos} ya existen en la base de datos`
        });
      }
      
      if (err.name === 'SequelizeValidationError') {
        const errores = err.errors.map(e => ({
          field: e.path,
          message: e.message
        }));
        return res.status(422).json({
          success: false,
          error: 'Error de validación',
          validationErrors: errores
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

  // Actualiza un registro por ID
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
      
      const [conteoActualizado] = await Modelo.update(req.body, {
        where: { id: req.params.id },
        individualHooks: true
      });
      
      if (conteoActualizado === 0) {
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
      console.error(`[ERROR] actualizar:`, err.message);
      
      if (err.name === 'SequelizeUniqueConstraintError') {
        const campos = err.errors.map(e => e.path).join(', ');
        return res.status(409).json({
          success: false,
          error: 'Conflicto: Campo duplicado',
          fields: campos,
          message: `Los campos ${campos} ya existen en la base de datos`
        });
      }
      
      if (err.name === 'SequelizeValidationError') {
        const errores = err.errors.map(e => ({
          field: e.path,
          message: e.message
        }));
        return res.status(422).json({
          success: false,
          error: 'Error de validación',
          validationErrors: errores
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

  // Elimina un registro por ID
  delete: async (req, res) => {
    try {
      if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }
      
      const conteoEliminado = await Modelo.destroy({
        where: { id: req.params.id }
      });
      
      if (conteoEliminado === 0) {
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
