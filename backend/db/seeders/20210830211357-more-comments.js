'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Comments", [{
      content: "Wow this looks....like a thing!",
      userId: 1,
      eventId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        content: "Wow this should be fun tbh!",
        userId: 1,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "I can't even wait for this anymore!",
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "This will be a good time",
        userId: 1,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
