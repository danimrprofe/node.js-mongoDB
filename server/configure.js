// Definición del módulo configure
// Declarando veriables para todos los módulos que vamos a utilizar

var express = require('express');

var path = require('path');
// routes = require('./routes');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

// Definimos el módulo que vamos a crear y exportar
// Le pasamos el objeto app como parámetro, lo modifica y lo devuelve

module.exports = function (app) {
// configuration code...

  // Utilizaremos handlebars. Gracias a él, podemos tener secciones en nuestras
  // páginas HTML que se crean en tiempo de ejecución basado en los datos que se pasen
  // Cada vez que rendericemos una web con extensión .handlebars, utilizará
  // el engine de Handlebars para renderizarlo

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials']
  }).engine);
  app.set('view engine', 'handlebars');

  // Aquí especificamos todo el middleware que vamos a utilizar

  // El método logger está deprecado, hay que logear de otra forma (ver morgan)
  // app.use(connect.logger('dev')); // Logea cada petición HTTP recibida
  // Ahora hay que logear utilizando un módulo llamado Morgan, tócatelos

  app.use(bodyParser({
    uploadDir: path.join(__dirname, '../public/upload/temp')
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(logger('combined'));
  // app.use(multer());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

  // Ni flowers de como cambiar esto: app.use(connect.cookieParser('some-secret-value-here'));

  // error handling middleware should be loaded after the loading the routes
  if (app.get('env') == 'development') {
    app.use(errorHandler());
  }

  // Hasta aquí todo el festival de middleware que necesitaremos

  return app;
};
