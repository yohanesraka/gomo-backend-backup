'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_kandang', [
    {
      jenis_kandang: 'Kandang Pemasukan',
    },
    {
      jenis_kandang: 'Kandang Adaptasi',
    },
    {
      jenis_kandang: 'Kandang Perkawinan',
    },
    {
      jenis_kandang: 'Kandang Kebuntingan',
    },
    {
      jenis_kandang: 'Kandang Melahirkan'
    },
    {
      jenis_kandang: 'Kandang Kosong'
    },
    {
      jenis_kandang: 'Kandang Laktasi'
    },
    {
      jenis_kandang: 'Kering'
    },
    {
      jenis_kandang: 'Waiting List Perkawinan'
    },
    {
      jenis_kandang: 'Kelahiran'
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_kandang', null, {});
  }
};
