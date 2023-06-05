'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase', [
      { 
        fase: "Pemasukan"
      },
      {
        fase: "Adaptasi"
      },
      {
        fase: "Perkawinan"
      },
      {
        fase: "Kebuntingan"
      },
      {
        fase: "Melahirkan"
      }, 
      {
        fase: "Kosong"
      },
      {
        fase: "Laktasi"
      },
      {
        fase: "Kering"
      },
      {
        fase: "Waiting List Perkawinan"
      },
      {
        fase: "Kelahiran"
      },
     
  ], {});

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.bulkDelete('d_fase', null, {});
     
  }
};