// Definición del módulo configure
// Declarando veriables para todos los módulos que vamos a utilizar

var connect = require('connect');
var path = require('path');
// routes = require('./routes');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var bodyParser = require('body-parser');

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

  app.use(logger('combined'));

  app.use(connect.bodyParser({
    uploadDir: path.join(__dirname, '../public/upload/temp')
  }));
  app.use(connect.json());
  app.use(connect.urlencoded());
  app.use(connect.methodOverride());
  app.use(connect.cookieParser('some-secret-value-here'));
  app.use(app.router);
  app.use('/public/', connect.static(path.join(__dirname, '../public'))); // Para servir contenido estático
  if (app.get('env') === 'development') {
    app.use(connect.errorHandler());
  }

  // Hasta aquí todo el festival de middleware que necesitaremos

  return app;
};
