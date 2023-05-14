'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_status_ternak', [
      {
        status_ternak: "Indukan"
      },
      {
        status_ternak: "Pejantan"
      },
      {
        status_ternak: "Cempe"
      },
      {
        status_ternak: "Afkir"
      },
      {
        status_ternak: "Bakalan"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_status_ternak', null, {});
  }
};
