const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});

EmpresaSchema.methods.toJSON = function() {
    const { __v, _id, ...empresa  } = this.toObject();
    empresa.id = _id;
    return empresa;
}

module.exports = model('Empresa', EmpresaSchema);