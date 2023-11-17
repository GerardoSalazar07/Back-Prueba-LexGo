
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { empresasPost, empresasPut, empresasGet, empresaGet, empresasDelete } = require('../controllers/empresas');
const { existeEmpresaPorId } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , empresasPost);

router.get('/', empresasGet);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    validarCampos
], empresaGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], empresasPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    validarCampos
], empresasDelete);

module.exports = router;