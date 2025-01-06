import { DataTypes } from "sequelize"
import connection from "../connection.js"
import fornecedores from "./fornecedor.js"
import funcionarios from "./funcionario.js"

const compras = connection.define("compras", {
  id_compra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_forn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: fornecedores,
      key: "id_forn",
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
    type: DataTypes.STRING(35),
  },
  valortotal: {
    type: DataTypes.DOUBLE,
  },
})

export default compras
