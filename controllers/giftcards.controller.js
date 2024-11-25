const db = require("../db/db.js");


//METODO GET  - Para todos los giftcards

const allGiftcards = (req, res) => {
  const sql = "SELECT * FROM giftscards"; 
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); 
  }); 
};

//METODO GET - Para un giftcard 

const showGiftcards = (req, res) => {
  const { id } = req.params; 
  const sql = "SELECT * FROM giftcards WHERE id_giftcards = ?"; 
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

//METODO POST - agregar giftcard 

const storeGiftcards = (req, res) => {
  const { id, nombre, condición, tipo , email } = req.body; 
  const sql =
    "INSERT INTO productos (id, nombre, condición, tipo , email ) VALUES (?, ?, ?, ?,?)"; 
  db.query(sql, [id, nombre, condición, tipo , email ], (error, result) => {
   
    console.log(result); 
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    const giftcards = { ...req.body, id_giftcards: result.insertId }; 
    res.status(201).json(giftcards); 
  });
};

// METODO PUT -Actualizar

const updateGiftcards = (req, res) => {
  const { id } = req.params; 
  const { nombre, condición, tipo , email  } = req.body; 

  const sql =
    "UPDATE giftcards SET nombre = ?, condición = ?, tipo = ?, email = ?  WHERE id_giftcards = ?"; 

  db.query(sql, [nombre, categoria, stock, tipo], (error, result) => {
  
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); 
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: No se puede actualizar " }); 
    }

    const giftcards = { id_giftcards: id, nombre, condición, tipo , email  }; 
    res.json(giftcards); 
  });
};

// METODO DELETE 

const destroyGiftcards = (req, res) => {
  const { id } = req.params; 
  const sql = "DELETE FROM giftcards WHERE id_giftcards = ?"; 

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
  allGiftcards,
  showGiftcards,
  storeGiftcards,
  updateGiftcards,
  destroyGiftcards,
};