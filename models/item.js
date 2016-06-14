var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;

// Also note that you didn't require the file to connect to the database. This is important because you want to connect to the database at the highest level of the application (server.js). It makes more sense that an application connects to the database, not the model.
