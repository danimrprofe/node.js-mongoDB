
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mongotest';
var nombreBD = 'mongotest';

MongoClient.connect(url,
  { useNewUrlParser: true },
  // eslint-disable-next-line handle-callback-err
  function (err, db) {
    console.log('Connected to MongoDB!');
    var dbo = db.db(nombreBD);
    dbo.createCollection('testing');
    // insert a new item using the collection's insert function:
    dbo.collection('testing').insertOne({ 'title': 'Snowcrash' }, function (err, docs) {
    // on successful insertion, log to the screen the new
    // collection's details:
    
      console.log(docs.length + ' record inserted.');
      console.log(docs[0].title + ' – ' + docs[0]._id);
      // finally close the connection:
      db.close();
    });
  });
