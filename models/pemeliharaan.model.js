module.exports = (Sequelize, DataTypes) => {
    const Pemeliharaan = Sequelize.define("Pemeliharaan", {
        id_pemeliharaan:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_kandang:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tanggal_pemeliharaan:{
          type: DataTypes.DATE,
          allowNull: false
        },
        jenis_pakan:{
          type: DataTypes.STRING,
          allowNull: false
        },
        jumlah_pakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        pembersihan_kandang:{
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        pembersihan_ternak:{
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        createdAt: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        }
    }, {
        tableName: "d_pemeliharaan",
    });

    Pemeliharaan.associate = function (models) {
        Pemeliharaan.belongsTo(models.Kandang, {
            foreignKey: 'id_kandang',
            as: 'kandang'
        });
        Pemeliharaan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    }

    return Pemeliharaan;
}