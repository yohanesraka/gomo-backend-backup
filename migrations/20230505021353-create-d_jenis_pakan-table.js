'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_jenis_pakan', { 
      id_jenis_pakan:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_peternakan:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_peternakan',
          key: 'id_peternakan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jenis_pakan:{
        type: Sequelize.STRING,
        allowNull: false
      },
      interval_pakan:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      satuan:{
        type: Sequelize.ENUM,
        values: [
          'Tong',
          'Ball',
          'Pcs',
          'Kg'
        ],
        allowNull: false
      },
      komposisi:{
        type: Sequelize.STRING,
        allowNull: false
      },
      nutrien:{
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('d_jenis_pakan');
  }
};
