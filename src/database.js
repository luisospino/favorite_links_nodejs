const mysql = require('mysql');
const { DDBB } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(DDBB);

pool.getConnection((err, connection) => {
    if( err ){
        console.error('ERROR');
    }else{
        connection.release();
        console.log('DB is Connected');
        return;
    }
});

//Convertir callbacks a promesas
pool.query = promisify(pool.query);
module.exports = pool;