process.env.NODE_ENV = 'test';

var chai     = require('chai');
var chaiHttp = require('chai-http');
var server   = require('../server');
var should   = chai.should();

chai.use(chaiHttp);

describe('Home', function() {
  it('should see homepage', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});
