const express = require("express");
const router = express.Router();

const controller = require("../controllers/postres.controller");

//METODO GET ALL

router.get("/", controller.allPostres);

//Just one dessert
router.get("/:id", controller.showPostres);

//METODO POST
router.post("/", controller.storePostres);

// METODO PUT  
router.put("/:id", controller.updatePostres);

// METODO DELETE 
router.delete("/:id", controller.destroyPostres);

module.exports = router;