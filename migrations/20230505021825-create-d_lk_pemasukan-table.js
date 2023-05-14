'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_lk_pemasukan', {
      id_lk_pemasukan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
      id_ternak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rf_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_bangsa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_bangsa',
          key: 'id_bangsa'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ['Jantan', 'Betina'],
        allowNull: false
      },
      cek_poel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cek_mulut: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cek_telinga: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cek_kuku_kaki: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cek_kondisi_fisik_lain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cek_bcs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_status_ternak: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_status_ternak',
          key: 'id_status_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status_kesehatan:{
        type: Sequelize.ENUM,
        values: ['Sehat', 'Sakit'],
        allowNull: false
      },
      id_kandang:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_kandang',
          key: 'id_kandang'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_lk_pemasukan');
  }
};
