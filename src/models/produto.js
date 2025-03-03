import { DataTypes } from "sequelize"
import connection from "../connection.js"
import fornecedores from "./fornecedor.js"

const produtos = connection.define("produtos", {
  id_prod: {
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
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  preco: {
    type: DataTypes.DOUBLE,
  },
  estoque: {
    type: DataTypes.INTEGER,
  },
  imagem: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
})

export default produtos
