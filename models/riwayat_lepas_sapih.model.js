module.exports = (Sequelize, DataTypes) => {
    const RiwayatLepasSapih = Sequelize.define("RiwayatLepasSapih", {
        id_riwayat_lepas_sapih: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_peternakan: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_ternak: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tanggal_lepas_sapih: {
            type: DataTypes.DATE,
            allowNull: false
        },
        kode_kandang: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {   
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        tableName: "d_riwayat_lepas_sapih",
    })

    RiwayatLepasSapih.associate = function (models) {
        RiwayatLepasSapih.belongsTo(models.Ternak, {
            foreignKey: 'id_ternak',
            as: 'ternak'
        });
        RiwayatLepasSapih.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    }

    return RiwayatLepasSapih;
}