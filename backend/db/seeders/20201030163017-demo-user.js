'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'demo',
        lastName: 'lition'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: 'Fakey',
        lastName: 'McGee'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: 'Dud',
        lastName: 'Buddy'
      },
      {
        email: 'bobo@user.io',
        username: 'bobby',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Bob',
        lastName: 'Bobbington'
      },
      {
        email: 'sarah@user.io',
        username: 'sarah',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Sarah',
        lastName: 'Sarahton'
      },
      {
        email: 'abdul@user.io',
        username: 'abhul',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Abdul',
        lastName: 'Abdulton'
      },
      {
        email: 'bella@user.io',
        username: 'bella',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Bella',
        lastName: 'Bellington'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
