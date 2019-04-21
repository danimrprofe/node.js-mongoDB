/* eslint-disable semi */

//  Me levanto un servidor HTTP en el puerto 8080
// Un módulo es un conjunto de funciones que queremos incluir en nuestra
// Aplicación. Similar a una librería JS

// Incluir un módulo, utilizando require. HTTP es un módulo built-in
var http = require('http');

// Este módulo me lo he creado yo, está en el archivo JS
// Lo voy a importar. ./ indica que se encuentra en la misma carpeta
var dt = require('./myfirstmodule');

// Este módulo lo necesito para parsear las URL
var url = require('url');

var funcionesBD = require('./funciones_bd');

// Cuando alguien se conecte al puerto 8080, se ejecutará esta función
// El parámetro req es la petición del cliente, se pasa como objeto

http.createServer(function (req, res) {
  // Aquí le podemos meter cabeceras HTTP
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('La fecha es: ' + dt.myDateTime());
  // En principio todas las URL acabarán en este HTML
  res.write('<br>La URL de la petición es:' + req.url);

  // Puedo pescar parámetros GET. He importado el módulo URL arriba
  
  var q = url.parse(req.url, true).query;

  // Estos se supone que son dos parámetros que paso por URL
  // EN plan: http://localhost:8080/?year=2017&month=July
  var texto = q.year + ' ' + q.month;
  res.write('<br>' + texto)
  res.end();
}).listen(8080);
