var express = require('express');
var config = require('./server/configure');
const db = require('./db');
var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
// Configurando la aplicación
app = config(app);

// Levantamos el server
app.listen(app.get('port'), function () {
  console.log('Server up: http://localhost:' + app.get('port'));
});
