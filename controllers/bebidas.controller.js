const db = require("../db/db.js");


//METODO GET  - Para todas las bebidas


const allBebidas = (req, res) => {
  const sql = "SELECT * FROM bebidas"; 
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); 
  }); 
};

//METODO GET - Para una bebida

const showBebidas = (req, res) => {
  const { id } = req.params; 
  const sql = "SELECT * FROM productos WHERE id_bebidas = ?"; 
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

//METODO POST - agregar una bebida nueva 

const storeBebidas = (req, res) => {
  const { id, nombre, tamaño, categoria } = req.body; 
  const sql =
    "INSERT INTO bebidas (id, nombre, tamaño, categoria) VALUES (?, ?, ?,?)"; 
  db.query(sql, [id, nombre, tamaño, categoria], (error, result) => {
   
    console.log(result); 
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    const producto = { ...req.body, id_productos: result.insertId }; 
    res.status(201).json(producto); 
  });
};

// METODO PUT -Actualizar produccto  

const updateBebidas = (req, res) => {
  const { id } = req.params; 
  const { nombre, tamaño, categoria } = req.body; 

  const sql =
    "UPDATE bebidas SET nombre = ?, tipo = ?, categoria = ?  WHERE id_bebidas = ?"; 

  db.query(sql, [nombre, tipo, categoria], (error, result) => {
  
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: No se puede actualizar el producto" }); 
    }

    const bebidas = { id_bebidas: id, nombre, tamaño, categoria }; 
    res.json(bebidas); 
  });
};

// METODO DELETE 

const destroyBebidas = (req, res) => {
  const { id } = req.params; 
  const sql = "DELETE FROM bebidas WHERE id_bebidas = ?"; 

  db.query(sql, [id], (error, result) => {
   
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: La bebida no existe" }); 
    }
    res.json({ mensaje: "Bebida eliminada" }); 
  });
};


module.exports = {
  allBebidas,
  showBebidas,
  storeBebidas,
  updateBebidas,
  destroyBebidas,
};