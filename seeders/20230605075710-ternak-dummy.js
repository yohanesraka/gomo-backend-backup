"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "s_ternak",
            [
                {
                    id_peternakan: 1,
                    rf_id: "00000001",
                    image: null,
                    jenis_kelamin: "Jantan",
                    id_bangsa: 1,
                    id_fp: 3,
                    tanggal_lahir: "2021-01-01",
                    tanggal_masuk: "2021-01-01",
                },
                {
                    id_peternakan: 1,
                    rf_id: "00000002",
                    image: null,
                    jenis_kelamin: "Betina",
                    id_bangsa: 1,
                    id_fp: 7,
                    tanggal_lahir: "2021-01-01",
                    tanggal_masuk: "2021-01-01",
                    status_perah: "Perah",
                },
                {
                    id_peternakan: 1,
                    rf_id: "00000003",
                    image: null,
                    jenis_kelamin: "Jantan",
                    id_bangsa: 2,
                    id_fp: 1,
                    tanggal_lahir: "2021-01-01",
                    tanggal_masuk: "2021-01-01",
                },
                {
                    id_peternakan: 1,
                    rf_id: "00000004",
                    image: null,
                    jenis_kelamin: "Betina",
                    id_bangsa: 2,
                    id_fp: 7,
                    tanggal_lahir: "2021-01-01",
                    tanggal_masuk: "2021-01-01",
                    status_perah: "Perah",
                },
                {
                    id_peternakan: 1,
                    rf_id: "00000004",
                    image: null,
                    jenis_kelamin: "Jantan",
                    id_bangsa: 1,
                    id_fp: 2,
                    id_dam: 1,
                    id_sire: 2,
                    tanggal_lahir: "2021-01-01",
                    tanggal_masuk: "2021-01-01",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("s_ternak", null, {});
    },
};
