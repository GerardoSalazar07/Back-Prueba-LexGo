const { response, request } = require('express');

const Departamento = require('../models/departamento');
const Lider = require('../models/lider');
const Empleado = require('../models/empleado');

const departamentosPost = async(req = request, res = response) => {
    const { nombre, empresa } = req.body;
    const departamento = new Departamento({ nombre, empresa });

    await departamento.save();

    res.json(departamento);
}

const departamentosGet = async(req = request, res = response) => {
    const departamentos = await Departamento.find({});

    res.json(departamentos);
}

const departamentoGet = async(req = request, res = response) => {
    const { id } = req.params;
    const departamento = await Departamento.findById(id, 'nombre _id')
        .populate({
            path: 'empresa',
            select: 'nombre -_id'
        });

    const lider = await Lider.findOne({ departamento: departamento.id }, 'nombre -_id');
    const empleados = await Empleado.find({ departamento: departamento.id }, 'nombre -_id');

    res.json({
        nombre: departamento.nombre,
        empresa: departamento.empresa.nombre,
        lider: lider?.nombre || null,
        empleados: empleados.map((empleado) => empleado.nombre)
    });
}

const departamentosPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { nombre, empresa } = req.body;

    const departamento = await Departamento.findByIdAndUpdate(id, { nombre, empresa });

    res.json(departamento);
}

const departamentosDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const departamento = await Departamento.findByIdAndDelete(id);

    res.json(departamento);
}

module.exports = {
    departamentosPost,
    departamentosGet,
    departamentoGet,
    departamentosPut,
    departamentosDelete
}