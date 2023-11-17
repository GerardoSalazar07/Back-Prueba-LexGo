
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { departamentosPost, departamentosPut, departamentosGet, departamentoGet, departamentosDelete } = require('../controllers/departamentos');
const { existeDepartamentoPorId, existeEmpresaPorId } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('empresa', 'No es un ID válido').isMongoId(),
    check('empresa').custom(existeEmpresaPorId),
    validarCampos
] , departamentosPost);

router.get('/', departamentosGet);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDepartamentoPorId),
    validarCampos
], departamentoGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDepartamentoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('empresa', 'No es un ID válido').isMongoId(),
    check('empresa').custom(existeEmpresaPorId),
    validarCampos
], departamentosPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeDepartamentoPorId),
    validarCampos
], departamentosDelete);

module.exports = router;