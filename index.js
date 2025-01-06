import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import loadTables from "./src/models/createTables.js"
import clienteRoutes from "./src/routes/clientes.js"
import comprasRoutes from "./src/routes/compras.js"
import fornecedoresRoutes from "./src/routes/fornecedor.js"
import funcionarioRoutes from "./src/routes/funcionarios.js"
import itensCompraRoutes from "./src/routes/itens_compra.js"
import itensVendaRoutes from "./src/routes/itens_venda.js"
import produtosRoutes from "./src/routes/produtos.js"
import vendasRoutes from "./src/routes/vendas.js"
import cors from "cors"

// Criar __dirname manualmente
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use("/clientes", clienteRoutes)
app.use("/funcionarios", funcionarioRoutes)
app.use("/fornecedores", fornecedoresRoutes)
app.use("/produtos", produtosRoutes)
app.use("/compras", comprasRoutes)
app.use("/itens_compra", itensCompraRoutes)
app.use("/vendas", vendasRoutes)
app.use("/itens_venda", itensVendaRoutes)

app.use("/", express.static(__dirname + "/src/views"))

loadTables()

app.listen(3000)
