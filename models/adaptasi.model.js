module.exports = (Sequelize, DataTypes) => {
    const Adaptasi = Sequelize.define("Adaptasi", {
        id_adaptasi:{
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
        id_treatment:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tanggal_adaptasi:{
          type: DataTypes.DATE,
          allowNull: false
        },
        id_kandang: {
          type: DataTypes.INTEGER,
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
        tableName: "d_adaptasi",
    });

    Adaptasi.associate = function (models) {
        Adaptasi.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        Adaptasi.belongsTo(models.Ternak, {
            foreignKey: 'id_ternak',
            as: 'ternak'
        });
        Adaptasi.belongsTo(models.Treatment, {
            foreignKey: 'id_treatment',
            as: 'treatment'
        });
        Adaptasi.belongsTo(models.Kandang, {
            foreignKey: 'id_kandang',
            as: 'kandang'
        });
    };
    
    return Adaptasi;
}