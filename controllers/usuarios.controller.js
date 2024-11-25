const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");

//METODO GET consultar todos los usuarios


const allUsuarios = (req, res) => {
  const sql = "SELECT * FROM usuarios"; 
  db.query(sql, (error, rows) => {
 
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); 
  }); 
};

//METODO GET consultar un usuario especifico

const showUsuarios = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuarios WHERE id = ?"; 
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
        .send({ error: "ERROR: No existe el usuario solicitado" }); 
    }
    res.json(rows[0]); 
  });
};



const storeUsuarios = (req, res) => {

  console.log(req.file);

  let fotoAsubir = ""; 
  if (req.file) {
  
    fotoAsubir = `/imagenes/${req.file.filename}`; 
  }

  console.log(req.body);

  const {nombre, apellido, email, contrasena} = req.body; 

  console.log(nombre);
  console.log(apellido);
  console.log(email);
  console.log(contrasena);

  console.log(fotoAsubir);

  const sql =
    "INSERT INTO usuarios (nombre, apellido, email, contraseña, foto) VALUES (?, ?, ?, ?, ?)";
  
  console.log(sql);

  db.query(
    sql,
    [nombre, apellido, email, contrasena, fotoAsubir], 
    (error, result) => {
      console.log(result);
      if (error) {
        return res.status(500).json({ error: "Error al registrar usuario, intente luego" });
      }
      const usuarios = {
        ...req.body,
        id: result.insertId,
        nombre,
        apellido,
        email,
        contrasena,
        foto: fotoAsubir,
      };
      res.status(201).json(usuarios);
    }
  );
};

//  METODO PUT - ACTUALIZACION

// const updateUsuario = async (req, res) => {
//   //funcion callback req = request(requerimiento) res = response(respuesta)
//   const { id_usuario } = req.params;
//   const { nombre, email, password, rol } = req.body;
//   const imagen = req.file ? req.file.filename : null;

//   let sql = "UPDATE usuarios SET nombre = ?, email = ?, rol = ?";
//   let params = [nombre, email, rol];

//   if (password) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     sql += ", password = ?";
//     params.push(hashedPassword);
//   }

//   if (imagen) {
//     sql += ", imagen = ?";
//     params.push(imagen);
//   }

//   sql += " WHERE id_usuario = ?";
//   params.push(id_usuario);

//   db.query(sql, params, (error, result) => {
//     if (error) {
//       return res
//         .status(500)
//         .json({ error: "ERROR: Intente más tarde por favor" });
//     }
//     if (result.affectedRows == 0) {
//       return res
//         .status(404)
//         .send({ error: "ERROR: El usuario a modificar no existe" });
//     }
//     res.json({ mensaje: "Usuario actualizado exitosamente" });
//   });
// };

// METODO DELETE 

// const destroyUsuario = (req, res) => {
//   const { id } = req.params;
//   const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
//   db.query(sql, [id], (error, result) => {
//     if (error) {
//       return res
//         .status(500)
//         .json({ error: "ERROR: Intente más tarde por favor" });
//     }
//     if (result.affectedRows == 0) {
//       return res
//         .status(404)
//         .send({ error: "ERROR: usuario no encontrado" });
//     }
//     res.json({ mensaje: "Usuario Eliminado" });
//   });
// };

// login de usuario 
// const login = (req, res) => {
//   const { email, contraseña } = req.body;
//   const sql = "SELECT * FROM usuarios WHERE email = ?";
//   db.query(sql, [email], async (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: "Error en el servidor" });
//     }
//     if (results.length === 0) {
//       return res.status(401).json({ error: "Credenciales inválidas" });
//     }
//     const user = results[0];
//     const match = await bcrypt.compare(contraseña, user.contraseña);
//     if (!match) {
//       return res.status(401).json({ error: "Credenciales inválidas" });
//     }
//     const token = jwt.sign(
//       { id_usuario: user.id_usuario, nombre: user.nombre, apellido: user.apellido, email: user.email, contraseña: user.contraseña, foto: user.foto },
//       "enigma",
//       { expiresIn: "2h" }
//     );
//     res.json({
//       token,
//       user: {
//         id_usuario: user.id_usuario,
//         nombre: user.nombre,
//         email: user.email,
//         contraseña: user.contraseña,
//         foto: UserActivation.foto,
//       },
//     });
//   });
// };

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allUsuarios,
  showUsuarios,
  storeUsuarios, 
};