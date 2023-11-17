
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { empleadosPost, empleadosPut, empleadosGet, empleadoGet, empleadosDelete } = require('../controllers/empleados');
const { existeEmpleadoPorId, existeDepartamentoPorId } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(existeDepartamentoPorId),
    validarCampos
] , empleadosPost);

router.get('/', empleadosGet);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpleadoPorId),
    validarCampos
], empleadoGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpleadoPorId),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(existeDepartamentoPorId),
    validarCampos
], empleadosPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpleadoPorId),
    validarCampos
], empleadosDelete);

module.exports = router;