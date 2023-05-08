module.exports = (Sequelize, DataTypes) => {
    const Kandang = Sequelize.define("Kandang", {
        id_kandang:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_peternakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        kode_kandang:{
            type: DataTypes.STRING,
            allowNull: false
        },
        id_jenis_kandang:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_jenis_pakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        persentase_kebutuhan_pakan:{
            type: DataTypes.INTEGER,
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
        tableName: "d_kandang",
    });

    Kandang.associate = function (models) {
        Kandang.hasMany(models.Ternak, {
            foreignKey: 'id_kandang',
            as: 'ternak'
        });
        Kandang.belongsTo(models.JenisPakan, {
            foreignKey: 'id_jenis_pakan',
            as: 'jenis_pakan'
        });
        Kandang.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
        Kandang.belongsTo(models.JenisKandang, {
            foreignKey: 'id_jenis_kandang',
            as: 'jenis_kandang'
        });
    };

    return Kandang;
}