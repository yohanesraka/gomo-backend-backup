'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_pakan', {
      id_pakan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_peternakan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_peternakan',
          key: 'id_peternakan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_jenis_pakan:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_jenis_pakan',
          key: 'id_jenis_pakan'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      tanggal_pembuatan:{
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_konsumsi:{
        type: Sequelize.DATE,
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
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_pakan');
  }
};
