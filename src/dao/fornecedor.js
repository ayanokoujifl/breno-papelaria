import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM fornecedor", (err, results) => {
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
      "SELECT * FROM fornecedor WHERE id_forn = ?",
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

export const create = (fornecedor) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO fornecedor(nome, telefone, cnpj) values (?, ?, ?)",
      [fornecedor.nome, fornecedor.telefone, fornecedor.cnpj],
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
      "DELETE FROM fornecedor WHERE id_forn = ?",
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

export const update = (id, fornecedor) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE fornecedor SET nome = ?, telefone = ?, cnpj = ? WHERE id_forn = ?",
      [fornecedor.nome, fornecedor.telefone, fornecedor.cnpj, id],
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
