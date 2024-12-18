import { configDotenv } from "dotenv"
import { env } from "process"
import { Sequelize } from "sequelize"
configDotenv()

const connection = new Sequelize({
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  port: 5432,
  database: env.DB,
  dialect: "postgres",
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  dialectOptions: {
    connectTimeout: 10000,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging:false
})


connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!")
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err)
  })

export default connection
