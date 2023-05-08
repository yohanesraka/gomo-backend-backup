module.exports = (Sequelize, DataTypes) => {
    const RiwayatPerkawinan = Sequelize.define("RiwayatPerkawinan", {
        id_riwayat_perkawinan:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_indukan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_pejantan:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        id_kandang:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        tanggal_perkawinan:{
          type: DataTypes.DATE,
          allowNull: false
        },
        status:{
          type: DataTypes.STRING,
          allowNull: false
        },
        usg:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true
        }
    }, {
        tableName: "d_riwayat_perkawinan",
    });

    RiwayatPerkawinan.associate = function (models) {
        RiwayatPerkawinan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        RiwayatPerkawinan.belongsTo(models.Ternak, {
            foreignKey: 'id_indukan',
            as: 'indukan'
        });
        RiwayatPerkawinan.belongsTo(models.Ternak, {
            foreignKey: 'id_pejantan',
            as: 'pejantan'
        });
        RiwayatPerkawinan.belongsTo(models.Kandang, {
            foreignKey: 'id_kandang',
            as: 'kandang'
        });
        RiwayatPerkawinan.hasOne(models.RiwayatKebuntingan, {
            foreignKey: 'id_riwayat_perkawinan',
            as: 'riwayat_kebuntingan'
        });
    };

    return RiwayatPerkawinan;
}