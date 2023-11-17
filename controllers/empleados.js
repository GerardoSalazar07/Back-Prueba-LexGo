const { response, request } = require('express');

const Empleado = require('../models/empleado');
const Lider = require('../models/lider');

const empleadosPost = async(req = request, res = response) => {
    const { nombre, rol, departamento } = req.body;
    const empleado = new Empleado({ nombre, rol, departamento });

    await empleado.save();

    res.json(empleado);
}

const empleadosGet = async(req = request, res = response) => {
    const empleados = await Empleado.find({});

    res.json(empleados);
}

const empleadoGet = async(req = request, res = response) => {
    const { id } = req.params;
    const empleado = await Empleado.findById(id, 'nombre rol -_id')
        .populate({
            path: 'departamento',
            select: 'nombre',
            populate: {
                path: 'empresa',
                select: 'nombre -_id'
            }
        });

    const lider = await Lider.findOne({ departamento: empleado.departamento._id }, 'nombre -_id');

    res.json({
        nombre: empleado.nombre,
        rol: empleado.rol,
        lider: lider?.nombre || null,
        departamento: empleado.departamento.nombre,
        empresa: empleado.departamento.empresa.nombre

    });
}

const empleadosPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { departamento } = req.body;

    const empleado = await Empleado.findByIdAndUpdate(id, { departamento });

    res.json(empleado);
}

const empleadosDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const empleado = await Empleado.findByIdAndDelete(id);

    res.json(empleado);
}

module.exports = {
    empleadosPost,
    empleadosGet,
    empleadoGet,
    empleadosPut,
    empleadosDelete
}