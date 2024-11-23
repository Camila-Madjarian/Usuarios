const express = require("express");
const app = express();

app.use(express.json());


const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);

const productosRouter = require('./routers/productos.router');
app.use('/productos', productosRouter);

app.get("/", (req,res)=> {
    res.send("Hola Usuario");

});

const PORT = 3000;
app.listen(PORT, ()=> console.log('http://localhost:${PORT}'));
