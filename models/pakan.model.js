module.exports = (Sequelize, DataTypes) => {
    const Pakan = Sequelize.define("Pakan", {
        id_pakan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_peternakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_jenis_pakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tanggal_pembuatan:{
            type: DataTypes.DATE,
            allowNull: true
        },
        tanggal_konsumsi:{
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: "d_pakan",
    });

    Pakan.associate = function (models) {
        Pakan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        Pakan.belongsTo(models.JenisPakan, {
            foreignKey: 'id_jenis_pakan',
            as: 'jenis_pakan'
        });
        Pakan.belongsTo(models.Kandang, {
            foreignKey: 'id',
            as: 'kandang'
        });
    };

    return Pakan;
}