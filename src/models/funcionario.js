import { DataTypes } from "sequelize"
import connection from "../connection.js"

const funcionarios = connection.define("funcionarios", {
  id_func: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING(40),
  },
  bairro: {
    type: DataTypes.STRING(20),
  },
  cidade: {
    type: DataTypes.STRING(25),
  },
  estado: {
    type: DataTypes.STRING(2),
  },
  cargo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  salario: {
    type: DataTypes.DOUBLE,
  },
  status: {
    type: DataTypes.STRING(21),
    allowNull: false,
  },
})

export default funcionarios
