const express = require("express");
const router = express.Router();

const controller = require("../controllers/guarniciones.controller");

//METODO GET ALL

router.get("/", controller.allGuarniciones);

//Just one side dish
router.get("/:id", controller.showGuarniciones);

//METODO POST
router.post("/", controller.storeGuarniciones);

// METODO PUT  
router.put("/:id", controller.updateGuarniciones);

// METODO DELETE 
router.delete("/:id", controller.destroyGuarniciones);

module.exports = router;