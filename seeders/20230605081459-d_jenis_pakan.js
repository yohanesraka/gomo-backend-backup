'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('d_jenis_pakan', [{
      id_jenis_pakan  : "1",
      id_peternakan   : "1",
      jenis_pakan     : "Konsentrat",
      interval_pakan  : "1",
      satuan          : "1",
      komposisi       : "Sekian",
      nutrien         : "Sekian"
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('d_jenis_pakan', null, {});

  }
};