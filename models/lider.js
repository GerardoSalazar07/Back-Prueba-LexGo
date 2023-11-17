const { Schema, model } = require('mongoose');

const LiderSchema = Schema({
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

LiderSchema.methods.toJSON = function() {
    const { __v, _id, ...lider  } = this.toObject();
    lider.id = _id;
    return lider;
}

module.exports = model('Lider', LiderSchema);