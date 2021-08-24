'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RSVP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RSVP.belongsTo(models.User, { foreignKey: 'userId' })
      RSVP.belongsTo(models.Event, { foreignKey: 'eventId' })
    }
  };
  RSVP.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RSVP',
  });
  return RSVP;
};