const { DataTypes } = require("sequelize");

module.exports = (sequelizeInstance) => {
  sequelizeInstance.define(
    "UserXRequirement",
    {},
    {
      timestamps: false,
    }
  );
};
