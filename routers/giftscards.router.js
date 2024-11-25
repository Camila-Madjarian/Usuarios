const express = require("express");
const router = express.Router();

const controller = require("../controllers/giftcards.controller");

//METODO GET ALL

router.get("/", controller.allGiftcards);

//Just one giftcard
router.get("/:id", controller.showGiftcards);

//METODO POST
router.post("/", controller.storeGiftcards);

// METODO PUT  
router.put("/:id", controller.updateGiftcards);

// METODO DELETE 
router.delete("/:id", controller.destroyGiftcards);

module.exports = router;