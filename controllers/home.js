module.exports = {
  index: function (req, res) {
    // En lugar de hacer un res.send, haremos un rend.render
    // Le pasamos como parámetro el nombre de la plantilla que queremos renderizar
    res.render('index');
  }
};
