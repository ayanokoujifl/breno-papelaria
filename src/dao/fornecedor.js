import fornecedores from "../models/fornecedor.js"

// Buscar todos os fornecedores
export const findAll = () => {
  return new Promise((resolve, reject) => {
    fornecedores
      .findAll()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar um fornecedor pelo ID
export const findById = (id) => {
  return new Promise((resolve, reject) => {
    fornecedores
      .findByPk(id)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Criar um novo fornecedor
export const create = (fornecedor) => {
  return new Promise((resolve, reject) => {
    fornecedores
      .create({
        nome: fornecedor.nome,
        telefone: fornecedor.telefone,
        cnpj: fornecedor.cnpj,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Deletar um fornecedor pelo ID
export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    fornecedores
      .destroy({
        where: { id_forn: id },
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Atualizar um fornecedor pelo ID
export const update = (id, fornecedor) => {
  return new Promise((resolve, reject) => {
    fornecedores
      .update(
        {
          nome: fornecedor.nome,
          telefone: fornecedor.telefone,
          cnpj: fornecedor.cnpj,
        },
        {
          where: { id_forn: id },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}
