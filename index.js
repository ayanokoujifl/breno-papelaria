import express from "express"
import clienteRoutes from "./src/routes/clientes.js"
import funcionarioRoutes from "./src/routes/funcionarios.js"
import fornecedoresRoutes from "./src/routes/fornecedor.js"
import produtosRoutes from "./src/routes/produtos.js"
import comprasRoutes from "./src/routes/compras.js"
import itensCompraRoutes from "./src/routes/itens_compra.js"
import vendasRoutes from "./src/routes/vendas.js"
import itensVendaRoutes from "./src/routes/itens_venda.js"

const app = express()
app.use(express.json())
app.use("/clientes", clienteRoutes)
app.use("/funcionarios", funcionarioRoutes)
app.use("/fornecedores", fornecedoresRoutes)
app.use("/produtos", produtosRoutes)
app.use("/compras", comprasRoutes)
app.use("/itens_compra", itensCompraRoutes)
app.use("/vendas", vendasRoutes)
app.use("/itens_venda", itensVendaRoutes)

app.listen(3000)
