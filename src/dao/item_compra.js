import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM itens_compra", (err, results) => {
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
      "SELECT * FROM itens_compra WHERE id_itensc = ?",
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

export const create = (item_compra) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO itens_compra(id_prod,id_compra,quantidade,total) values (?, ?, ?, ?)",
      [
        item_compra.id_prod,
        item_compra.id_compra,
        item_compra.quantidade,
        item_compra.total,
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
      "DELETE FROM itens_compra WHERE id_itensc = ?",
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

export const update = (id, item_compra) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE itens_compra SET id_prod = ?, id_compra = ?, quantidade = ?, total = ? WHERE id_itensc = ?",
      [
        item_compra.id_prod,
        item_compra.id_compra,
        item_compra.quantidade,
        item_compra.total,
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
