
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { lidersPost, lidersPut, lidersGet, liderGet, lidersDelete } = require('../controllers/liders');
const { existeLiderPorId, existeDepartamentoPorId } = require('../helpers/db-validators');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(existeDepartamentoPorId),
    validarCampos
] , lidersPost);

router.get('/', lidersGet);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeLiderPorId),
    validarCampos
], liderGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeLiderPorId ),
    check('departamento', 'No es un ID válido').isMongoId(),
    check('departamento').custom(existeDepartamentoPorId),
    validarCampos
], lidersPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeLiderPorId),
    validarCampos
], lidersDelete);

module.exports = router;