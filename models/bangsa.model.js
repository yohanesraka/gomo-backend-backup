module.exports = (Sequelize, DataTypes) => {
    const Bangsa = Sequelize.define("Bangsa", {
        id_bangsa:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        bangsa:{
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
    }, {
        tableName: "d_bangsa",
    });

    Bangsa.associate = function (models) {
        Bangsa.hasMany(models.Ternak, {
            foreignKey: 'id_bangsa',
            as: 'ternak'
        });
    }

    return Bangsa;
}