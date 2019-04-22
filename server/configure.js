// Definición del módulo configure

// Declarando veriables para todos los módulos que vamos a utilizar

var path = require('path');
var routes = require('./routes');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
// var multer = require('multer');
var moment = require('moment');

// Definimos el módulo que vamos a crear y exportar
// Le pasamos el objeto app como parámetro, lo modifica y lo devuelve

module.exports = function (app) {
// configuration code...

  // Aquí especificamos todo el middleware que vamos a utilizar

  // El método logger está deprecado, hay que logear de otra forma (ver morgan)
  // app.use(connect.logger('dev')); // Logea cada petición HTTP recibida
  // Ahora hay que logear utilizando un módulo llamado Morgan, tócatelos
  app.use(morgan('dev'));
  app.use(bodyParser({
    uploadDir: path.join(__dirname, '../public/upload/temp')
  }));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser('some-secret-value-here'));
  routes(app);
  // app.use(multer());

  app.use('/public/', express.static(path.join(__dirname, '../public')));

  // error handling middleware should be loaded after the loading the routes
  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

  // Hasta aquí todo el festival de middleware que necesitaremos

  // Utilizaremos handlebars. Gracias a él, podemos tener secciones en nuestras
  // páginas HTML que se crean en tiempo de ejecución basado en los datos que se pasen
  // Cada vez que rendericemos una web con extensión .handlebars, utilizará
  // el engine de Handlebars para renderizarlo

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
      timeago: function (timestamp) {
        return moment(timestamp).startOf('minute').fromNow();
      }
    }
  }).engine);
  app.set('view engine', 'handlebars');

  return app;
};
