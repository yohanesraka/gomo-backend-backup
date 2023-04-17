'use strict';

const { all } = require('../routes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('d_kandang', {
      id_kandang: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_peternakan: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_peternakan',
          key: 'id_peternakan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      kode_kandang: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('d_kandang');

  }
};
