/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: "670b9562-b30d-52d5-b827-655787665500",
  name: 'My Henry PI Breed',
  height: "3-5",
  weight:"1-2"
};

describe('DOG ROUTES TESTING\n======================', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => conn.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').then(data => console.log(data.status))
    );
  });
});
