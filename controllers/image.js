
var fs = require('fs');
var Models = require('../models');
var path = require('path');
var sidebar = require('../helpers/sidebar');

module.exports = {
  index: function (req, res) {
    // vamos a renderizar la plantilla image

    var viewModel = {
      image: {},
      comments: []
    };

    // Buscamos la imagen que queremos mostrar
    // Tiene que encajar con el nombre que especifica la URL

    Models.Image.findOne({
      filename: { $regex: req.params.image_id }
    },
    function (err, image) {
      if (err) { throw err; }
      if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        image.save();

        // Buscamos los comentarios de esta imagen

        Models.Comment.find({ image_id: image._id }, {}, { sort: {
          'timestamp': 1 } },
        function (err, comments) {
          if (err) { throw err; }
          viewModel.comments = comments;
          sidebar(viewModel, function (viewModel) {
            res.render('image', viewModel);
          });
        }
        );
      } else {
        res.redirect('/');
      }
    });
  },
  create: function (req, res) {
    var saveImage = function () {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var imgUrl = '';
      for (var i = 0; i < 6; i += 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log(req.length);
      var tempPath = req.files.file.path;
      var ext = path.extname(req.files.file.name).toLowerCase();
      var targetPath = path.resolve('./public/upload/' + imgUrl + ext);
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ===
        '.gif') {
        fs.rename(tempPath, targetPath, function (err) {
          if (err) throw err;
          res.redirect('/images/' + imgUrl);
        });
      } else {
        fs.unlink(tempPath, function () {
          if (err) throw err;
          res.json(500, { error: 'Only image files are allowed.' });
        });
      }
    };
    saveImage();
  },
  like: function (req, res) {
    res.json({ likes: 1 });
  },
  comment: function (req, res) {
    res.send('The image:comment POST controller');
  }
};
