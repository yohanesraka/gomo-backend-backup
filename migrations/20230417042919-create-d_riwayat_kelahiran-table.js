'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('d_riwayat_kelahiran', {
      id_riwayat_kelahiran: {
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
        onDelete: 'CASCADE',
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
      tanggal_masuk: {
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: true
      },
      id_sire: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_dam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ['Jantan', 'Betina'],
        allowNull: false
      },
      varietas: {
        type: Sequelize.STRING,
        allowNull: true
      },
      kode_kandang: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('d_riwayat_kelahi');

  }
};