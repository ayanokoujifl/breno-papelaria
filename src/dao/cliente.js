import connection from "../connection.js"
import clientes from "../models/cliente.js" // Supondo que o modelo 'clientes' esteja configurado corretamente

export const findAll = () => {
  return clientes.findAll() // Retorna todas as entradas da tabela 'clientes'
}

export const findById = (id) => {
  return clientes.findByPk(id) // Busca um clientes pelo ID (primary key)
}

export const findByCpf = (cpf) => {
  return clientes.findAll({
    where: {
      cpf: cpf,
    },
  })
}

export const create = (cliente) => {
  return new Promise((resolve, reject) =>
    clientes
      .create({
        nome: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        rua: cliente.rua,
        bairro: cliente.bairro,
        cidade: cliente.cidade,
        estado: cliente.estado,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  )
}

export const deleteById = (id) => {
  return clientes.destroy({
    where: {
      id_cli: id, // Deleta um clientes pelo ID
    },
  })
}

export const update = (id, cliente) => {
  return new Promise((resolve, reject) => {
    clientes
      .update(
        {
          nome: cliente.nome,
          cpf: cliente.cpf,
          telefone: cliente.telefone,
          rua: cliente.rua,
          bairro: cliente.bairro,
          cidade: cliente.cidade,
          estado: cliente.estado,
        },
        {
          where: {
            id_cli: id, // Atualiza um clientes pelo ID
          },
        }
      )
      .then((result) => {
        if (result[0] > 0) {
          resolve(result)
        } else {
          reject({
            message: "Funcionario não encontrado",
          })
        }
      })
  })
}
