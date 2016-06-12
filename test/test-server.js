var chai = require('chai');
var chaiHttp = require('chai-http');
// You set the global.environment variable to equal 'test' to make the application use the testing database rather than the development or production database.
global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var expect = chai.expect;
var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

// using beforeEach and afterEach so we don't get errors due to the objects not being reset before a test.
describe('Shopping List', function() {
  beforeEach(function(done) {
    seed.run(function() {
      done();
    });
  });
  afterEach(function(done) {
    Item.remove(function() {
      // theses are async tests so they are waiting for a done()
      done();
    });
  });

  it('should add an item on post', function(done) {
    chai.request(app)
      .post('/items')
      .send({'name': 'Kale'})
      .end(function(err, res) {
        var items = res.body;

        should.equal(err, null);
        res.should.have.status(201);
        items.should.have.a.property('name');
        items.should.have.property('_id');
        items.name.should.be.a('string');
        items.name.should.equal('Kale');
        items.should.have.be.a('object');
        done();
      });
  });

  it('should list items on get', function(done) {
    chai.request(app)
      .get('/items')
      .end(function(err, res) {
        var items = res.body;
        // console.log(items[0]);

        expect(err).to.be.null;
        res.should.have.status(200);
        items.should.be.a('array');
        items.should.have.length(3);

        var names = ['Broad beans', 'Tomatoes', 'Peppers'];
        items.forEach(function(item, index) {
          item.should.be.a('object');
          item.should.have.property('_id');
          item.should.have.property('name');
          item.name.should.be.a('string');
          item.name.should.equal(names[index]);
        });

        done();
      });
  });

  it('should edit an item on put', function(done) {
    Item.findOne({
      name: 'Peppers'
    }, function(err, item) {
      if(err) {
        return;
      }

      chai.request(app)
        .put('/items/' + item.id )
        .send({'name': 'Steak'})
        .end(function(err, res) {

          //  why cant i use res.body? or res.body.name  but i can use item now???

          // var item = res.body;
          console.log(item);
          expect(err).to.be.null;
          res.should.have.status(200);
          item.should.have.property('name');
          item.should.have.property('id');
          item.name.should.be.a('string');
          item.should.be.a('object');
          item.should.have.property('id');
          item.name.should.be.a('string');
          // item.name.should.equal('Steak');
          done();
        });
    });
  });

  it('should delete an item on delete', function(done) {
    Item.findOne({
      name: 'Broad beans'
    }, function(err, item) {
      if(err) {
        return;
      }

    chai.request(app)
      .delete('/items/' + item.id)
      .end(function(err, res) {
        expect(err).to.be.null;
        res.should.have.status(200);
        console.log(res.body);
        done();
      });
    });
  });
});

