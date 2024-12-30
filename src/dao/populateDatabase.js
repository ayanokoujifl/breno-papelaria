import connection from "../connection.js"
import clientes from "../models/cliente.js"
import fornecedores from "../models/fornecedor.js"
import produtos from "../models/produto.js"

export async function populateDatabase() {
  try {
    // Sincronizar modelos (apenas se necessário)
    await connection.sync()

    // Inserir dados em 'clientes'
    const clientesData = [
      {
        nome: "Luís Gustavo",
        cpf: "16564423616",
        telefone: "31999999999",
        rua: "alecrim dourado",
        bairro: "Saudade",
        cidade: "Belo Horizonte",
        estado: "MG",
      },
      {
        nome: "João Silva",
        cpf: "12345678911",
        telefone: "31999999999",
        rua: "Rua das Flores",
        bairro: "Centro",
        cidade: "Itamarandiba",
        estado: "MG",
      },
      {
        nome: "Maria Oliveira",
        cpf: "98765432100",
        telefone: "31988888888",
        rua: "Avenida Principal",
        bairro: "São José",
        cidade: "Belo Horizonte",
        estado: "MG",
      },
    ]
    await clientes.bulkCreate(clientesData)

    // Inserir dados em 'fornecedores'
    const fornecedoresData = [
      {
        nome: "Fornecedor A",
        telefone: "31977777777",
        cnpj: "12345678000199",
      },
      {
        nome: "Fornecedor B",
        telefone: "31966666666",
        cnpj: "98765432000188",
      },
    ]
    const fornecedoresResult = await fornecedores.bulkCreate(fornecedoresData)

    // Inserir dados em 'produtos'
    const produtosData = [
      {
        id_forn: fornecedoresResult[0].id_forn,
        nome: "Produto X",
        preco: 99.99,
        estoque: 50,
        imagem:
          "https://i.pinimg.com/736x/91/5d/26/915d26e7b3874b594b2d14a43774eef9.jpg", // URL da imagem
      },
      {
        id_forn: fornecedoresResult[1].id_forn,
        nome: "Produto Y",
        preco: 199.99,
        estoque: 20,
        imagem: "https://example.com/produto-y.jpg", // URL da imagem
      },
    ]
    await produtos.bulkCreate(produtosData)

    console.log("Banco de dados populado com sucesso!")
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error)
  }
}
