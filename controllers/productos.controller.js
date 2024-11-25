const db = require("../db/db.js");


//METODO GET  - Para todos los productos


const allProductos = (req, res) => {
  const sql = "SELECT * FROM productos"; 
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); 
  }); 
};

//METODO GET - Para un producto 

const showProductos = (req, res) => {
  const { id } = req.params; 
  const sql = "SELECT * FROM productos WHERE id_productos = ?"; 
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

//METODO POST - agregar producto nuevo 

const storeProductos = (req, res) => {
  const { id, nombre, categoria, stock, tipo } = req.body; 
  const sql =
    "INSERT INTO productos (id, nombre, categoria, stock, tipo) VALUES (?, ?, ?, ?,?)"; 
  db.query(sql, [id, nombre, categoria, stock, tipo], (error, result) => {
   
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

const updateProductos = (req, res) => {
  const { id } = req.params; 
  const { nombre, categoria, stock, tipo } = req.body; 

  const sql =
    "UPDATE platos SET nombre = ?, categoria = ?, stock = ?, tipo = ?  WHERE id_productos = ?"; 

  db.query(sql, [nombre, categoria, stock, tipo], (error, result) => {
  
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

    const producto = { id_producto: id, nombre, categoria, stock, tipo }; 
    res.json(producto); 
  });
};

// METODO DELETE 

const destroyProductos = (req, res) => {
  const { id } = req.params; 
  const sql = "DELETE FROM platos WHERE id_productos = ?"; 

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
  allProductos,
  showProductos,
  storeProductos,
  updateProductos,
  destroyProductos,
};