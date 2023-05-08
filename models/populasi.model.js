module.exports = (Sequelize, DataTypes) => {
    const Populasi = Sequelize.define("Populasi", {
        id_populasi:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tanggal:{
          type: DataTypes.DATE,
          allowNull: false
        },
        populasi:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        }
    }, {
        tableName: "d_populasi",
    });

    Populasi.associate = function (models) {
        Populasi.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    };
    return Populasi;
}