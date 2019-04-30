// Requerimos Mongoose
var mongoose = require('mongoose');

// Creamos un esquema
var Schema = mongoose.Schema;
var path = require('path');
var ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, 'default': 0 },
  likes: { type: Number, 'default': 0 },
  timestamp: { type: Date, 'default': Date.now }
});
ImageSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '');
  });

// Exportamos una función para crear una clase del modelo "Image"
module.exports = mongoose.model('Image', ImageSchema);
