module.exports = (Sequelize, DataTypes) => {
    const JenisKandang = Sequelize.define("JenisKandang", {
        id_jenis_kandang:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        jenis_kandang:{
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
        tableName: "d_jenis_kandang",
    });

    JenisKandang.associate = function (models) {
        JenisKandang.hasMany(models.Kandang, {
            foreignKey: 'id_jenis_kandang',
            as: 'kandang'
        });
    };
    
    return JenisKandang;
}