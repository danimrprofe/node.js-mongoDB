
// La idea aquí es que, requeriendo este archivo, nos incluya todos los que hay a continauación
// con un único import. Ahora mismo tengo dos modelos creados:

module.exports = {
  'Image': require('./image'),
  'Comment': require('./comment')
};
