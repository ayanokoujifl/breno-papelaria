import { DataTypes } from "sequelize"
import connection from "../connection"

const controle = connection.define("Controle", {
  id_cont: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data: { type: DataTypes.DATE, allowNull: false },
  entradas: { type: DataTypes.DOUBLE, defaultValue: 0 },
  saidas: { type: DataTypes.DOUBLE, defaultValue: 0 },
})

export default controle
