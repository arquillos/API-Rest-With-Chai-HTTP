'use stricts';

const HttpStatus = require('http-status-codes');
const chai = require('chai')
    , chaiHttp = require('chai-http');
const expect = chai.expect;
const url = 'http://echo.jsontest.com/key/value/one/two';
chai.use(chaiHttp);

describe('Given an API rest server', () => {

  it('The echo endpoint returns a Json', (done) => {
    // Given
    let responseBody
    const expectedBody = { one: 'two', key: 'value' };

    // When
    chai.request(url)
      .get('/')
      .end(function(err, res) {
        responseBody =  res.body;

    // Then
        // Response status code 
        expect(res).to.have.status(HttpStatus.OK);
        // JSON Response
        expect(res).to.be.json;
        expect(responseBody).to.deep.equal(expectedBody);
        expect(responseBody).to.have.property('one').to.be.equal('two');
        expect(responseBody).to.have.property('key').to.be.equal('value');
        expect(responseBody).to.be.an('object').that.has.all.keys('one', 'key');
        done();
      })

  })

})
