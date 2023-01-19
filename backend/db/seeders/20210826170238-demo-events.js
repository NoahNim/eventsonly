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
    return queryInterface.bulkInsert('Events', [
      {
        name: 'Great Event Festival',
        description: 'This is the greatest festival. You will have a good time. All the cool kids are going',
        date: new Date(2021, 10, 15),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/stockfestybesty.jpeg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Second Sky",
        description: "An amazing curated experience by to you by famous weeaboo Porter Robinson",
        date: new Date(2021, 9, 19),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/secondsky.jpeg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Burning Man",
        description: "Enjoy getting dusty in the desert with your friends and thousands of strangers, all while you spend thousands of dollars to do so. Probably worth it though.",
        date: new Date(2022, 8, 22),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/burningman.jpeg",
        userId: 2,
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
