const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productos.controller");

router.get('/productos', productosController.getproductos);

module.exports = router;

//método get
//para todos los usuarios
router.get('/', controller.allComments);

//para un usuario
router.get('/id',controller.showComments);

//método post
router.post('/', controller.storeComments);

//método put
router.put('/:id_productos', controller.updateComments);

