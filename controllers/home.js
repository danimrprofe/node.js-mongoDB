var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models').Image;

module.exports = {
  index: function (req, res) {
    // En lugar de hacer un res.send, haremos un rend.render

    var viewModel = {
      images: []
    };

    // Llamando a ImageModel, ejecutamos una query en MongoDB

    ImageModel.find({}, {}, { sort: { timestamp: -1 } },
      function (err, images) {
        if (err) { throw err; }
        viewModel.images = images;
        sidebar(viewModel, function (viewModel) {
          res.render('index', viewModel);
        });
      });
  }
};
