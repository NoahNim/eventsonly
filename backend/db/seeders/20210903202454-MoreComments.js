'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [{
      content: "Oh boy my cat will love this",
      userId: 5,
      eventId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "I hope people follow the rules this year lol",
      userId: 4,
      eventId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "My favorite soda haha",
      userId: 3,
      eventId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "People better follow the rules!",
      userId: 7,
      eventId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "Didn't he already do enough listening parties? The album is out!",
      userId: 6,
      eventId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "Yeah like I can just listen to the album at home now tbh",
      userId: 5,
      eventId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
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
