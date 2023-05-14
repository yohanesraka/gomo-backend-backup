'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_riwayat_kelahiran', {
      id_kelahiran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      tanggal_masuk: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_sire: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_dam: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('Jantan', 'Betina'),
        allowNull: false
      },
      bangsa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kode_kandang: {
        type: Sequelize.STRING,
        allowNull: false
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_riwayat_kelahiran');
  }
};
