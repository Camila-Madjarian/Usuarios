const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios.controller");

router.get('/usuarios', usuariosController.getusuarios);

module.exports = router;

//método get
//para todos los usuarios
router.get('/', controller.allComments);

//para un usuario
router.get('/id',controller.showComments);

//método post
router.post('/', controller.storeComments);

//método put
router.put('/:id_usuarios', controller.updateComments);

