module.exports = (Sequelize, DataTypes) => {
    const Peternakan = Sequelize.define("Peternakan", {
        id_peternakan:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nama_peternakan:{
          type: DataTypes.STRING,
          allowNull: false
        },
        alamat:{
          type: DataTypes.STRING,
          allowNull: false
        },
        postcode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude:{
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude:{
            type: DataTypes.STRING,
            allowNull: true
        },
        alamat_postcode:{
            type: DataTypes.STRING,
            allowNull: true
        },
        subscribe:{
            type: DataTypes.DATE,
            allowNull: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: "d_peternakan",
    });

    Peternakan.associate = function (models) {
        Peternakan.hasMany(models.Ternak, {
            foreignKey: 'id_peternakan',
            as: 'ternak'
        });
        Peternakan.hasMany(models.AuthUser, {
            foreignKey: 'id_peternakan',
            as: 'user'
        });
        Peternakan.hasMany(models.Kandang, {
            foreignKey: 'id_peternakan',
            as: 'kandang'
        });
        Peternakan.hasMany(models.Pakan, {
            foreignKey: 'id_peternakan',
            as: 'pakan'
        });
        Peternakan.hasMany(models.BahanPakan, {
            foreignKey: 'id_peternakan',
            as: 'bahan_pakan'
        });
        Peternakan.hasMany(models.LKPemasukan, {
            foreignKey: 'id_peternakan',
            as: 'lk_pemasukan'
        });
        Peternakan.hasMany(models.Populasi, {
            foreignKey: 'id_peternakan',
            as: 'populasi'
        });
        Peternakan.hasMany(models.RiwayatFase, {
            foreignKey: 'id_peternakan',
            as: 'riwayat_fase'
        });
        Peternakan.hasMany(models.Adaptasi, {
            foreignKey: 'id_peternakan',
            as: 'adaptasi'
        });
      }

    return Peternakan;
}