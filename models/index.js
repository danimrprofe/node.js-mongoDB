/*
Since our models folder will contain a number of different files, each a unique
module for one of our models, it would be nice if we could just include all of our
models in a single require statement
*/

// Ahora mismo tengo dos modelos creados:

module.exports = {
  'Image': require('./image'),
  'Comment': require('./comment')
};
