const db = require("../db/db");


// user.controller.js

// Controlador para obtener usuarios
exports.getUsers = (req, res) => {
    res.send('Lista de usuarios');
};

// Controlador para crear un usuario
exports.createUser = (req, res) => {
    res.send('Usuario creado');
};

const allComments = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
            if(error){
                return res.status(500).json({error: "ERROR: Intente luego"});
          }

            res.json(rows);
        }
)};