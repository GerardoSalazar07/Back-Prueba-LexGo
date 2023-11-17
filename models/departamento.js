const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    }
});

DepartamentoSchema.methods.toJSON = function() {
    const { __v, _id, ...departamento  } = this.toObject();
    departamento.id = _id;
    return departamento;
}

module.exports = model('Departamento', DepartamentoSchema);