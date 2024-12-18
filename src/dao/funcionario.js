import funcionarios from "../models/funcionario.js"

// Buscar todos os funcionários
export const findAll = () => {
  return new Promise((resolve, reject) => {
    funcionarios
      .findAll()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar um funcionário pelo ID
export const findById = (id) => {
  return new Promise((resolve, reject) => {
    funcionarios
      .findByPk(id)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Criar um novo funcionário
export const create = (funcionario) => {
  return new Promise((resolve, reject) => {
    funcionarios
      .create({
        nome: funcionario.nome,
        cpf: funcionario.cpf,
        telefone: funcionario.telefone,
        rua: funcionario.rua,
        bairro: funcionario.bairro,
        cidade: funcionario.cidade,
        estado: funcionario.estado,
        cargo: funcionario.cargo,
        salario: funcionario.salario,
        status: funcionario.status,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Deletar um funcionário pelo ID
export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    funcionarios
      .destroy({
        where: { id_func: id },
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Atualizar um funcionário pelo ID
export const update = (id, funcionario) => {
  return new Promise((resolve, reject) => {
    funcionarios
      .update(
        {
          nome: funcionario.nome,
          cpf: funcionario.cpf,
          telefone: funcionario.telefone,
          rua: funcionario.rua,
          bairro: funcionario.bairro,
          cidade: funcionario.cidade,
          estado: funcionario.estado,
          cargo: funcionario.cargo,
          salario: funcionario.salario,
          status: funcionario.status,
        },
        {
          where: { id_func: id },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}
