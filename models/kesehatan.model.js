module.exports = (Sequelize, DataTypes) => {
    const Kesehatan = Sequelize.define("Kesehatan", {
          id_kesehatan:{
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
            allowNull: false,
          },
          id_penyakit:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          tanggal_sakit:{
            type: DataTypes.DATE,
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
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
    }, {
        tableName: "d_kesehatan",
    });

    Kesehatan.associate = function (models) {
        Kesehatan.belongsTo(models.Penyakit, {
            foreignKey: 'id_penyakit',
            as: 'penyakit'
        });
        Kesehatan.belongsTo(models.Ternak, {
            foreignKey: 'id_ternak',
            as: 'ternak'
        });
        Kesehatan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    }

    return Kesehatan;
}