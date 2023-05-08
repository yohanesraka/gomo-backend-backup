module.exports = (Sequelize, DataTypes) => {
    const Penyakit = Sequelize.define("Penyakit", {
        id_penyakit:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nama_penyakit:{
          type: DataTypes.STRING,
          allowNull: false
        },
        gejala:{
          type: DataTypes.STRING,
          allowNull: false
        },
        penanganan:{
          type: DataTypes.STRING,
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
        tableName: "d_penyakit",
    });

    Penyakit.associate = function (models) {
        Penyakit.hasMany(models.Kesehatan, {
            foreignKey: 'id_penyakit',
            as: 'kesehatan'
        });
    }

    return Penyakit;
}