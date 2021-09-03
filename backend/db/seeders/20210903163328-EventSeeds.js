

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: "PAX West",
        description: "PAX WEST is a conference in Seattle centered around video game, comic book, movie and pop culture.",
        date: new Date(2022, 09, 15),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/pax.png",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cat Meet Up",
        description: "A meet up for all the cat owners out there! Just a quick ground rule, please nobody dress their dog up as a cat this year. People were very upset about this happening last year.",
        date: new Date(2021, 10, 22),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/wild-cats-galore-concentration-free-living-all-sizes-colours-parking-lot-larnaca-cyprus-gathering-undomesticated-157392492.jpg",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dog Meet Up",
        description: 'A meet up for all the dog owners out there! Just a quick ground rule, please do not dress your cat up as a dog this year. People were not amused when somebody did this last year.',
        date: new Date(2021, 10, 23),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/dogmeet.jpg",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Coca Cola Enthusiasts",
        description: "This is a meet up for everyone who enjoys the worlds best soft drink.",
        date: new Date(2021, 12, 23),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/CocaCola_900.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Donda Listening Part 4",
        description: "Because three was not enough and now Kanye needs to hype up the tour.",
        date: new Date(2021, 09, 12),
        eventPhoto: "https://prject-omega-events.s3.us-west-2.amazonaws.com/dondacover.jpg",
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
