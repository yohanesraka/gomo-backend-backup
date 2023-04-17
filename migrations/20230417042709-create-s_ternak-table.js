'use strict';

const {
  text
} = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('s_ternak', {
      id_ternak: {
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
      jenis_kelamin: {
        type: Sequelize.ENUM,
        values: ['jantan', 'betina'],
        allowNull: false
      },
      id_varietas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_varietas',
          key: 'id_varietas'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_kandang: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_kandang',
          key: 'id_kandang'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_status_ternak: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'd_status_ternak',
          key: 'id_status_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      berat_berkala: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      id_fase: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_fase',
          key: 'id_fase'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_dam: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      id_sire: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      usia: {
        type: Sequelize.NUMBER,
        allowNull: true
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tanggal_masuk: {
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_keluar: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status_keluar: {
        type: Sequelize.ENUM,
        values: ['Jual', 'Mati', 'Sembelih', 'Afkir']
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('s_ternak');

  }
};