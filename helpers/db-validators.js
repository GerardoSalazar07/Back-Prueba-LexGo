const Empresa = require('../models/empresa');
const Departamento = require('../models/departamento');
const Lider = require('../models/lider');
const Empleado = require('../models/empleado');

const existeEmpresaPorId = async(id) => {
    const existeEmpresa = await Empresa.findById(id);
    if (!existeEmpresa) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeDepartamentoPorId = async(id) => {
    const existeDepartamento = await Departamento.findById(id);
    if (!existeDepartamento) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeLiderPorId = async(id) => {
    const existeLider = await Lider.findById(id);
    if (!existeLider) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existeEmpleadoPorId = async(id) => {
    const existeEmpleado = await Empleado.findById(id);
    if (!existeEmpleado) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    existeEmpresaPorId,
    existeDepartamentoPorId,
    existeLiderPorId,
    existeEmpleadoPorId
}