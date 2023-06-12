'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('auth_users', [{
      nama_pengguna : "Bobby",
      email : "juanumpele29@gmail.com",
      kata_sandi : "$2b$10$B73vva29VVqUmh0M8WbmVOQwOVJu3LNmq2TLi55MXh1AwLugY1Yqe",
      nomor_telepon : "082313235678",
      status : "active",
      role : "admin",
      id_peternakan : "1"
      

     }], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('auth_users', null, {});
  }
};
