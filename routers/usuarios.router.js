const express = require("express");
const router = express.Router();

//MULTER
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "imagenes"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }, 
});

//configuración del multer
const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    const filetypes = /jpg|jpeg|png|webp/; //tipos de archivos
    const mimetype = filetypes.test(file.mimetype); 
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no soportado"));
    }
  },
  limits: { fileSize: 1024 * 1024 * 3 }, 
});


const controller = require("../controllers/usuarios.controller");
//METODO GET
//para todos los usuarios
router.get("/", controller.allUsuarios);

//para un usuario
router.get("/:id", controller.showUsuarios);

//METODO POST
router.post("/", uploads.single("foto"), controller.storeUsuarios); //


// METODO PUT 
// router.put("/:id", upload.single("imagen"), controller.updateUsuario);

// METODO DELETE 
// router.delete("/:id", controller.destroyUsuario);

// router.post("/login", controller.login);

//exportar las rutas,routers
module.exports = router;