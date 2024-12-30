import itensVenda from "../models/itens_venda.js"

export const findByVenda = (id_venda) => {
  return new Promise((resolve, reject) => {
    itensVenda
      .findAll({ where: { id_venda } })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar todos os itens de venda
export const findAll = () => {
  return new Promise((resolve, reject) => {
    itensVenda
      .findAll()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar um item de venda pelo ID
export const findById = (id) => {
  return new Promise((resolve, reject) => {
    itensVenda
      .findByPk(id)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Criar um novo item de venda
export const create = (itemVenda) => {
  return new Promise((resolve, reject) => {
    itensVenda
      .create({
        id_prod: itemVenda.id_prod,
        id_venda: itemVenda.id_venda,
        id_func: itemVenda.id_func,
        quantidade: itemVenda.quantidade,
        preco: itemVenda.preco,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Deletar um item de venda pelo ID
export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    const rowsDeleted = itensVenda.destroy({
      where: { id_itensv: id },
    })
    if (rowsDeleted === 0) {
      reject(new Error(`Item de venda com ID ${id} nao encontrado.`))
    }
  })
}

// Atualizar um item de venda pelo ID
export const update = (id, itemVenda) => {
  return new Promise((resolve, reject) => {
    itensVenda
      .update(
        {
          id_prod: itemVenda.id_prod,
          id_venda: itemVenda.id_venda,
          id_func: itemVenda.id_func,
          quantidade: itemVenda.quantidade,
          preco: itemVenda.preco,
        },
        {
          where: { id_itensv: id },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}
