const { Sequelize, DataTypes, UUID } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const TipoUsuarioModel = sequelize.define(
  "tipoUsuario",
  {
    tipoUsuarioID: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TipoUsuarioModel;
