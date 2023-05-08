module.exports = (Sequelize, DataTypes) => {
    const Treatment = Sequelize.define("Treatment", {
        id_treatment:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        step:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        treatment:{
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
        tableName: "d_treatment",
    });

    Treatment.associate = function (models) {
        Treatment.hasMany(models.Adaptasi, {
            foreignKey: 'id_treatment',
            as: 'adaptasi'
        });
    };

    return Treatment;
}