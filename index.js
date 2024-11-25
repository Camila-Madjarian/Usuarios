const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());


const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);

const productosRouter = require('./routers/productos.router');
app.use('/productos', productosRouter);




// require("dotenv").config();
//ruta principal

app.get("/", (req,res)=> {
    res.send("Hola Usuario");

});

app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('http://localhost:${PORT}'));


