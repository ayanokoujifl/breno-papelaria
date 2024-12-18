import clientes from "./cliente.js"
import compras from "./Compra.js"
import fornecedores from "./fornecedor.js"
import funcionarios from "./funcionario.js"
import itensCompra from "./itens_compra.js"
import itensVenda from "./itens_venda.js"
import produtos from "./produto.js"
import vendas from "./venda.js"

async function loadTables() {
  await clientes.sync({ force: true })
  await funcionarios.sync({ force: true })
  await fornecedores.sync({ force: true })
  await produtos.sync({ force: true })
  await compras.sync({ force: true })
  await vendas.sync({ force: true })
  await itensCompra.sync({ force: true })
  await itensVenda.sync({ force: true })
}

export default loadTables
