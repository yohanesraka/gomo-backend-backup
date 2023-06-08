module.exports = (Sequelize, DataTypes) => {
    const Prediksi = Sequelize.define(
        "Prediksi",
        {
            id_hari: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            tanggal: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            data_literasi: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            data_prediksi: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "d_prediksi_susu",
        }
    );

    return Prediksi;
};
