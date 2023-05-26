const {
  Sequelize,
  DataTypes
} = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
  const ProduksiSusu = Sequelize.define("ProduksiSusu", {
    id_produksi_susu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_peternakan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'd_peternakan',
        key: 'id_peternakan'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    id_ternak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 's_ternak',
        key: 'id_ternak'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    id_fp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'd_fase',
        key: 'id_fp'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    produksi_pagi: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    produksi_sore: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_harian: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    tanggal_produksi: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }

  }, {
    tableName: "d_produksi_susu",
  });

  ProduksiSusu.associate = function (models) {
    ProduksiSusu.belongsTo(models.Fase, {
      foreignKey: 'id_fp',
      as: 'fase'
    });
    ProduksiSusu.belongsTo(models.Peternakan, {
      foreignKey: 'id_peternakan',
      as: 'peternakan'
    });
    ProduksiSusu.belongsTo(models.Ternak, {
      foreignKey: 'id_ternak',
      as: 'ternak'
    });
  };

  return ProduksiSusu;
}