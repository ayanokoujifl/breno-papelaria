import { DataTypes } from "sequelize"
import connection from "../connection.js"
import produtos from "./produto.js"
import compras from "./compra.js"

const itensCompra = connection.define("Itens_Compra", {
  id_itensc: {
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
    onDelete: "CASCADE",
  },
  id_compra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: compras,
      key: "id_compra",
    },
    onDelete: "CASCADE",
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
  },
})

export default itensCompra
