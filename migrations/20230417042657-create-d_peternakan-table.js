'use strict';

const {
  DATEONLY
} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('d_peternakan', {
      id_peternakan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nama_peternakan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subscribe: {
        type: Sequelize.DATE,
        allowNull: true
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('d_peternakan');

  }
};