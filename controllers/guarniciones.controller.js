const db = require("../db/db.js");


//METODO GET  - Para todas las guarniciones


const allGuarniciones = (req, res) => {
  const sql = "SELECT * FROM guarniciones"; 
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); 
  }); 
};

//METODO GET - Para una guarnicion 

const showGuarniciones = (req, res) => {
  const { id } = req.params; 
  const sql = "SELECT * FROM guarniciones WHERE id_guarniciones = ?"; 
  db.query(sql, [id], (error, rows) => {
   
    console.log(rows); 
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (rows.length == 0) {
      return res
        .status(400)
        .send({ error: "ERROR: El producto no existe" }); 
    }
    res.json(rows[0]); 
  });
};

//METODO POST - agregar guarnicion nueva 

const storeGuarniciones = (req, res) => {
  const { id, nombre, tipo, tamaño } = req.body; 
  const sql =
    "INSERT INTO guarniciones (id, nombre, tipo, tamaño) VALUES ( ?, ?, ?,?)"; 
  db.query(sql, [id, nombre, tipo, tamaño], (error, result) => {
   
    console.log(result); 
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    const guarniciones = { ...req.body, id_guarniciones: result.insertId }; 
    res.status(201).json(guarniciones); 
  });
};

// METODO PUT -Actualizar guarnicion  

const updateGuarniciones = (req, res) => {
  const { id } = req.params; 
  const { nombre, tipo, tamaño } = req.body; 

  const sql =
    "UPDATE guarniciones SET nombre = ?, tipo = ?, tamaño = ?   WHERE id_productos = ?"; 

  db.query(sql, [nombre, tipo, tamaño], (error, result) => {
  
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: No se puede actualizar" }); 
    }

    const guarniciones = { id_guarniciones: id, nombre, tipo, tamaño }; 
    res.json(guarniciones); 
  });
};

// METODO DELETE 

const destroyGuarniciones = (req, res) => {
  const { id } = req.params; 
  const sql = "DELETE FROM guarniciones WHERE id_guarniciones = ?"; 

  db.query(sql, [id], (error, result) => {
   
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: el producto no existe" }); 
    }
    res.json({ mensaje: "Producto eliminado" }); 
  });
};


module.exports = {
  allGuarniciones,
  showGuarniciones,
  storeGuarniciones,
  updateGuarniciones,
  destroyGuarniciones,
};