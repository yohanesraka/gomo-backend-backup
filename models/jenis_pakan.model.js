module.exports = (Sequelize, DataTypes) => {
    const JenisPakan = Sequelize.define("JenisPakan", {
        id_jenis_pakan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_peternakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jenis_pakan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        interval_pakan: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        satuan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        komposisi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nutrien: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: "d_jenis_pakan",
    });

    JenisPakan.associate = function (models) {
        JenisPakan.hasMany(models.Pakan, {
            foreignKey: 'id_jenis_pakan',
            as: 'pakan'
        });
        JenisPakan.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    };

    return JenisPakan;
}