
/**
 * path: api/login
 */

const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controller/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],crearUsuario);

router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;