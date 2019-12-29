'use stricts';

const HttpStatus = require('http-status-codes');
const chai = require('chai')
    , chaiHttp = require('chai-http');
const expect = chai.expect;
const restServiceUrl = 'https://jsonplaceholder.typicode.com';
chai.use(chaiHttp);

describe('Given an API rest server', () => {
  const expectedNumResources = 100;

  it(`The number of posts is ${expectedNumResources}`, (done) => {
    // Given
    let responseBody;

    // When
    chai.request(restServiceUrl)
      .get('/posts')
      .end((err, res) => {
        responseBody =  res.body;

        var responseElementCount = Object.keys(responseBody).length;
        //console.log(`JSON Response length: ${responseElementCount}`);

    // Then
        // Response status code 
        expect(res).to.have.status(HttpStatus.OK);

        // JSON Response
        expect(res).to.be.json;

        // Json response length
        expect(responseElementCount).to.be.equal(expectedNumResources);
        done();
      })

  })

  it('Can get the first resource', (done) => {
    // Given

    // When
    chai.request(restServiceUrl)
        .get('/posts/1')
        .end((err, res) => {
          let responseBody = res.body;
    
    // Then
          // Response status code 
          expect(res).to.have.status(HttpStatus.OK);

          // JSON Response
          expect(res).to.be.json;

          // JSON Response has an Id = 1
          expect(responseBody).to.have.property('id').to.be.equal(1);

          // JSON Response has an userID = 1
          expect(responseBody).to.have.property('userId').to.be.equal(1);
          done();
        })

  })
  
  it('Can create a new fake resource (101)', (done) => {
    // Given
    let newPost = {title: 'test post', body: 'test body', userId: 1};

    // When
    chai.request(restServiceUrl)
        .post('/posts')
        .send(newPost)
        .end((err, res) => {
    // Then
          responseBody =  res.body;

          // Response status code 
          expect(res).to.have.status(HttpStatus.CREATED);

          // JSON Response
          expect(res).to.be.json;

          // Id should be 101
          expect(responseBody).to.have.property('id').to.be.equal(101);
          done();
        })
  })

  it('Can delete the first resource', (done) => {
    // Given

    // When
    chai.request(restServiceUrl)
        .delete('/posts/1')
        .end((err, res) => {
    // Then
          // Response status code 
          expect(res).to.have.status(HttpStatus.OK);

          // JSON Response
          expect(res).to.be.json;
          done();
      })

  })
})