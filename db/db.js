const mysql = require('mysql2'); 


//conexion con la bbdd
const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "usuarios"

});

connection.connect((error)=>{
    if(error){
        return console.error(error);

    }

   console.log("Estas conectada a la base de datos"); 

});