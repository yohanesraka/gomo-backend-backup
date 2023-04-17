'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('auth_users', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama_pengguna: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      kata_sandi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_hp: {
        type: Sequelize.NUMBER,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'inactive',
        allowNull: false
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
      lastAccess: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auth_users');
  }
};