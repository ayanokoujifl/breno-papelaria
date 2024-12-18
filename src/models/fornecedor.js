import { DataTypes } from "sequelize"
import connection from "../connection.js"

const fornecedores = connection.define("fornecedores", {
  id_forn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
})

export default fornecedores
