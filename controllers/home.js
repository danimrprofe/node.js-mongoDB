module.exports = {
  index: function (req, res) {
    // En lugar de hacer un res.send, haremos un rend.render

    var viewModel = {
      images: [
        {
          uniqueId: 1,
          title: 'Sample Image 1',
          description: '',
          filename: 'sample1.jpg',
          views: 0,
          likes: 0,
          timestamp: Date.now
        }, {
          uniqueId: 2,
          title: 'Sample Image 2',
          description: '',
          filename: 'sample2.jpg',
          views: 0,
          likes: 0,
          timestamp: Date.now
        }, {
          uniqueId: 3,
          title: 'Sample Image 3',
          description: '',
          filename: 'sample3.jpg',
          views: 0,
          likes: 0,
          timestamp: Date.now
        }, {
          uniqueId: 4,
          title: 'Sample Image 4',
          description: '',
          filename: 'sample4.jpg',
          views: 0,
          likes: 0,
          timestamp: Date.now
        }
      ]
    };
    // Le pasamos como parámetro el nombre de la plantilla que queremos renderizar
    res.render('index', viewModel);
  }
};
