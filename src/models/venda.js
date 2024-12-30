import { DataTypes } from "sequelize"
import connection from "../connection.js"
import clientes from "./cliente.js"
import funcionarios from "./funcionario.js"

const vendas = connection.define(
  "Vendas",
  {
    id_venda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cli: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: clientes,
        key: "id_cli",
      },
    },
    id_func: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: funcionarios,
        key: "id_func",
      },
    },

    formapagamento: {
      type: DataTypes.STRING(25),
    },
    valortotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
)

export default vendas
