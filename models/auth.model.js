module.exports = (Sequelize, DataTypes) => {
    const AuthUser = Sequelize.define("AuthUser", {
        id_user:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        image:{
          type: DataTypes.STRING,
          allowNull: true
        },
        nama_pengguna:{
          type: DataTypes.STRING,
          allowNull: true
        },
        email:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        nomor_telepon:{
          type: DataTypes.STRING,
          allowNull: true
        },
        kata_sandi:{
          type: DataTypes.STRING,
          allowNull: false
        },
        role:{
          type: DataTypes.STRING,
          allowNull: false
        },
        status:{
          type: DataTypes.STRING,
          allowNull: false
        },
        id_peternakan:{
          type: DataTypes.INTEGER,
          allowNull: true
        },
        lastAccess:{
          type: DataTypes.DATE,
          allowNull: true
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
        tableName: "auth_users",
    });

    AuthUser.associate = function (models) {
        AuthUser.belongsTo(models.Peternakan, {
            foreignKey: 'id_peternakan',
            as: 'peternakan'
        });
    }

    return AuthUser;
}