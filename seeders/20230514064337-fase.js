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
        fase: "Kering"
      },
      {
        fase: "Pemerahan"
      },
      {
        fase: "Melahirkan"
      },  
      {
        fase: "Waiting List Perkawinan"
      },
      {
        fase: "Laktasi"
      },
      {
        fase: "Kelahiran"
      },
      {
        fase: "Kosong"
      },
  ], {});

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.bulkDelete('d_fase', null, {});
     
  }
};