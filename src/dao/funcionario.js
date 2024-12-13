import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM funcionario", (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM funcionario WHERE id_func = ?",
      [id],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const create = (funcionario) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO funcionario(nome, cpf, telefone, rua, bairro, cidade, estado,cargo,salario,status) values (?, ?, ?, ?, ?, ?, ?,?,?,?)",
      [
        funcionario.nome,
        funcionario.cpf,
        funcionario.telefone,
        funcionario.rua,
        funcionario.bairro,
        funcionario.cidade,
        funcionario.estado,
        funcionario.cargo,
        funcionario.salario,
        funcionario.status,
      ],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM funcionario WHERE id_func = ?",
      [id],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const update = (id, funcionario) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE funcionario SET nome = ?, cpf = ?, telefone = ?, rua = ?, bairro = ?, cidade = ?, estado = ?, cargo = ?, salario = ?, status = ? WHERE id_func = ?",
      [
        funcionario.nome,
        funcionario.cpf,
        funcionario.telefone,
        funcionario.rua,
        funcionario.bairro,
        funcionario.cidade,
        funcionario.estado,
        funcionario.cargo,
        funcionario.salario,
        funcionario.status,
        id,
      ],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}
