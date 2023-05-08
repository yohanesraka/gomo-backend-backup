module.exports = (Sequelize, DataTypes) => {
    const RiwayatKelahiran = Sequelize.define("RiwayatKelahiran", {
        id_kelahiran:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_ternak:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tanggal_masuk:{
          type: DataTypes.DATE,
          allowNull: false
        },
        tanggal_lahir:{
          type: DataTypes.DATE,
          allowNull: false
        },
        id_sire:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        id_dam:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        jenis_kelamin:{
          type: DataTypes.STRING,
          allowNull: false
        },
        bangsa:{
          type: DataTypes.STRING,
          allowNull: false
        },
        kode_kandang:{
          type: DataTypes.STRING,
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
        tableName: "d_riwayat_kelahiran",
    });

    RiwayatKelahiran.associate = (models) => {
        RiwayatKelahiran.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        RiwayatKelahiran.belongsTo(models.Ternak, {
            foreignKey: 'id_ternak',
            as: 'ternak'
        });
        RiwayatKelahiran.belongsTo(models.Ternak, {
            foreignKey: 'id_sire',
            as: 'sire'
        });
        RiwayatKelahiran.belongsTo(models.Ternak, {
            foreignKey: 'id_dam',
            as: 'dam'
        });
    };

    return RiwayatKelahiran;
}