const mysql = require('mysql');
const config = require('config');

//Ety: use a connection pool instead of a single connection
var pool = mysql.createPool(config.mysql);
var db = (() => {
    function _query(query, params, callback) {
        pool.getConnection( (err, connection) => {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, (err, rows) => {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', (err) => {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = db;