import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM produto", (err, results) => {
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
      "SELECT * FROM produto WHERE id_prod = ?",
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

export const create = (produto) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO produto(id_forn,nome,preco,estoque) values (?, ?, ?, ?)",
      [produto.id_forn, produto.nome, produto.preco, produto.estoque],
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
      "DELETE FROM produto WHERE id_prod = ?",
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

export const update = (id, produto) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE produto SET id_forn = ?, nome = ?, preco = ?, estoque = ? WHERE id_prod = ?",
      [produto.id_forn, produto.nome, produto.preco, produto.estoque, id],
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
