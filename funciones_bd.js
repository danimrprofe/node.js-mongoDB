var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
var nombreBD = 'mydb';

// Lista de funciones para hacer CRUDs contra la BD

exports.crearBD = function () {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('Database created!');
    db.close();
  });
};

exports.crearColeccion = function (coleccion) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(nombreBD);
    dbo.createCollection('customers', function (err) {
      if (err) throw err;
      console.log('Collection created!');
      db.close();
    });
  });
};
