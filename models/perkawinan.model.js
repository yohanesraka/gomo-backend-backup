module.exports = (Sequelize, DataTypes) => {
    const Perkawinan = Sequelize.define("Perkawinan", {
        id_perkawinan:{
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
          allowNull: false
        },
        id_kandang:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        tanggal_perkawinan:{
          type: DataTypes.DATE,
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM,
          values: [
            'Bunting',
            'Tidak Bunting',
            'Abortus',
          ],
        },
        usg_1:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        usg_2:{
          type: DataTypes.BOOLEAN,
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
        tableName: "d_perkawinan",
    });

    Perkawinan.associate = function (models) {
        Perkawinan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        Perkawinan.belongsTo(models.Ternak, {
            foreignKey: 'id_indukan',
            as: 'indukan'
        });
        Perkawinan.belongsTo(models.Ternak, {
            foreignKey: 'id_pejantan',
            as: 'pejantan'
        });
        Perkawinan.belongsTo(models.Kandang, {
            foreignKey: 'id_kandang',
            as: 'kandang'
        });
    };

    return Perkawinan;
}