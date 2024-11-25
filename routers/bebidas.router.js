const express = require("express");
const router = express.Router();

const controller = require("../controllers/bebidas.controller");

//METODO GET ALL

router.get("/", controller.allBebidas);

//Just one drink
router.get("/:id", controller.showBebidas);

//METODO POST
router.post("/", controller.storeBebidas);

// METODO PUT  
router.put("/:id", controller.updateBebidas);

// METODO DELETE 
router.delete("/:id", controller.destroyBebidas);

module.exports = router;