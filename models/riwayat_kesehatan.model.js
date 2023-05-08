module.exports = (Sequelize, DataTypes) => {
    const RiwayatKesehatan = Sequelize.define("RiwayatKesehatan", {
          id_riwayat_kesehatan:{
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
          penyakit: {
            type: DataTypes.STRING,
            allowNull: false
          },
          tanggal_sakit:{
            type: DataTypes.DATE,
            allowNull: false
          },
          tanggal_sembuh:{
            type: DataTypes.DATE,
            allowNull: true
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
        tableName: "d_riwayat_kesehatan",
    });

    RiwayatKesehatan.associate = function (models) {
        RiwayatKesehatan.belongsTo(models.Ternak, {
            foreignKey: 'id_ternak',
            as: 'ternak'
        });
        RiwayatKesehatan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    }

    return RiwayatKesehatan;
}