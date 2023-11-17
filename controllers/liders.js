const { response, request } = require('express');

const Lider = require('../models/lider');
const Empleado = require('../models/empleado');

const lidersPost = async(req = request, res = response) => {
    const { nombre, rol, departamento } = req.body;
    const lider = new Lider({ nombre, rol, departamento });

    await lider.save();

    res.json(lider);
}

const lidersGet = async(req = request, res = response) => {
    const liders = await Lider.find({});

    res.json(liders);
}

const liderGet = async(req = request, res = response) => {
    const { id } = req.params;
    const lider = await Lider.findById(id, 'nombre rol -_id')
        .populate({
            path: 'departamento',
            select: 'nombre',
            populate: {
                path: 'empresa',
                select: 'nombre -_id'
            }
        });

    const empleados = await Empleado.find({ departamento: lider.departamento._id }, 'nombre -_id');

    res.json({
        nombre: lider.nombre,
        rol: lider.rol,
        departamento: lider.departamento.nombre,
        empresa: lider.departamento.empresa.nombre,
        empleados: empleados.map((empleado) => empleado.nombre)

    });
}

const lidersPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { departamento } = req.body;

    const lider = await Lider.findByIdAndUpdate(id, { departamento });

    res.json(lider);
}

const lidersDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const lider = await Lider.findByIdAndDelete(id);

    res.json(lider);
}

module.exports = {
    lidersPost,
    lidersGet,
    liderGet,
    lidersPut,
    lidersDelete
}