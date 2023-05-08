module.exports = (Sequelize, DataTypes) => {
    const JenisBahanPakan = Sequelize.define("JenisBahanPakan", {
        id_jenis_bahan_pakan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_peternakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jenis_bahan_pakan:{
            type: DataTypes.STRING,
            allowNull: false
        },
        satuan:{
            type: DataTypes.STRING,
            allowNull: false
        },
        stok:{
            type: DataTypes.INTEGER,
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
        tableName: "d_jenis_bahan_pakan",
    });

    JenisBahanPakan.associate = function (models) {
        JenisBahanPakan.hasMany(models.BahanPakan, {
            foreignKey: 'id_jenis_bahan_pakan',
            as: 'bahan_pakan'
        });
        JenisBahanPakan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    };

    return JenisBahanPakan;
}