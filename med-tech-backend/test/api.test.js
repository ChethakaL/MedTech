const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../server'); // Import your Express app instance

chai.use(chaiHttp);

const expect = chai.expect;

describe('Map API Tests', () => {
  // Test for getting map details
  it('should get map details', async () => {
    const res = await chai.request(app).get('/api/map/all');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  // Test for adding map details
  it('should add map details', async () => {
    const newMapDetails = {
      hospitalName: 'Test Hospital',
      longitude: 1.23,
      latitude: 45.67,
      equipmentDetails: [{ name: 'Equipment1', availableFrom: '10:00 AM', availableTo: '5:00 PM', testPrice: 50 }],
    };

    const res = await chai.request(app).post('/api/map/').send(newMapDetails);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('_id');
    // Add more assertions as needed
  });

  // Add more test cases for other API endpoints
});

describe('User API Tests', () => {
  // Test for registering a user
  it('should register a user', async () => {
    const newUser = {
      fname: 'John',
      lname: 'Doe',
      // Add other user details
    };

    const res = await chai.request(app).post('/api/user/').send(newUser);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('_id');
    // Add more assertions as needed
  });

  // Test for authenticating a user
  it('should authenticate a user', async () => {
    const credentials = {
      username: 'testuser',
      password: 'testpassword',
    };

    const res = await chai.request(app).post('/api/user/authenticate').send(credentials);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    // Add more assertions as needed
  });

  // Add more test cases for other API endpoints
});
