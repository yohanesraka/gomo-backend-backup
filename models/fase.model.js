module.exports = (Sequelize, DataTypes) => {
    const Fase = Sequelize.define("Fase", {
        id_fp:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        fase:{
          type: DataTypes.STRING,
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
        tableName: "d_fase",
    });

    Fase.associate = function (models) {
        Fase.hasMany(models.Ternak, {
            foreignKey: 'id_fp',
            as: 'ternak'
        });
        Fase.hasMany(models.RiwayatFase, {
            foreignKey: 'id_fp',
            as: 'riwayat_fase'
        });
    };
    return Fase;
}