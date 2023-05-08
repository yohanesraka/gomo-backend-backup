module.exports = (Sequelize, DataTypes) => {
    const StatusTernak = Sequelize.define("StatusTernak", {
        id_status_ternak:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        status_ternak:{
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
        tableName: "d_status_ternak",
    });

    StatusTernak.associate = function (models) {
        StatusTernak.hasMany(models.Ternak, {
            foreignKey: 'id_status_ternak',
            as: 'ternak'
        });
    };
    return StatusTernak;
}