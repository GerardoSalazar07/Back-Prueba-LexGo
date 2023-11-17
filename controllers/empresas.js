const { response, request } = require('express');

const Empresa = require('../models/empresa');

const empresasPost = async(req = request, res = response) => {
    const { nombre } = req.body;
    const empresa = new Empresa({ nombre });

    await empresa.save();

    res.json(empresa);
}

const empresasGet = async(req = request, res = response) => {
    const empresas = await Empresa.find({});

    res.json(empresas);
}

const empresaGet = async(req = request, res = response) => {
    const { id } = req.params;
    const empresa = await Empresa.findById(id);

    res.json(empresa);
}

const empresasPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { nombre } = req.body;

    const empresa = await Empresa.findByIdAndUpdate(id, { nombre });

    res.json(empresa);
}

const empresasDelete = async(req = request, res = response) => {
    const { id } = req.params;
    const empresa = await Empresa.findByIdAndDelete(id);

    res.json(empresa);
}

module.exports = {
    empresasPost,
    empresasGet,
    empresaGet,
    empresasPut,
    empresasDelete
}