module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: "Tame Impala At The Gorge",
        description: "Tame impala will be playing songs from The Slow Rush, as well as some of their hits.",
        date: new Date(2022, 09, 10),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/tameimpalagorge.jpg",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Escape Halloween",
        description: "Insomniac Presents a circus themed Halloween dance party!",
        date: new Date(2021, 10, 29),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/escapehalloween.png",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Train Enthusiast Meet Up",
        description: "Remember nobody talks about this. We'll all be standing by the tracks filming and photographing trains.",
        date: new Date(2021, 10, 29),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/scotland-jacobite-steam-train-HOGWARTSXPRSS0419.jpg",
        userId: 1,
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
