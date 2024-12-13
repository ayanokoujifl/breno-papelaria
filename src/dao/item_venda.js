import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM itens_venda", (err, results) => {
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
      "SELECT * FROM itens_venda WHERE id_itensv = ?",
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

export const create = (item_venda) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO itens_venda(id_prod,id_venda,id_func,quantidade,preco) values (?, ?, ?, ?, ?)",
      [
        item_venda.id_prod,
        item_venda.id_venda,
        item_venda.id_func,
        item_venda.quantidade,
        item_venda.preco,
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
      "DELETE FROM itens_venda WHERE id_itensv = ?",
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

export const update = (id, item_venda) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE itens_venda SET id_prod=?, id_venda=?,id_func=?,quantidade=?,preco=? WHERE id_itensv = ?",
      [
        item_venda.id_prod,
        item_venda.id_venda,
        item_venda.id_func,
        item_venda.quantidade,
        item_venda.preco,
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
