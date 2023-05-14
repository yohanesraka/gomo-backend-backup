'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('s_ternak', { 
      id_ternak:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rf_id:{
        type: Sequelize.STRING,
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
      image:{
        type: Sequelize.STRING,
        allowNull: true
      },
      jenis_kelamin:{
        type: Sequelize.ENUM,
        values: [
          'Jantan',
          'Betina'
        ],
        allowNull: true
      },
      id_bangsa:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_bangsa',
          key: 'id_bangsa'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      id_kandang:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_kandang',
          key: 'id_kandang'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      id_status_ternak:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_status_ternak',
          key: 'id_status_ternak'
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      id_fp:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_fase',
          key: 'id_fp'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      id_dam:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_sire:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tanggal_lahir:{
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_masuk:{
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_keluar:{
        type: Sequelize.DATE,
        allowNull: true
      },
      status_keluar:{
        type: Sequelize.ENUM,
        values: [
          'Jual',
          'Mati',
          'Sembelih'
        ],
        allowNull: true
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    }).then(() => {
      queryInterface.addConstraint('s_ternak', {
        fields: ['id_dam'],
        type: 'foreign key',
        name: 'fk_s_ternak_id_induk',
        references: {
          table: 's_ternak',
          field: 'id_ternak'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      }).then(() => {
        queryInterface.addConstraint('s_ternak', {
          fields: ['id_sire'],
          type: 'foreign key',
          name: 'fk_s_ternak_id_pejantan',
          references: {
            table: 's_ternak',
            field: 'id_ternak'
          },
          onDelete: 'set null',
          onUpdate: 'cascade'
        })
      }
    );
  },
  )},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('s_ternak');
  }
};
