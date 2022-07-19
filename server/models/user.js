'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, {as: 'role'});
    }
  //   toJSON() {
  //     return {...this.get(),id:undefined}
  //   }
  }
  User.init({
    // uuid: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "User must have a name" },
        notEmpty: {msg: "name must not be empty"}
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: "User must have a email" },
        notEmpty: { msg: "email must not be empty" },
        isEmail: {msg: "Must be a valid email adress"}
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a password" },
        notEmpty: { msg: "password must not be empty" },
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};