'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_bangsa', [
      {
        bangsa: 'Saanen'
      },
      {
        bangsa: 'Saperah'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_bangsa', null, {});
  }
};
