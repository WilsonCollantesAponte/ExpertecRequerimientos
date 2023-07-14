const { DataTypes } = require("sequelize");
// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelizeInstance) => {
  sequelizeInstance.define(
    "Requirement",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoRequerimiento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plataforma: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vista: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      interaccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prioridad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailCliente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailDesarrollador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaFin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tiempoEstimado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estadoFinalAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      estadoFinalDev: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
