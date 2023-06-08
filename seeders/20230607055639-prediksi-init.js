"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        for (let i = 0; i < 240; i++) {
            const currentTimestamp = new Date();
            currentTimestamp.setHours(currentTimestamp.getHours()); // Mengatur jam menjadi WIB
            currentTimestamp.setHours(7);
            currentTimestamp.setMinutes(0);
            currentTimestamp.setSeconds(0);
            currentTimestamp.setMilliseconds(0);
            currentTimestamp.setDate(currentTimestamp.getDate() + i);
            const data = {
                id_hari: i + 1,
                tanggal: currentTimestamp,
            };
            await queryInterface.bulkInsert("d_prediksi_susu", [data]);
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("d_prediksi_susu", null, {});
    },
};
