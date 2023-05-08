'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_bahan_pakan', { 
      id_bahan_pakan:{
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
      id_jenis_bahan_pakan:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_jenis_bahan_pakan',
          key: 'id_jenis_bahan_pakan'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      keterangan:{
        type: Sequelize.ENUM,
        values: [
          'Masuk',
          'Keluar'
        ],
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
    await queryInterface.dropTable('d_bahan_pakan');
  }
};
