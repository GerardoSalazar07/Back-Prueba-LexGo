const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    }
});

EmpleadoSchema.methods.toJSON = function() {
    const { __v, _id, ...empleado  } = this.toObject();
    empleado.id = _id;
    return empleado;
}

module.exports = model('Empleado', EmpleadoSchema);