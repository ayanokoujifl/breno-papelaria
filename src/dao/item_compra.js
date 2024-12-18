import itensCompra from "../models/itens_compra.js"

// Buscar todos os itens de compra
export const findAll = () => {
  return new Promise((resolve, reject) => {
    itensCompra
      .findAll()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar um item de compra pelo ID
export const findById = (id) => {
  return new Promise((resolve, reject) => {
    itensCompra
      .findByPk(id)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Criar um novo item de compra
export const create = (itemCompra) => {
  return new Promise((resolve, reject) => {
    itensCompra
      .create({
        id_prod: itemCompra.id_prod,
        id_compra: itemCompra.id_compra,
        quantidade: itemCompra.quantidade,
        total: itemCompra.total,
      })
      .then((result) => resolve(result))
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          reject({ error: "Verifique os dados e tente novamente" })
        } else {
          reject({ error: "Erro ao criar item de compra: " + err.message })
        }
      })
  })
}

// Deletar um item de compra pelo ID
export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    itensCompra
      .destroy({
        where: { id_itensc: id },
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Atualizar um item de compra pelo ID
export const update = (id, itemCompra) => {
  return new Promise((resolve, reject) => {
    itensCompra
      .update(
        {
          id_prod: itemCompra.id_prod,
          id_compra: itemCompra.id_compra,
          quantidade: itemCompra.quantidade,
          total: itemCompra.total,
        },
        {
          where: { id_itensc: id },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}
