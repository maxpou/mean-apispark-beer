process.env.NODE_ENV = 'test';

var chai     = require('chai');
var chaiHttp = require('chai-http');
var should   = chai.should();

var server   = require('../server');
var Beer     = require('../models/beer.server.model');
var BeerList = require('../../../step1/beer-list.json');

chai.use(chaiHttp);

describe('Beers', function() {

  Beer.collection.drop();

  beforeEach(function(done){
    BeerList.forEach(function (aBeer) {
      var newBeer = new Beer(aBeer);
      newBeer.save();
    });
    done();
  });

  afterEach(function(done){
    Beer.collection.drop();
    done();
  });


  it('should see ALL beers on /beers GET', function(done) {
    chai.request(server)
      .get('/beers')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('alcohol');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('img');
        res.body[0].should.have.property('name');
        done();
      });
  });

  it('should list a SINGLE beer on /blob/<id> GET', function(done) {
      var newBeer = new Beer({
        name: 'Duvel tripel hop',
        alcohol: 9.5,
        img: '../img/new.jpg',
        description: 'miam miam'
      });

      newBeer.save(function(err, data) {
        chai.request(server)
          .get('/beers/'+data._id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('alcohol');
            res.body.should.have.property('description');
            res.body.should.have.property('img');
            res.body.should.have.property('name');
            done();
          });
      });
  });

  it('should FAIL when trying to add a single error beer on /beers POST', function(done) {
    chai.request(server)
      .post('/beers/')
      .send({'img':'../img/new.jpg','alcohol':'3'})
      .end(function(err, res){
        res.should.have.status(400);
        res.should.be.json;
        res.body.errors.should.have.property('name');
        res.body.errors.should.have.property('alcohol');
        res.body.errors.alcohol.message.should.contain('Provide real beer please');
        done();
      });
  });

  it('should add a single beer on /beers POST', function(done) {
    chai.request(server)
      .post('/beers/')
      .send({'img':'../img/new.jpg','name':'Kwak','alcohol':'8.4','description':'The hangover'})
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('__v');
        res.body.should.have.property('img');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('_id');
        res.body.img.should.contain('new.jpg');
        res.body.name.should.equal('Kwak');
        res.body.alcohol.should.equal(8.4);
        res.body.description.should.contain('hangover');
        done();
      });
  });

  it('should update a SINGLE beer on /beer/<id> PUT', function(done) {
    chai.request(server)
      .get('/beers')
      .end(function(err, res){
        var aBeer = res.body[0];
        aBeer.name = 'Affligem for hop lover';

        chai.request(server)
          .put('/beers/'+res.body[0]._id)
          .send(aBeer)
          .end(function(error, response){
            response.should.have.status(204);
            done();
        });
      });
  });

  it('should delete a SINGLE beer on /beer/<id> DELETE', function(done) {
    //TODO
    done();
  });

});
