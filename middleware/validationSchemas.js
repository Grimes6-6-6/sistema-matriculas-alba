const idParam = {
  id: { type: 'integer', coerce: 'integer', required: true, min: 1 }
};

const estudianteIdParam = {
  estudiante_id: { type: 'integer', coerce: 'integer', required: true, min: 1 }
};

const estudianteIdCamelParam = {
  estudianteId: { type: 'integer', coerce: 'integer', required: true, min: 1 }
};

const dniParam = {
  dni: {
    type: 'string',
    required: true,
    pattern: /^\d{8}$/,
    message: 'DNI no valido'
  }
};

const common = {
  estado: {
    type: 'string',
    enum: ['activo', 'inactivo'],
    message: 'Estado no valido'
  },
  estadoRequired: {
    type: 'string',
    required: true,
    enum: ['activo', 'inactivo'],
    message: 'Estado no valido'
  },
  email: {
    type: 'string',
    maxLength: 120,
    emptyToNull: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Correo electronico no valido'
  },
  dni: {
    type: 'string',
    required: true,
    pattern: /^\d{8}$/,
    message: 'DNI debe tener 8 digitos'
  },
  telefono: {
    type: 'string',
    maxLength: 9,
    emptyToNull: true,
    pattern: /^\d{9}$/,
    message: 'Telefono debe tener 9 digitos'
  },
  nombrePersona: {
    type: 'string',
    required: true,
    minLength: 2,
    maxLength: 80,
    pattern: /^[\p{L}\s.'-]+$/u,
    message: 'Nombre solo debe contener letras'
  },
  textoCorto: {
    type: 'string',
    maxLength: 200,
    emptyToNull: true
  },
  textoLargo: {
    type: 'string',
    maxLength: 500,
    emptyToNull: true
  },
  fecha: {
    type: 'string',
    required: true,
    date: true,
    maxLength: 10
  },
  fechaOpcional: {
    type: 'string',
    date: true,
    maxLength: 10,
    emptyToNull: true
  },
  idBody: {
    type: 'integer',
    coerce: 'integer',
    required: true,
    min: 1
  },
  optionalIdBody: {
    type: 'integer',
    coerce: 'integer',
    min: 1,
    emptyToNull: true
  },
  dinero: {
    type: 'number',
    coerce: 'number',
    required: true,
    min: 0
  }
};

const estudianteBody = {
  dni: common.dni,
  nombres: common.nombrePersona,
  apellidos: common.nombrePersona,
  fecha_nacimiento: common.fecha,
  direccion: common.textoCorto,
  telefono: common.telefono,
  email: common.email,
  telefono_apoderado: common.telefono,
  nombre_apoderado: {
    ...common.nombrePersona,
    required: false,
    emptyToNull: true
  },
  estado: common.estado
};

const docenteBody = {
  nombres: common.nombrePersona,
  apellidos: common.nombrePersona,
  dni: common.dni,
  telefono: common.telefono,
  email: {
    ...common.email,
    required: true,
    emptyToNull: false
  },
  especialidad: common.textoCorto,
  estado: common.estado
};

const cursoBody = {
  nombre: {
    type: 'string',
    required: true,
    minLength: 2,
    maxLength: 120
  },
  descripcion: common.textoLargo,
  nivel: {
    type: 'string',
    maxLength: 80,
    emptyToNull: true
  },
  horario: {
    type: 'string',
    maxLength: 120,
    emptyToNull: true
  },
  cupos_totales: {
    type: 'integer',
    coerce: 'integer',
    required: true,
    min: 1,
    max: 300
  },
  cupos_disponibles: {
    type: 'integer',
    coerce: 'integer',
    min: 0,
    max: 300
  },
  precio: {
    type: 'number',
    coerce: 'number',
    required: true,
    min: 0,
    max: 99999
  },
  fecha_inicio: common.fechaOpcional,
  fecha_fin: common.fechaOpcional,
  docente_id: common.optionalIdBody,
  seccion: {
    type: 'string',
    maxLength: 40,
    emptyToNull: true
  },
  aula: {
    type: 'string',
    maxLength: 80,
    emptyToNull: true
  },
  ciclo_id: common.idBody,
  estado: common.estado
};

const matriculaCreateBody = {
  estudiante_id: common.idBody,
  curso_id: common.idBody,
  fecha_matricula: common.fecha,
  observaciones: common.textoLargo
};

const matriculaUpdateBody = {
  observaciones: common.textoLargo
};

const pagoCreateBody = {
  matricula_id: common.idBody,
  monto: {
    type: 'number',
    coerce: 'number',
    required: true,
    min: 0.01,
    max: 99999
  },
  fecha_pago: common.fecha,
  metodo_pago: {
    type: 'string',
    required: true,
    enum: ['efectivo', 'transferencia', 'deposito', 'yape', 'plin', 'tarjeta'],
    message: 'Metodo de pago no valido'
  },
  numero_recibo: {
    type: 'string',
    maxLength: 80,
    emptyToNull: true
  },
  observaciones: common.textoLargo,
  usuario_registro: {
    type: 'string',
    maxLength: 120,
    emptyToNull: true
  }
};

const portalLoginBody = {
  email: {
    ...common.email,
    required: true,
    emptyToNull: false
  },
  codigo: {
    type: 'string',
    required: true,
    minLength: 7,
    maxLength: 20,
    pattern: /^EST-\d{4,}$/i,
    message: 'Codigo de estudiante no valido'
  }
};

const docenteLoginBody = {
  email: {
    ...common.email,
    required: true,
    emptyToNull: false
  },
  dni: common.dni
};

const asistenciaCursoParam = {
  curso_id: {
    type: 'integer',
    coerce: 'integer',
    required: true,
    min: 1
  }
};

const asistenciaQuery = {
  fecha: common.fecha
};

const asistenciaBody = {
  matricula_id: common.idBody,
  fecha: common.fecha,
  estado: {
    type: 'string',
    required: true,
    enum: ['presente', 'ausente', 'tarde', 'justificado', 'no_registrado'],
    message: 'Estado de asistencia no valido'
  }
};

const seguimientoBody = {
  estudiante_id: common.idBody,
  comentario: {
    type: 'string',
    required: true,
    minLength: 5,
    maxLength: 1000
  },
  contacto_padre: common.textoCorto
};

const cicloCreateBody = {
  nombre: {
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 120
  },
  fecha_inicio: common.fechaOpcional,
  fecha_fin: common.fechaOpcional
};

const cicloEstadoBody = {
  estado: common.estadoRequired
};

const listEstadoQuery = {
  estado: common.estado
};

const cursosQuery = {
  estado: common.estado,
  ciclo_id: {
    type: 'integer',
    coerce: 'integer',
    min: 1
  }
};

const matriculasQuery = {
  estado_pago: {
    type: 'string',
    enum: ['pendiente', 'parcial', 'pagado'],
    message: 'Estado de pago no valido'
  },
  estado_matricula: {
    type: 'string',
    enum: ['activa', 'retirada', 'cancelada'],
    message: 'Estado de matricula no valido'
  }
};

const disponibilidadQuery = {
  ciclo_id: {
    type: 'integer',
    coerce: 'integer',
    required: true,
    min: 1
  },
  dia: {
    type: 'string',
    required: true,
    minLength: 4,
    maxLength: 80
  },
  docente_id: {
    type: 'integer',
    coerce: 'integer',
    min: 1
  },
  aula: {
    type: 'string',
    maxLength: 80
  },
  curso_id_excluir: {
    type: 'integer',
    coerce: 'integer',
    min: 1
  }
};

module.exports = {
  idParam,
  estudianteIdParam,
  estudianteIdCamelParam,
  dniParam,
  estudianteBody,
  docenteBody,
  cursoBody,
  matriculaCreateBody,
  matriculaUpdateBody,
  pagoCreateBody,
  portalLoginBody,
  docenteLoginBody,
  asistenciaCursoParam,
  asistenciaQuery,
  asistenciaBody,
  seguimientoBody,
  cicloCreateBody,
  cicloEstadoBody,
  listEstadoQuery,
  cursosQuery,
  matriculasQuery,
  disponibilidadQuery
};
