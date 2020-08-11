const mysql = require('mysql');

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'links_database'
});

connection.connect((err) => {
   if(err){
      console.error("FAIL");
   }else{
      console.log('Conexion correcta.');
   }
});

module.exports = connection;