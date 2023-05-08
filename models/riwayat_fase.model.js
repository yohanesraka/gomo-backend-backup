module.exports = (Sequelize, DataTypes) => {
    const RiwayatFase = Sequelize.define("RiwayatFase", {
        id_riwayat_fase:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_fp:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_ternak:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tanggal:{
          type: DataTypes.DATE,
          allowNull: false
        },
        createdAt:{
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt:{
          type: DataTypes.DATE,
          allowNull: false
        }
    }, {
        tableName: "d_riwayat_fase",
    });

    RiwayatFase.associate = function (models) {
        RiwayatFase.belongsTo(models.Fase, {
            foreignKey: 'id_fp',
            as: 'fase'
        });
        RiwayatFase.belongsTo(models.Ternak, {
            foreignKey: 'id_ternak',
            as: 'ternak'
        });
        RiwayatFase.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    };

    return RiwayatFase;
}