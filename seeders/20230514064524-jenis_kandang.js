'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_kandang', [
    {
      jenis_kandang: 'Kandang Kawin',
    },
    {
      jenis_kandang: 'Kandang Laktasi',
    },
    {
      jenis_kandang: 'Kandang Cempe',
    },
    {
      jenis_kandang: 'Kandang Karantina',
    },
    {
      jenis_kandang: 'Kandang Kebuntingan'
    },
    {
      jenis_kandang: 'Kandang Lepas Sapih'
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_kandang', null, {});
  }
};
