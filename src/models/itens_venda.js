import { DataTypes } from "sequelize"
import connection from "../connection.js"
import produtos from "./produto.js"
import vendas from "./venda.js"

const itensVenda = connection.define("Itens_Venda", {
  id_itensv: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_prod: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: produtos,
      key: "id_prod",
    },
  },
  id_venda: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: vendas,
      key: "id_venda",
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DOUBLE,
  },
})

export default itensVenda
