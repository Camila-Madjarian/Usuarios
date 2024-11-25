const express = require("express");
const router = express.Router();
const controller = require("../controllers/productos.controller");



module.exports = router;

//método get
//para todos los productos
router.get('/', controller.allProductos);

//para un producto
router.get('/id',controller.showProductos);

//método post
router.post('/', controller.storeProductos);

//método put
router.put('/:id_productos', controller.updateProductos);

//método delete
router.delete("/:id, controller.destroyProductos");

