'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('d_peternakan', [{
            nama_peternakan: "joestin",
            alamat: "Yogyakarta Nannies, Jalan Mantrigawen Lor, Panembahan, Yogyakarta City, Special Region of Yogyakarta 55131",
            postcode: "96181",
            alamat_postcode: "55131",

        }], {});

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('d_peternakan', null, {});
    }
};