"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "d_produksi_susu",
            [
                {
                    id_peternakan: 1,
                    id_ternak: 2,
                    id_fp: 7,
                    produksi_pagi: 800,
                    produksi_sore: 1000,
                    total_harian: 1800,
                    tanggal_produksi: "2021-01-01",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 2,
                    id_fp: 7,
                    produksi_pagi: 900,
                    produksi_sore: 1200,
                    total_harian: 2100,
                    tanggal_produksi: "2021-01-02",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 2,
                    id_fp: 7,
                    produksi_pagi: 900,
                    produksi_sore: 1300,
                    total_harian: 2200,
                    tanggal_produksi: "2021-01-03",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 2,
                    id_fp: 7,
                    produksi_pagi: 700,
                    produksi_sore: 1200,
                    total_harian: 1900,
                    tanggal_produksi: "2021-01-04",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 4,
                    id_fp: 7,
                    produksi_pagi: 800,
                    produksi_sore: 1000,
                    total_harian: 1800,
                    tanggal_produksi: "2021-01-01",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 4,
                    id_fp: 7,
                    produksi_pagi: 900,
                    produksi_sore: 1200,
                    total_harian: 2100,
                    tanggal_produksi: "2021-01-02",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 4,
                    id_fp: 7,
                    produksi_pagi: 900,
                    produksi_sore: 1300,
                    total_harian: 2200,
                    tanggal_produksi: "2021-01-03",
                    kualitas: 80,
                },
                {
                    id_peternakan: 1,
                    id_ternak: 4,
                    id_fp: 7,
                    produksi_pagi: 700,
                    produksi_sore: 1200,
                    total_harian: 1900,
                    tanggal_produksi: "2021-01-02",
                    kualitas: 80,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("d_produksi_susu", null, {});
    },
};
