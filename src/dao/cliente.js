import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM cliente", (err, results) => {
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
      "SELECT * FROM cliente WHERE id_cli = ?",
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

export const findByCpf = (cpf) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM cliente WHERE cpf = ? limit 1",
      [cpf],
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

export const create = (cliente) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO cliente(nome, cpf, telefone, rua, bairro, cidade, estado) values (?, ?, ?, ?, ?, ?, ?)",
      [
        cliente.nome,
        cliente.cpf,
        cliente.telefone,
        cliente.rua,
        cliente.bairro,
        cliente.cidade,
        cliente.estado,
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
      "DELETE FROM cliente WHERE id_cli = ?",
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

export const update = (id, cliente) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE cliente SET nome = ?, cpf = ?, telefone = ?, rua = ?, bairro = ?, cidade = ?, estado = ? WHERE id_cli = ?",
      [
        cliente.nome,
        cliente.cpf,
        cliente.telefone,
        cliente.rua,
        cliente.bairro,
        cliente.cidade,
        cliente.estado,
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
