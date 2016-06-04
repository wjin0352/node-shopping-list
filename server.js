var express = require('express');
var bodyParser = require('body-parser');
var jsonParser =bodyParser.json();

var Storage = function() {
  this.items = [];
  this.id = 0;
};

Storage.prototype.add = function(name) {
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

Storage.prototype.delete = function(id) {
  var item = "";
  for(var i=0; i<this.items.length; i++) {
    if(this.items[i].id == id) {
      var item = this.items.splice(i, 1);
      break;
    }
  };
  return item;
};

Storage.prototype.edit = function(id, name) {
  var item = "";
  for(var i=0; i<this.items.length; i++) {
    if(this.items[i].id == id) {
      this.items[i].name = name;
      var item = this.items[i];
      break;
    }
  };
  return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

// API end points
  app.get('/items', function(req, res) {
    res.json(storage.items);
  });

  app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var item = storage.add(req.body.name);
    res.status(201).json(item);
  });

// If successful, your endpoint should return the deleted item, with the appropriate status code.
// If an incorrect ID is supplied, your endpoint should fail gracefully, returning a JSON error message.
  app.delete('/items/:id', jsonParser, function(req, res) {
    var id = req.params.id;
    console.log('id: '+ id );
    var item = storage.delete(id);
    res.status(204).json(item);
  });

// If successful, your endpoint should return the edited, with the appropriate status code.
// If a non-existent ID is supplied, your endpoint should create a new item using the ID supplied.
  app.put('/items/:id', jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var id = req.params.id;
    var name = req.body.name;
    var item = storage.edit(id, name);
    res.status(200).json(item);
  });


//   creating and managing users. Users should have a username, and should be able to own a subset of the items on the list. For example, if you were to make a get request to /users/joe, you might be given the following data:

// {
//     "username": "joe",
//     "items": [{
//         "name": "Durian",
//         "id": 3
//     },
//     {
//         "name": "Plantain",
//         "id": 7
//     }]
// }



app.listen(process.env.PORT || 8080);

// exports for tests
exports.app = app;
exports.storage = storage;
