const db = require("../db/db.js");


//METODO GET  - Para todos los postres


const allPostres = (req, res) => {
  const sql = "SELECT * FROM postres"; 
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); 
  }); 
};

//METODO GET - Para un postre

const showPostres = (req, res) => {
  const { id } = req.params; 
  const sql = "SELECT * FROM postres WHERE id_postres = ?"; 
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
        .send({ error: "ERROR: El postre no existe" }); 
    }
    res.json(rows[0]); 
  });
};

//METODO POST - agregar postre nuevo 

const storePostres = (req, res) => {
  const { id, nombre, tamaño, categoria, tipo } = req.body; 
  const sql =
    "INSERT INTO postres (id, nombre, tamaño, categoria, tipo) VALUES (?, ?, ?,?, ?)"; 
  db.query(sql, [id, nombre, tamaño, categoria, tipo], (error, result) => {
   
    console.log(result); 
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    const postres = { ...req.body, id_postres: result.insertId }; 
    res.status(201).json(postres); 
  });
};

// METODO PUT -Actualizar postre

const updatePostres = (req, res) => {
  const { id } = req.params; 
  const { nombre, tamaño, categoria,  tipo } = req.body; 

  const sql =
    "UPDATE postres SET nombre = ?, tamaño = ?, categoria = ?,  tipo = ?  WHERE id_postres = ?"; 

  db.query(sql, [nombre, tamaño, categoria, tipo], (error, result) => {
  
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: No se puede actualizar el postre" }); 
    }

    const postres = { id_postres: id, nombre, tamaño, categoria, tipo }; 
    res.json(postres); 
  });
};

// METODO DELETE 

const destroyPostres = (req, res) => {
  const { id } = req.params; 
  const sql = "DELETE FROM postres WHERE id_postres = ?"; 

  db.query(sql, [id], (error, result) => {
   
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: el postre no existe" }); 
    }
    res.json({ mensaje: "Postre eliminado" }); 
  });
};


module.exports = {
  allPostres,
  showPostres,
  storePostres,
  updatePostres,
  destroyPostres,
};