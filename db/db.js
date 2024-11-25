const mysql = require('mysql2'); 


//conexion con la bbdd
const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "usuarios_camila"

});

connection.connect((error)=>{
    if(error){
        return console.error(error);

    }

   console.log("Estas conectada a la base de datos"); 

});


// EXPORTAR DEL MODULO LA FUNCION CONNECTION
module.exports = connection;