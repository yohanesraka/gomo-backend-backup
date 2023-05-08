module.exports = (Sequelize, DataTypes) => {
    const RiwayatKebuntingan = Sequelize.define("RiwayatKebuntingan", {
        id_riwayat_kebuntingan:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_riwayat_perkawinan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_indukan:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        id_pejantan:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        tanggal_perkawinan:{
          type: DataTypes.DATE,
          allowNull: false
        },
        tanggal_kebuntingan:{
          type: DataTypes.DATE,
          allowNull: false
        },
        status:{
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true
        }
    }, {
        tableName: "d_riwayat_kebuntingan",
    });

    RiwayatKebuntingan.associate = function (models) {
        RiwayatKebuntingan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        RiwayatKebuntingan.belongsTo(models.Ternak, {
            foreignKey: 'id_indukan',
            as: 'indukan'
        });
        RiwayatKebuntingan.belongsTo(models.Ternak, {
            foreignKey: 'id_pejantan',
            as: 'pejantan'
        });
        RiwayatKebuntingan.belongsTo(models.RiwayatPerkawinan, {
            foreignKey: 'id_riwayat_perkawinan',
            as: 'riwayat_perkawinan'
        });
    };

    return RiwayatKebuntingan;
}