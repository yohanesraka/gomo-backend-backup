"use strict";

const { SqlError } = require("mariadb");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("d_produksi_susu", {
            id_produksi_susu: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_peternakan: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "d_peternakan",
                    key: "id_peternakan",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_ternak: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "s_ternak",
                    key: "id_ternak",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_fp: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "d_fase",
                    key: "id_fp",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            produksi_pagi: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            produksi_sore: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            total_harian: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            tanggal_produksi: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            kualitas: {
                type: Sequelize.STRING,
                defaultValue: "-",
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("d_produksi_susu");
    },
};
