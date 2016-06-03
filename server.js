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
  for(var i=0; i<this.items.length; i++) {
    if(this.items[i].id == id) {
      this.items.splice(i, 1);
      break;
    }
  };
};

Storage.prototype.edit = function(id, name) {
  for(var i=0; i<this.items.length; i++) {
    if(this.items[i].id == id) {
      this.items[i].name = name;
      break;
    }
  };
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
    res.status(201).json(item)
  });

// If successful, your endpoint should return the deleted item, with the appropriate status code.
// If an incorrect ID is supplied, your endpoint should fail gracefully, returning a JSON error message.
  app.delete('/items/:id', jsonParser, function(req, res) {
    var id = req.params.id;
    console.log('id: '+ id );
    storage.delete(id);
    res.sendStatus(204);
  });

// If successful, your endpoint should return the edited, with the appropriate status code.
// If a non-existent ID is supplied, your endpoint should create a new item using the ID supplied.
  app.put('/items/:id', jsonParser, function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var id = req.params.id;
    var name = req.body.name;
    storage.edit(id, name);
    res.sendStatus(200);
  });

app.listen(process.env.PORT || 8080);
