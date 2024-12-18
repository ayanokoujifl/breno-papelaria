import produtos from "../models/produto.js"

// Buscar todos os produtos
export const findAll = () => {
  return new Promise((resolve, reject) => {
    produtos
      .findAll()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar um produto pelo ID
export const findById = (id) => {
  return new Promise((resolve, reject) => {
    produtos
      .findByPk(id)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Criar um novo produto
export const create = (produto) => {
  return new Promise((resolve, reject) => {
    produtos
      .create({
        id_forn: produto.id_forn,
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.estoque,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Deletar um produto pelo ID
export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    const rowsDeleted = produtos.destroy({
      where: { id_prod: id },
    })

    if (rowsDeleted === 0) {
      reject(new Error(`Produto com ID ${id} nao pode ser deletado.`))
    }
  })
}

// Atualizar um produto pelo ID
export const update = (id, produto) => {
  return new Promise((resolve, reject) => {
    produtos
      .update(
        {
          id_forn: produto.id_forn,
          nome: produto.nome,
          preco: produto.preco,
          estoque: produto.estoque,
        },
        {
          where: { id_prod: id },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}
